import { z } from 'zod';

const AssigneeObject = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string(),
});

const addTaskSchema = z.object({
  name: z.string().min(5).max(30),
  date: z.object({
    from: z.date(),
    to: z.date().optional(),
  }),
  assignees: z.array(AssigneeObject).optional(),
  priority: z.string(),
});

export { addTaskSchema };
