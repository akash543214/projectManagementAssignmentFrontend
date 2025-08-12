import  { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";

type Project = {
  id: number;
  title: string;
  description: string;
};

const initialProjects: Project[] = [
  { id: 1, title: "AI SaaS Platform", description: "AI-powered project management tool" },
  { id: 2, title: "E-commerce Store", description: "Fullstack online store with payments" },
];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleAddProject = () => {
    if (!newProject.title.trim()) return;
    setProjects([
      ...projects,
      { id: Date.now(), title: newProject.title, description: newProject.description },
    ]);
    setNewProject({ title: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button
          variant="outline"
          className="border-gray-700 text-white hover:bg-gray-800"
        >
          Logout
        </Button>
      </div>

      {/* Add Project */}
      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Project title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          className="bg-gray-900 border-gray-700 text-white"
        />
        <Input
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          className="bg-gray-900 border-gray-700 text-white"
        />
        <Button onClick={handleAddProject} className="bg-blue-600 hover:bg-blue-700">
          Add Project
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Description</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-gray-800 hover:bg-gray-900">
                <td className="px-4 py-3">
                  {editingId === project.id ? (
                    <Input
                      value={project.title}
                      onChange={(e) =>
                        setProjects((prev) =>
                          prev.map((p) =>
                            p.id === project.id ? { ...p, title: e.target.value } : p
                          )
                        )
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    project.title
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === project.id ? (
                    <Input
                      value={project.description}
                      onChange={(e) =>
                        setProjects((prev) =>
                          prev.map((p) =>
                            p.id === project.id ? { ...p, description: e.target.value } : p
                          )
                        )
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    project.description
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {editingId === project.id ? (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleSave(project.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                        <DropdownMenuItem
                          onClick={() => handleEdit(project.id)}
                          className="text-white hover:bg-gray-800"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(project.id)}
                          className="text-red-500 hover:bg-gray-800"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
