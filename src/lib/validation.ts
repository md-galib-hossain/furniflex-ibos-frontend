import { z } from "zod";
const requiredString = z.string().trim().min(1, "Required");
export const loginSchema = z.object({
  email: requiredString,
  password: requiredString,
});
export type LoginValues = z.infer<typeof loginSchema>;


export const signupSchema = z.object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: requiredString,
    firstName : requiredString,
    lastName : requiredString
  });
  
  export type SignupValues = z.infer<typeof signupSchema>;