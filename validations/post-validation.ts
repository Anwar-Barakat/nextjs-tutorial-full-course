import { z } from "zod";

const postValidation = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  author: z.string().min(3),
  created_at: z.date(),
  published_at: z.date().optional(),
});

const postSchema = z.object({
  posts: z.array(postValidation),
});

export { postValidation, postSchema };
