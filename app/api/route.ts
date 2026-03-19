// wake up server
import { db } from "../db";
export async function GET() {
    await db.query.projects.findMany({
        orderBy: (projects, {desc}) => [desc(projects.createdAt)]
    })
  return new Response("OK");
}