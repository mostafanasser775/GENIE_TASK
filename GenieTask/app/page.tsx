import React from 'react'
import axiosInstance from '@/lib/axiosInstance'
import { KanbanBoard } from '@/components/KanbanBoard'

export default async function HomePage() {
    const Customers = await axiosInstance.get("api/customers/").then((res) => res.data)
  
    return (
        <div>
      <KanbanBoard initialCustomers={Customers} />
      </div>
    )
}

