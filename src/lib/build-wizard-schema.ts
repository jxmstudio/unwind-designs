import { z } from "zod";

// Step 1: Project Type & Base Kit
export const step1Schema = z.object({
  projectType: z.enum(["flat-pack", "custom-fitout", "consultation"], {
    message: "Please select a project type",
  }),
  baseKit: z.enum(["wander", "roam", "premium", "custom"], {
    message: "Please select a base kit",
  }).optional(),
});

// Step 2: Configuration Details
export const step2Schema = z.object({
  vehicleType: z.enum(["troopcarrier", "4wd", "van", "other"], {
    message: "Please select your vehicle type",
  }),
  fridgeType: z.enum(["chest", "upright", "none"], {
    message: "Please select a fridge type",
  }).optional(),
  finish: z.enum([
    "plain-hardwood",
    "eucalyptus-black-hex", 
    "birch-black-hex",
    "black-hex",
    "white",
    "plain-birch",
    "premium"
  ]).optional(),
  features: z.array(z.enum([
    "storage-drawers",
    "kitchen-setup", 
    "bed-platform",
    "electrical-system",
    "water-system",
    "lighting",
    "solar-panel",
    "inverter"
  ])).default([]),
});

// Step 3: Timeline & Budget
export const step3Schema = z.object({
  timeline: z.enum(["asap", "1-month", "2-3-months", "3-6-months", "flexible"], {
    message: "Please select your preferred timeline",
  }),
  budget: z.enum(["under-5k", "5k-10k", "10k-20k", "20k-plus", "discuss"], {
    message: "Please select your budget range",
  }),
  installationPreference: z.enum(["diy", "professional", "partial-help"], {
    message: "Please select installation preference",
  }),
});

// Step 4: Contact Information
export const step4Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(2, "Please enter your location"),
  message: z.string().optional(),
  marketingConsent: z.boolean().default(false),
});

// Complete form schema
export const buildWizardSchema = z.object({
  step1: step1Schema,
  step2: step2Schema,
  step3: step3Schema,
  step4: step4Schema,
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type BuildWizardData = z.infer<typeof buildWizardSchema>;

// URL params schema for pre-filling
export const urlParamsSchema = z.object({
  base: z.enum(["wander", "roam", "premium"]).optional(),
  fridge: z.enum(["chest", "upright"]).optional(),
  finish: z.enum([
    "black-hex",
    "white", 
    "birch",
    "eucalyptus-black-hex",
    "birch-black-hex",
    "plain-hardwood",
    "plain-birch",
    "premium"
  ]).optional(),
  project: z.enum(["flat-pack", "custom-fitout", "consultation"]).optional(),
});

export type UrlParams = z.infer<typeof urlParamsSchema>;
