'use client'
import { useEffect, useState } from "react"
import { ProjectZod } from "../db/schema"
import { GetProjects } from "../admin/action"
import { GrGithub } from "react-icons/gr"
import { FiExternalLink } from "react-icons/fi"

export default function Projects() {
  const [projects, setProjects] = useState<ProjectZod[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const data = await GetProjects()
      setProjects(data.data||[])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="w-full min-h-screen py-24 bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold mb-16 text-center tracking-tight">
          Featured Projects
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col border border-black/10 rounded-2xl p-6 hover:shadow-xl hover:border-black/20 transition-all duration-300 bg-white"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {project.name}
                  </h3>
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <FiExternalLink size={20} />
                    </a>
                  )}
                </div>

                <p className="text-black/70 mb-6 flex-grow text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[11px] font-medium px-3 py-1 bg-black/5 text-black/70 rounded-full border border-black/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto pt-4 border-t border-black/5">
                  {project.githubLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <GrGithub size={18} />
                      <span>Repository</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}