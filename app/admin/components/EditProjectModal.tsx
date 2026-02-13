'use client';

import { useState, useEffect } from "react";
import { UpdateProjects, DeleteProjects } from "../action"; 
import { ProjectZod } from "../../db/schema";

export default function EditProjectModal({
  isOpen,
  onClose,
  onSuccess,
  project
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  project: ProjectZod | null;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    githubLinks: "",
    demoLink: "",
    tags: "",
  });

  useEffect(() => {
    if (project && isOpen) {
      setFormData({
        name: project.name,
        description: project.description,
        demoLink: project.demoLink || "",
        githubLinks: project.githubLinks ? project.githubLinks.join(", ") : "",
        tags: project.tags ? project.tags.join(", ") : "",
      });
      setError('');
      setIsConfirmDeleteOpen(false);
    }
  }, [project, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleClose = () => {
    setError('');
    setIsConfirmDeleteOpen(false);
    setFormData({ name: "", description: "", githubLinks: "", demoLink: "", tags: "" });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setError('');

    try {
      const payload = {
        id: project.id, 
        name: formData.name,
        description: formData.description,
        demoLink: formData.demoLink || null,
        githubLinks: formData.githubLinks
          ? formData.githubLinks.split(",").map(link => link.trim()).filter(Boolean)
          : null,
        tags: formData.tags
          ? formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
          : null,
      };

      setLoading(true);
      const result = await UpdateProjects(payload);

      if (result && !result.success) {
        setError(typeof result.error === 'string' ? result.error : 'Invalid data format');
        return;
      }

      handleClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    setError('');
    setLoading(true);

    try {
      const result = await DeleteProjects(project.id);

      if (result && !result.success) {
        setError(typeof result.error === 'string' ? result.error : 'Failed to delete project');
        setIsConfirmDeleteOpen(false);
        return;
      }

      handleClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError((err as Error).message);
      setIsConfirmDeleteOpen(false);
    } finally {
      setLoading(false);
    }
  };

  if (!project) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-2xl transition-all">
            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-black">Edit Project</h2>
              <button
                onClick={handleClose}
                disabled={loading}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-black disabled:opacity-50"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Project Name *</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Description *</label>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={loading}
                      className="min-h-[150px] w-full flex-1 resize-y rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Demo Link</label>
                    <input
                      type="url"
                      name="demoLink"
                      value={formData.demoLink}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">GitHub Links (Comma separated)</label>
                    <input
                      type="text"
                      name="githubLinks"
                      value={formData.githubLinks}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Tags (Comma separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsConfirmDeleteOpen(true)}
                  disabled={loading}
                  className="rounded-md px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                >
                  Delete Project
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={loading}
                    className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-md bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {loading && (
                      <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {loading ? 'Updating...' : 'Update Project'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl transition-all">
            <h3 className="text-lg font-bold tracking-tight text-gray-900">Delete Project</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Are you sure you want to delete <span className="font-semibold text-gray-900">"{project.name}"</span>? This action cannot be undone.
            </p>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmDeleteOpen(false)}
                disabled={loading}
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
              >
                {loading && (
                  <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}