import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Obfuscates a last name by keeping only the first initial
 */
export function obfuscateLastName(name: string): string {
  const parts = name.split(' ');
  if (parts.length === 1) return name; // Single name, return as is
  
  // Keep first name and first initial of last name + dot
  const firstName = parts[0];
  const lastInitial = parts[1].charAt(0) + '.';
  
  return `${firstName} ${lastInitial}`;
}

/**
 * Obfuscates an email address by showing only first 3 characters plus domain
 */
export function obfuscateEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;
  
  const visiblePart = username.slice(0, 3);
  const hiddenPart = '*'.repeat(Math.max(username.length - 3, 2));
  
  return `${visiblePart}${hiddenPart}@${domain}`;
}

/**
 * Obfuscates a phone number by keeping only last 4 digits
 */
export function obfuscatePhone(phone: string): string {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Keep last 4 digits visible, hide the rest
  if (digits.length >= 4) {
    const visiblePart = digits.slice(-4);
    const hiddenPart = '*'.repeat(Math.min(digits.length - 4, 6));
    return `${hiddenPart}-${visiblePart}`;
  }
  
  return '*'.repeat(phone.length);
}
