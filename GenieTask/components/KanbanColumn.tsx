import React from 'react';
import { useDroppable } from '@dnd-kit/core';
// Import Zod-derived types
import { CustomerCard } from './CustomerCard';
import { z } from 'zod';
import { recivedCustomerZod } from '@/ZOD/Customer';

interface KanbanColumnProps {
    status: "NEW" | "CONTACTED" | "QUALIFIED" | "NEGOTIATION" | "CLOSED"; // Use the Zod-derived type
    title: string;
    customers: z.infer<typeof recivedCustomerZod>[]; // Use the Zod-derived type
}

export function KanbanColumn({ status, title, customers }: KanbanColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: status, // The status string itself is the ID
    });

    // ... rest of the component remains the same
    return (
        <div
            ref={setNodeRef}
            className={`flex-1 min-w-[280px] max-w-[320px] bg-gray-100 rounded-lg p-4 mx-2 ${isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''
                }`}
        >
            <h3 className="pb-2 mb-4 text-lg font-semibold text-gray-700 border-b">
                {title} ({customers.length})
            </h3>
            <div className="min-h-[200px] max-h-[900px] overflow-y-auto scrollbar">
                {customers.map((customer) => (
                    // Pass the validated/typed customer object
                    <CustomerCard key={customer.id} customer={customer} />
                ))}
                {customers.length === 0 && !isOver && (
                    <div className="mt-4 text-sm text-center text-gray-400">Drop cards here</div>
                )}
                {customers.length === 0 && isOver && (
                    <div className="p-4 mt-4 text-sm text-center text-blue-400 border-2 border-blue-300 border-dashed rounded-md">Release to drop</div>
                )}
            </div>
        </div>
    );
}
