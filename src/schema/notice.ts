import { z } from "zod";

export const noticesSchema = z.array(
  z.object({
    details: z.string(),
    createdAt: z
      .string()
      .datetime()
      .transform((date) => {
        const now = new Date();
        const resDate= new Date(date);
        const diffInMilliseconds = now.getTime() - resDate.getTime()
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

        if (diffInSeconds < 60) {
          return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 3600) {
          const minutes = Math.floor(diffInSeconds / 60);
          return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
          const hours = Math.floor(diffInSeconds / 3600);
          return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 604800) {
          const days = Math.floor(diffInSeconds / 86400);
          return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 2592000) {
          const weeks = Math.floor(diffInSeconds / 604800);
          return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 31536000) {
          const months = Math.floor(diffInSeconds / 2592000);
          return `${months} month${months !== 1 ? 's' : ''} ago`;
        } else {
          const years = Math.floor(diffInSeconds / 31536000);
          return `${years} year${years !== 1 ? 's' : ''} ago`;
        }
      }),
  })
);
