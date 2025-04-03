import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import  Customer
from .serializer import CustomerSerializer  # Corrected import
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        customer_id = data.get("customerId")
        new_status = data.get("newStatus")

        print(data)

        customer = await sync_to_async(Customer.objects.get)(id=customer_id)
        data_to_update = {"status": new_status}  # Add other fields if needed
        serializer = CustomerSerializer(customer, data=data_to_update, partial=True)  # Allow partial updates
        if serializer.is_valid():
            customer = await sync_to_async(serializer.save)()
            serialized_data = CustomerSerializer(customer).data
            print("serialized_data", serialized_data)
        
        await self.send(text_data=json.dumps({"customer": serialized_data}))
    
