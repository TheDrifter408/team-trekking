import { z } from 'zod';

/**
 * Centralized validation schemas for the application
 * These can be imported and used or extended as needed throughout the app
 */

// Base field validations - reusable primitives
export const nameSchema = z
  .string()
  .min(1, { message: 'Please enter your name' });

export const emailSchema = z
  .string()
  .email({ message: 'Please enter a valid email address' });

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

export const simplePasswordSchema = z
  .string()
  .min(2, { message: 'Please enter your password' });

// Common combination schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: simplePasswordSchema,
});

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: simplePasswordSchema,
});

export const emailInputSchema = z.object({
  email: emailSchema,
});
