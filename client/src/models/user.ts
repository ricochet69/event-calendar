import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().trim().toLowerCase().min(2, {}),
});
