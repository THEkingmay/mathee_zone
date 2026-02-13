'use server'
import { InsertProjectPayload, insertProjectSchma, projects } from "../db/schema";
import { db } from "../db";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";

export async function InsertProjects(payload: InsertProjectPayload) {
    try {

        const user = await getServerSession()
        if (user?.user?.email !== process.env.ADMIN_EMAIL) return { success: false, error: "คุณไม่มีสิทธิ" };

        const result = insertProjectSchma.safeParse(payload);

        if (!result.success) {
            return { success: false, error: result.error.format() };
        }

        await db.insert(projects).values(result.data)

        return { success: true, data: result.data };

    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}

export async function UpdateProjects(payload: InsertProjectPayload) {
    try {

        const user = await getServerSession()
        if (user?.user?.email !== process.env.ADMIN_EMAIL) return { success: false, error: "คุณไม่มีสิทธิ" };


        if (!payload.id) {
            return { success: false, error: "ไม่พบ ID ของโปรเจกต์ที่ต้องการแก้ไข" };
        }
        const result = insertProjectSchma.safeParse(payload);
        if (!result.success) {
            return { success: false, error: result.error.format() };
        }
        await db.update(projects)
            .set({
                name: result.data.name,
                description: result.data.description,
                demoLink: result.data.demoLink,
                githubLinks: result.data.githubLinks,
                tags: result.data.tags,
            })
            .where(eq(projects.id, payload.id));

        return { success: true, data: result.data };

    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}

export async function DeleteProjects(projects_id : string) {
     try {

        const user = await getServerSession()
        if (user?.user?.email !== process.env.ADMIN_EMAIL) return { success: false, error: "คุณไม่มีสิทธิ" };


       if (!projects_id) {
            return { success: false, error: "ไม่พบ ID ของโปรเจกต์ที่ต้องการลบ" };
        }
        await db.delete(projects)
            .where(eq(projects.id, projects_id));

    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}

export async function GetProjects() {
    try {

        const allProjects = await db.query.projects.findMany({
            orderBy: (projects, {desc}) => [desc(projects.createdAt)]
        })

        return { success: true, data: allProjects };

    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}