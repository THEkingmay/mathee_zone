import { pgTable, text, uuid , timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name : text('name').notNull(),
  description: text("description").notNull(),
  githubLinks: text("github_links").array(),
  demoLink: text("demo_link"),
  tags : text('tags').array() ,
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});


export const projectSchema = createSelectSchema(projects); // for runtime 
export const insertProjectSchma  = createInsertSchema(projects) // for runtime  ใช้ validate input 

export type ProjectZod = z.infer<typeof projectSchema>; // for compile time
export type InsertProjectPayload = z.infer<typeof insertProjectSchma>;// for compile time ใช้ตอน dev , auto complete