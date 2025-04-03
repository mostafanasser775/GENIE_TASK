'use client'
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { customerZod, recivedCustomerZod } from "@/ZOD/Customer";
import { customerStore } from "@/store/customerStore";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export const CustomerModal = ({ mode, Customer,fullWidth }:
  {
    mode: 'Add' | 'Edit',
    Customer?: z.infer<typeof recivedCustomerZod>,
    fullWidth?: boolean
  }
) => {
  const router=useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { addCustomer, editCustomer, pending } = customerStore()
  const { register, reset, handleSubmit, formState: { errors } } =
    useForm<z.infer<typeof customerZod>>({ resolver: zodResolver(customerZod) });

  React.useEffect(() => {
    if (Customer && mode === "Edit") {
      reset(Customer);
    } else {
      reset();
    }
  }, [Customer, mode]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (Customer) {
      const res = await editCustomer(Customer.id, data)

      if (res) {
        reset();
        setIsOpen(false)
        if(fullWidth){
          router.refresh()
        }

      }
    }
    else {
      const res = await addCustomer(data)

      if (res) {
        reset()
        setIsOpen(false)

      }

    }
  }

  return (
    <>
      <Button className={`flex items-center gap-2 text-white ${fullWidth ? 'w-full' : ''}`} color="primary" isIconOnly={mode === 'Edit'}
        size={mode === "Edit" ? 'sm' : 'md'} onPress={() => setIsOpen(true)}>
        <Icon className={` text-default-200 ${fullWidth&&'mr-4'}`} icon={mode === "Add" ? "lucide:user-plus" : "lucide:user-cog"} />
        {mode === "Add" && "Add Customer"}
        {fullWidth && mode === "Edit" && "Edit Customer"}
      </Button>
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        size="4xl"
        onOpenChange={setIsOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form noValidate onSubmit={handleSubmit(onSubmit)} >

                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="text-xl text-primary" icon={mode === "Add" ? "lucide:user-plus" : "lucide:user-cog"} />
                    </div>
                    <div>
                      <span className="text-lg font-semibold">{mode === "Add" ? "Add New Customer" : "Edit Customer"}</span>
                      <p className="text-small text-default-500">
                        {mode === "Add" ? "Add a new customer to your database" : "Update customer information"}
                      </p>
                    </div>
                  </div>
                </ModalHeader>
                <Divider />
                <ModalBody>
                  <Input aria-label="Name" {...register('name')} isRequired errorMessage={errors.name?.message}
                    isInvalid={Boolean(errors?.name)} label="Name"
                    labelPlacement="outside"
                    placeholder="Customer Name" radius="sm"
                    startContent={<Icon className="text-default-400" icon="lucide:user" />} variant="bordered" />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


                    <Input aria-label="Email"  type="email" {...register('email')} errorMessage={errors.email?.message}
                      isInvalid={Boolean(errors?.email)}
                      label="Email Address" labelPlacement="outside"
                      placeholder="email@provider.com" radius="sm"
                      startContent={<Icon className="text-default-400" icon="lucide:mail" />} variant="bordered" />

                    <Input aria-label="phone"   {...register('phone')} errorMessage={errors.phone?.message}
                      isInvalid={Boolean(errors?.phone)}
                      label="Phone Number" labelPlacement="outside"
                      placeholder="+972 58 1234567" radius="sm"
                      startContent={<Icon className="text-default-400" icon="lucide:phone" />} variant="bordered" />




                    <Input aria-label="Company" type="text" 
                      {...register('company')}
                      label="Company" labelPlacement="outside" placeholder="Company" radius="sm"
                      startContent={<Icon className="text-default-400" icon="lucide:briefcase" />} variant="bordered" />

                    <Select  aria-label="Status" {...register('status')} isRequired errorMessage={errors.status?.message}
                      isInvalid={Boolean(errors?.status)} label="Status"
                      labelPlacement="outside" placeholder="Select Customer Status "
                      radius="sm" variant="bordered">
                      <SelectItem key="NEW">New</SelectItem>
                      <SelectItem key="CONTACTED">Contacted</SelectItem>
                      <SelectItem key="QUALIFIED">Qualified</SelectItem>
                      <SelectItem key="NEGOTIATION">Negotiation</SelectItem>
                      <SelectItem key="CLOSED">Closed</SelectItem>
                    </Select>

                  </div>

                </ModalBody>
                <Divider />
                <ModalFooter>
                  <Button aria-label="cancel" color="danger" isDisabled={pending} radius="sm" variant="bordered" onPress={onClose}>Cancel</Button>
                  <Button aria-label="save" color="primary" isDisabled={pending} isLoading={pending} radius='sm' type='submit'>
                    {Customer ? "Update Customer" : "Add Customer"}</Button>

                </ModalFooter>
              </form>

            </>
          )}
        </ModalContent>
      </Modal>
    </>

  );
};
