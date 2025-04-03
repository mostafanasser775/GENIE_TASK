from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import  Customer
from .serializer import  CustomerSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@api_view(['GET'])
def get_customers(request):
    # Fetch all Customer objects
    customers = Customer.objects.all()  # Fetch all Customer objects
    serialized_data = CustomerSerializer(customers, many=True).data  # Serialize the data
    return Response(serialized_data)  # Return the serialized data as a response

@api_view(['POST'])
def add_customer(request):
    print(request.data)
    """Add a new customer"""
    serializer = CustomerSerializer(data=request.data)
    if serializer.is_valid():
        customer = serializer.save()  # Save the customer instance
        serialized_data = CustomerSerializer(customer).data
        return Response(serialized_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_customer(request, customer_id):
    """Update a customer by ID"""
    print(customer_id)
    try:
        # Fetch the customer by ID
        customer = Customer.objects.get(id=customer_id)
    except Customer.DoesNotExist:
        # Return a 404 response if the customer is not found
        return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

    # Deserialize and validate the incoming data
    serializer = CustomerSerializer(customer, data=request.data, partial=True)  # Allow partial updates
    if serializer.is_valid():
        # Save the updated customer instance
        updated_customer = serializer.save()
        # Serialize the updated customer data
        serialized_data = CustomerSerializer(updated_customer).data
        # Return the updated data with a 200 OK status
        return Response(serialized_data, status=status.HTTP_200_OK)

    # Return validation errors with a 400 Bad Request status
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_customer(request, customer_id):
    """Delete a customer by ID"""
    try:
        customer = Customer.objects.get(id=customer_id)
    except Customer.DoesNotExist:
        return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

    customer.delete()
    return Response({"message": "Customer deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def update_customer(request, customer_id):
    try:
        customer = Customer.objects.get(id=customer_id)
    except Customer.DoesNotExist:
        return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = CustomerSerializer(customer, data=request.data, partial=True)
    if serializer.is_valid():
        updated_customer = serializer.save()
        serialized_data = CustomerSerializer(updated_customer).data

        # Broadcast the update via WebSocket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "customers",
            {
                "type": "customer_update",
                "customer": serialized_data
            }
        )

        return Response(serialized_data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)