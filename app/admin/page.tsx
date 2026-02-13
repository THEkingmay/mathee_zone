'use client';

import { signOut, useSession } from "next-auth/react";
import InsertProjectModal from "./components/InsertProjectModal";
import { useEffect, useState } from "react";
import { ProjectZod } from "../db/schema";
import { GetProjects } from "./action";
import EditProjectModal from "./components/EditProjectModal";

interface ProjectZodWithClick extends ProjectZod {
    onClick: () => void
}

const ProjectCard = ({ name, description, demoLink, githubLinks, tags, onClick }: ProjectZodWithClick) => {
    return (
        <div onClick={onClick} className="group flex min-h-[220px] cursor-pointer flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-black hover:shadow-md">
            {/* ใส่ group-hover ให้ชื่อโปรเจกต์เปลี่ยนสีนิดหน่อยเวลานำเมาส์ไปชี้ที่การ์ด */}
            <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600" title={name}>
                {name}
            </h3>

            {/* ปรับขนาดเป็น text-xs และเพิ่ม leading-relaxed ให้ช่องว่างระหว่างบรรทัดอ่านง่ายขึ้นแม้ตัวหนังสือจะเล็ก */}
            <p className="mt-2 flex-1 line-clamp-3 text-xs leading-relaxed text-gray-500" title={description}>
                {description}
            </p>

            {tags && tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="rounded-md bg-gray-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-600 transition-colors group-hover:bg-gray-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* เพิ่ม flex-wrap เผื่อกรณีที่มีลิงก์เยอะๆ จะได้ตัดขึ้นบรรทัดใหม่ไม่ล้นกรอบ */}
            <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4 text-sm font-medium">
                {demoLink && (
                    <a
                        href={demoLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-black transition-colors hover:text-blue-600 hover:underline"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                    </a>
                )}

                {/* วนลูป .map() เพื่อแสดง GitHub Links ทั้งหมด */}
                {githubLinks && githubLinks.length > 0 && (
                    githubLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 text-gray-500 transition-colors hover:text-black hover:underline"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            {/* ถ้ามีหลายลิงก์ ให้เติมตัวเลขกำกับ เช่น GitHub 1, GitHub 2 */}
                            GitHub {githubLinks.length > 1 ? index + 1 : ''}
                        </a>
                    ))
                )}
            </div>
        </div>
    );
};

const SkeletonCard = () => (
    <div className="flex min-h-[220px] flex-col rounded-xl border border-gray-100 bg-gray-50/50 p-6 shadow-sm">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
        <div className="mt-4 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="mt-auto pt-6">
            <div className="flex gap-2">
                <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
                <div className="h-6 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
        </div>
    </div>
);

export default function AdminDashboard() {
    const { data: session } = useSession();

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const [selectEditProjcet, setSelectEditProject] = useState<ProjectZod | null>(null)

    const [projects, setProjects] = useState<ProjectZod[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchProject = async () => {
        setIsLoading(true);
        try {
            const allProjects = await GetProjects();
            setProjects(allProjects.data || []);
        } catch (err) {
            console.error("Failed to fetch projects:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProject();
    }, []);

    return (
        <div className="min-h-screen bg-white text-black">
            <nav className="border-b border-gray-200 px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight">Admin Console</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium">Logged in as</p>
                            <p className="text-xs text-gray-500">{session?.user?.email}</p>
                        </div>

                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="group relative flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white"
                        >
                            <span>Log out</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
                <p className="mt-2 text-gray-500">Manage your projects and content here.</p>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <button
                        onClick={() => setIsOpenModal(true)}
                        className="group flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 text-gray-400 transition-all hover:border-black hover:bg-white hover:text-black hover:shadow-sm"
                    >
                        <span className="text-4xl transition-transform group-hover:scale-110">+</span>
                        <span className="mt-3 text-sm font-medium">Add New Project</span>
                    </button>
                    {isLoading ? (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : (
                        projects.map((project) => (
                            <ProjectCard onClick={() => setSelectEditProject(project)} key={project.id} {...project} />
                        ))
                    )}
                </div>
            </main>

            <InsertProjectModal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                onSuccess={() => {
                    setIsOpenModal(false);
                    fetchProject();
                }}
            />

            <EditProjectModal
                project={selectEditProjcet}
                isOpen={!!selectEditProjcet}
                onClose={() => setSelectEditProject(null)}
                onSuccess={() => {
                    setSelectEditProject(null)
                    fetchProject();
                }}
            />
        </div>
    );
}