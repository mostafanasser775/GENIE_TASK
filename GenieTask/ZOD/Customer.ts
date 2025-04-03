import { z } from "zod";

export const customerZod = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(100, "Name must be at most 100 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Phone number must be between 10 and 15 digits and can start with '+'"),
  company: z.string().optional(),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "NEGOTIATION", "CLOSED"]),
});

export const recivedCustomerZod = customerZod.extend({
  id: z.number().positive("ID must be a positive number"),
  created_at: z.string().datetime({ message: "Invalid datetime format for created_at" }),
  updated_at: z.string().datetime({ message: "Invalid datetime format for updated_at" }),
});