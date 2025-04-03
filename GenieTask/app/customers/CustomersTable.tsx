'use client'
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider"
import { Select, SelectItem } from '@heroui/select'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { z } from "zod";

import { DeleteConfirmationModal } from "@/components/DeleteConfirmModal";
import { Customer } from "@/types/customer";
import { CustomerModal } from "@/components/customerModal";
import { recivedCustomerZod } from "@/ZOD/Customer";
import { customerStore } from "@/store/customerStore";

export default function CustomersTable({ Customers }: { Customers: z.infer<typeof recivedCustomerZod> }) {
  const { setCustomers, customers, initalized, deleteCustomer } = customerStore();

  useEffect(() => {
    if (customers.length <= 0) {
      setCustomers(Array.isArray(Customers) ? Customers : [Customers]);
    }
  }, [])



  return (
    <div>
      <Card shadow="none">
        <CardBody className="gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="text-2xl text-primary" icon="lucide:users" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Customer Management</h1>
                <p className="text-small text-default-500">Manage your customer database</p>
              </div>
            </div>

            <CustomerModal mode="Add" />

          </div>

          <Divider />

          <div className="flex flex-col gap-4 sm:flex-row">
            {/* <Input aria-label="Name" 
              className="w-full sm:w-96"
              placeholder="Search by name, email, or company..."
              size="lg"
              startContent={<Icon className="text-default-400" icon="lucide:search" />}
              value={searchQuery}
              variant="bordered"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select aria-label="filter" 
              className="w-full sm:w-48"
              placeholder="Filter by status"
              selectedKeys={[statusFilter]}
              size="lg"
              variant="bordered"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <SelectItem key="all" textValue="all">All Status</SelectItem>
              <SelectItem key="active" textValue="active">Active</SelectItem>
              <SelectItem key="inactive" textValue="inactive">Inactive</SelectItem>
            </Select>
            */}
          </div> 

          <Table
            aria-label="Customer table"
            className="mt-4"
            shadow="none"
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>COMPANY</TableColumn>
              <TableColumn>CONTACT</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>JOIN DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {(initalized ? customers : Array.isArray(Customers) ? Customers : [Customers]).map((customer: z.infer<typeof recivedCustomerZod>) => (
                <TableRow key={customer.id} className="h-16">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{customer.company}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{customer.email}</span>
                      <span className="text-small text-default-400">{customer.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip aria-label="chip" 
                      className="capitalize"
                      color={
                        customer.status === "NEW"
                          ? "primary"
                          : customer.status === "CONTACTED"
                            ? "secondary"
                            : customer.status === "QUALIFIED"
                              ? "success"
                              : customer.status === "NEGOTIATION"
                                ? "warning"
                                : customer.status === "CLOSED"
                                  ? "danger"
                                  : "default"
                      }
                      size="sm" variant="flat"
                    >
                      {customer.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="text-small">{
                      new Date(customer.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">


                      <Tooltip aria-label="edit"  content="Edit Customer" size="sm" >
                        <CustomerModal Customer={customer} mode="Edit" />
                      </Tooltip>

                      <Tooltip aria-label="delete"  color="danger" content="Delete customer">
                        <DeleteConfirmationModal
                          action={async () => { await deleteCustomer(customer.id) }}
                          mode='Icon'
                          title="Customer"
                        />
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* <CustomerModal
        isOpen={isAddModalOpen}
        mode="add"
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
      /> */}




    </div>
  );
}


