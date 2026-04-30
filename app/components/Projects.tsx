import { GetProjects } from "../admin/action"
import { GrGithub } from "react-icons/gr"
import { FiExternalLink, FiStar } from "react-icons/fi"

export default async function Projects() {
  const projects = (await GetProjects()).data

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="w-full py-24 bg-white text-black text-center">
        <p className="text-gray-400 italic">No projects to display yet.</p>
      </section>
    )
  }

  // Sort: Recommended first, then newest
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.isRecommended && !b.isRecommended) return -1;
    if (!a.isRecommended && b.isRecommended) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <section id="projects" className="w-full py-24 bg-white text-black border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Projects</h2>
          <div className="h-1 w-12 bg-black rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1">
                  {project.isRecommended && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                      <FiStar size={10} /> Recommended
                    </span>
                  )}
                  <h3 className="text-xl font-bold">{project.name}</h3>
                </div>
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black">
                    <FiExternalLink size={20} />
                  </a>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags?.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 bg-gray-50 text-gray-500 rounded border border-gray-100 uppercase font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-50">
                {project.githubLinks?.map((link, i) => (
                  <a key={i} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black">
                    <GrGithub size={16} />
                    <span>Repo {project.githubLinks && project.githubLinks.length > 1 ? i + 1 : ""}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
