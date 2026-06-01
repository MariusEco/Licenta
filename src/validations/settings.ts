import { z } from "zod";

export const updateUsernameSchema = z.object({
  username: z.string().trim().min(2).max(120),
});

export const requestPasswordResetSchema = z.object({
  redirectTo: z.string().url().optional(),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Parola trebuie să aibă cel puțin 8 caractere.")
    .max(128)
    .regex(
      /[A-Z]/,
      "Parola trebuie să conțină cel puțin o literă mare, o cifră și un simbol.",
    )
    .regex(
      /[0-9]/,
      "Parola trebuie să conțină cel puțin o literă mare, o cifră și un simbol.",
    )
    .regex(
      /[!@#\$%\^&\*\(\)_\+\-\=\[\]\{\};':"\\|<>\?,\.\/`~]/,
      "Parola trebuie să conțină cel puțin o literă mare, o cifră și un simbol.",
    ),
});
