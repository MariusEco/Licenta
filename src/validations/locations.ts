import { z } from "zod";

import { paginationSchema } from "@/validations/pagination";

export const emigrationDifficultySchema = z.enum([
  "LOW",
  "MEDIUM",
  "HIGH",
  "VERY_HIGH",
]);

export const locationKindSchema = z.enum(["COUNTRY", "CITY"]);

export const countryListQuerySchema = paginationSchema.extend({
  search: z.string().trim().min(1).optional(),
  continent: z.string().trim().min(1).optional(),
  difficulty: emigrationDifficultySchema.optional(),
  maxMonthlyCostEur: z.coerce.number().int().positive().optional(),
  minAverageSalaryEur: z.coerce.number().int().positive().optional(),
  sort: z
    .enum([
      "name",
      "cost_asc",
      "cost_desc",
      "salary_asc",
      "salary_desc",
      "difficulty_asc",
      "difficulty_desc",
    ])
    .default("name"),
});

export const cityListQuerySchema = paginationSchema.extend({
  search: z.string().trim().min(1).optional(),
  countrySlug: z.string().trim().min(1).optional(),
  difficulty: emigrationDifficultySchema.optional(),
  maxMonthlyCostEur: z.coerce.number().int().positive().optional(),
  minAverageSalaryEur: z.coerce.number().int().positive().optional(),
  sort: z
    .enum([
      "name",
      "cost_asc",
      "cost_desc",
      "salary_asc",
      "salary_desc",
      "difficulty_asc",
      "difficulty_desc",
    ])
    .default("name"),
});

export const slugParamsSchema = z.object({
  slug: z.string().trim().min(1).max(120),
});

export const favoriteMutationSchema = z
  .object({
    kind: locationKindSchema,
    countryId: z.string().uuid().optional(),
    cityId: z.string().uuid().optional(),
  })
  .superRefine((value, context) => {
    if (value.kind === "COUNTRY" && !value.countryId) {
      context.addIssue({
        code: "custom",
        path: ["countryId"],
        message: "countryId este obligatoriu pentru o țară favorită.",
      });
    }

    if (value.kind === "CITY" && !value.cityId) {
      context.addIssue({
        code: "custom",
        path: ["cityId"],
        message: "cityId este obligatoriu pentru un oraș favorit.",
      });
    }
  });

export const comparisonCreateSchema = z.object({
  title: z.string().trim().min(2).max(120),
  items: z
    .array(favoriteMutationSchema)
    .min(2, "O comparație trebuie să conțină cel puțin două locații.")
    .max(5, "O comparație poate include cel mult cinci locații."),
});

export const idParamsSchema = z.object({
  id: z.string().uuid(),
});
