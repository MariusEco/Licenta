import { z } from "zod";

export const updateFullNameSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
});

export const requestPasswordResetSchema = z.object({
  redirectTo: z.string().url().optional(),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Parola trebuie să aibă cel puțin 8 caractere.")
    .max(128),
});