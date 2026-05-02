// import { clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs) {
//   return twMerge(clsx(inputs))
// }

// /** Teacher UI expects an array; API/admin forms may send a comma-separated string. */
// export function normalizeSubjectList(subjects) {
//   if (Array.isArray(subjects)) return subjects;
//   if (typeof subjects === 'string' && subjects.trim()) {
//     return subjects.split(',').map((s) => s.trim()).filter(Boolean);
//   }
//   return [];
// }

// export function teacherExperienceYears(teacher) {
//   if (!teacher || typeof teacher !== 'object') return null;
//   const v = teacher.experience_years ?? teacher.years_experience;
//   return v != null && v !== '' ? Number(v) : null;
// }

// export const isIframe =
//   typeof window !== 'undefined' && window.self !== window.top;

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isIframe = window.self !== window.top;
