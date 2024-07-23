import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, {
    message: "Password must have a minimum of 8 characters",
  })
  .max(24, {
    message: "Password should not be more than 24 characters long",
  })
  .regex(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/), {
    message: "Password must contain a-z, A-Z, 0-9, .!#$%%^&*",
  });

export const nameSchema = z
  .string()
  .min(2, {
    message: "Must have at least 2 characters",
  })
  .max(50, {
    message: "Must have at most 100 characters",
  });
