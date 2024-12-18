import { z } from "zod";

export const linkSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),

  instagram: z
    .string({ message: "Instagram profile link is required" })
    .regex(
      /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/,
      { message: "Invalid Instagram profile link. Must start with 'https://www.instagram.com/'" }
    ),

  linkedin: z
    .string({ message: "LinkedIn profile link is required" })
    .regex(
      /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
      { message: "Invalid LinkedIn profile link. Must start with 'https://www.linkedin.com/in/'" }
    ),

  twitter: z
    .string({ message: "Twitter profile link is required" })
    .regex(
      /^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/,
      { message: "Invalid Twitter profile link. Must start with 'https://www.twitter.com/'" }
    ),

  facebook: z
    .string({ message: "Facebook profile link is required" })
    .regex(
      /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$/,
      { message: "Invalid Facebook profile link. Must start with 'https://www.facebook.com/'" }
    ),
});
