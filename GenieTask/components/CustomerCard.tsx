import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { z } from 'zod';

import { CustomerModal } from './customerModal';

import { recivedCustomerZod } from '@/ZOD/Customer';
// Import Zod-derived types

export function CustomerCard({ customer }: { customer: z.infer<typeof recivedCustomerZod> }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        // Ensure ID used here matches the coerced string ID from the schema
        id: `customer-${customer.id}`,
        data: {
            customer: customer,
        }
    });

    // ... rest of the component remains the same
    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        touchAction: 'none',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}
            className="p-2 mb-3 bg-white border border-gray-200 rounded-md shadow-sm cursor-grab active:cursor-grabbing"
        >
             <h4 className="mb-2 text-lg font-semibold">{customer.name}</h4>
            <p className="mb-1 text-sm text-gray-600"><strong>Company:</strong> {customer.company || 'N/A'}</p>
            <p className="mb-1 text-sm text-gray-600"><strong>Email:</strong> {customer.email}</p>
            <p className="mb-1 text-sm text-gray-600"><strong>Phone:</strong> {customer.phone}</p>
            <CustomerModal Customer={customer} fullWidth={true}  mode='Edit'/>
        </div>
    );
}