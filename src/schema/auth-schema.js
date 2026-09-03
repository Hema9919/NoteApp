import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.coerce.number().min(10, "Age must be at least 10"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Must be a valid Egyptian phone number"),
});