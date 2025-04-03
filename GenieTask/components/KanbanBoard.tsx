/* eslint-disable no-console */
/* eslint-disable import/order */
'use client';

import React, { useEffect, useId, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';

// Import Zod-derived types AND the schema itself for status values

import { z } from 'zod';

import { KanbanColumn } from './KanbanColumn';
import { CustomerCard } from './CustomerCard';
import useWebSocket, { ReadyState } from "react-use-websocket";


import { recivedCustomerZod } from '@/ZOD/Customer';


const WS_URL = "ws://localhost:8000/ws/chat/";
const customerStatusSchema = z.enum([
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "NEGOTIATION",
  "CLOSED",
]);

type CustomerStatus = z.infer<typeof customerStatusSchema>;
// --- Option 1: Define titles manually, ensuring statuses match Zod enum ---
const statusTitles: Record<CustomerStatus, string> = {
  NEW: "New Leads",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  NEGOTIATION: "Negotiation",
  CLOSED: "Closed",
};

// Derive KANBAN_STATUSES from the Zod enum to ensure consistency
const KANBAN_STATUSES: { status: CustomerStatus; title: string }[] =
  customerStatusSchema.options.map((status) => ({
    status: status,
    title: statusTitles[status] ?? status, // Use title from map or fallback to status
  }));


export function KanbanBoard({ initialCustomers }: { initialCustomers: z.infer<typeof recivedCustomerZod>[] }) {
  const [webSocketReady, setWebSocketReady] = useState(false);
  const dndContextId = useId()

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    webSocketReady ? WS_URL : null, // Only initialize WebSocket on the client
    {
      shouldReconnect: () => true,
    }
  );

  const [customers, setCustomers] = useState<z.infer<typeof recivedCustomerZod>[]>(initialCustomers);
  const [activeCustomer, setActiveCustomer] = useState<z.infer<typeof recivedCustomerZod> | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWebSocketReady(true);
    }
  }, []);
  useEffect(() => {
    setCustomers(initialCustomers)
  }, [initialCustomers]);

  const handleSendMessage = ({ customerId, newStatus }: { customerId: number, newStatus: string }) => {
    sendMessage(JSON.stringify({
      customerId,
      newStatus,
    }));

  };

  const parseResult = z.array(recivedCustomerZod).safeParse(initialCustomers);

  if (!parseResult.success) {
    console.error("Invalid initial customer data:", parseResult.error.flatten());
  }


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  // Use the specific DragStartEvent type
  const handleDragStart = (event: DragStartEvent) => {
    const customerData = event.active.data.current?.customer as z.infer<typeof recivedCustomerZod> | undefined;

    if (customerData) {
      setActiveCustomer(customerData);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveCustomer(null);

    if (over && active.id !== over.id) {

      const activeCustomerData = active.data.current?.customer as z.infer<typeof recivedCustomerZod> | undefined;

      const targetStatus = over.id as CustomerStatus;

      handleSendMessage(
        { customerId: activeCustomerData!.id, newStatus: targetStatus },
      )
      console.log("targetStatus", targetStatus)
      console.log("activeCustomerData", activeCustomerData)
      const isValidStatus = customerStatusSchema.safeParse(targetStatus).success;

      if (activeCustomerData && isValidStatus) {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            `customer-${customer.id}` === active.id // Match draggable ID format
              ? { ...customer, status: targetStatus, updated_at: new Date().toISOString() } // Update status
              : customer
          )
        );
      } else {
        console.warn(`Invalid drop target status: ${targetStatus}`);
      }
    }
  };

  return (
    <div className='flex flex-col w-full mx-auto '>
      <div className='flex flex-col self-end my-4 ml-auto'>
        <p className={` text-gray-600 ${readyState === ReadyState.OPEN ? "text-green-600" : "text-red-600"}`}>
          Status: {readyState === ReadyState.OPEN ? "Connected" : "Disconnected"}
        </p>
        {lastMessage &&
          <span>Updated Customer : {lastMessage ? JSON.parse(lastMessage.data).customer.name : ""}</span>
        }
      </div>
      <DndContext id={dndContextId}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <div className="flex w-full min-h-screen p-4 mx-auto space-x-4 overflow-x-auto bg-gray-50">
          {KANBAN_STATUSES.map(({ status, title }) => (
            <KanbanColumn
              key={status}
              customers={customers.filter((c) => c.status === status)}
              status={status}
              title={title}
            />
          ))}
        </div>

        <DragOverlay>
          {activeCustomer ? <CustomerCard customer={activeCustomer} /> : null}
        </DragOverlay>

      </DndContext>
    </div>
  );
}