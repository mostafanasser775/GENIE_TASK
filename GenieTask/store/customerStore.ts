/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import axios from 'axios'
import { z } from 'zod'
import { addToast } from '@heroui/toast'

import { customerZod, recivedCustomerZod } from '@/ZOD/Customer'
import axiosInstance from '@/lib/axiosInstance'


export type Status = 'Center Pivot' | 'Linear Pivot'


export type State = {
  initalized: boolean
  pending: boolean
  customers: z.infer<typeof recivedCustomerZod>[]
}
export type Actions = {
  getCustomers: () => void
  setCustomers: (Customers: z.infer<typeof recivedCustomerZod>[]) => void
  addCustomer: (Customer: z.infer<typeof customerZod>) => Promise<boolean>
  editCustomer: (id: number, Customer: z.infer<typeof customerZod>) => Promise<boolean>
  deleteCustomer: (customerId: number) => Promise<boolean>
}

export const customerStore = create<State & Actions>()((set) => ({
  initalized: false,
  pending: false,
  customers: [],

  setCustomers: async (Customers) => { set({ customers: Customers, initalized: true }) },

  addCustomer: async (Customer) => {
    set({ pending: true });
    try {
      const response = await axiosInstance.post('api/customers/add', Customer);
      const data = await response.data;

      set((state) => ({ ...state, customers: [...state.customers, data] }));

      addToast({
        title: "Success",
        description: data.message,
        color: 'success',
      })

      return true
    } catch (error) {
      addToast({
        title: "Error",
        description: "Error adding Customer. Please try again.",
        color: 'danger',
      })

      return false
    } finally {
      set({ pending: false });
    }
  },

  editCustomer: async (id, Customer) => {
    set({ pending: true });
    try {
      const response = await axiosInstance.put(`api/customers/update/${id}`, Customer);
      const data = await response.data;

      set((state) => ({ ...state, customers: state.customers.map((customer) => customer.id === id ? data : customer) }));
      addToast({
        title: "Success",
        description: data.message,
        color: 'success',
      })

      return true
    } catch (error) {
      addToast({
        title: "Error",
        description: "Error updating Customer. Please try again.",
        color: 'danger',
      })

      return false
    } finally {
      set({ pending: false });
    }
  },
  getCustomers: async () => {
    axios.get('/api/customers').then((res) => {
      set(() => ({ customers: res.data }))
    }).catch((error) => console.log(error))
  },

  // delete customer by id
  deleteCustomer: async (customerId) => {
    try {
      set({ pending: true });
      const res = await axiosInstance.delete(`api/customers/delete/${customerId}`)

      set(state => ({ customers: state.customers.filter(x => x.id !== customerId) }))

      addToast({
        title: "Success",
        description: res.data,
        color: 'success',
      })

      return true
    } catch (error: any) {
      addToast({
        title: "Error",
        description: "Error Deleting Customer. Please try again.",
        color: 'danger',
      })

      return false;
    } finally {
      set({ pending: false });
    }


  },


}))

