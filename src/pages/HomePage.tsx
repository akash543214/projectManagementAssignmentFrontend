import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProjectData } from "@/types/common";
import LogOut from "@/components/Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getProjects, addProject, updateProjects,deleteProject } from "@/BackendApi/projectApi";


export default function HomePage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editProjectData, setEditProjectData] = useState<ProjectData | null>(null);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

    useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (id: string) => {
    const selectedProject = projects.find((p) => p._id === id);
    if (selectedProject) {
      setEditingId(id);
      setEditProjectData({ ...selectedProject });
    }
  };

  const handleSave = async (id: string) => {
    if (!editProjectData) return;
    try {
      await updateProjects(id, editProjectData);
      setEditingId(null);
      setEditProjectData(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async(id: string) => {
    try{
          await  deleteProject(id);
          fetchProjects()
    }catch(err)
    {
        console.error(err);
    }
  };

  const handleAddProject = async () => {
    try {
      await addProject(newProject);
      setNewProject({ title: "", description: "" });
      fetchProjects();
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
      <LogOut />
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
              <tr key={project._id} className="border-b border-gray-800 hover:bg-gray-900">
                <td className="px-4 py-3">
                  {editingId === project._id ? (
                    <Input
                      value={editProjectData?.title || ""}
                      onChange={(e) =>
                        setEditProjectData((prev) =>
                          prev ? { ...prev, title: e.target.value } : prev
                        )
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    project.title
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === project._id ? (
                    <Input
                      value={editProjectData?.description || ""}
                      onChange={(e) =>
                        setEditProjectData((prev) =>
                          prev ? { ...prev, description: e.target.value } : prev
                        )
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    project.description
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {editingId === project._id ? (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleSave(project._id)}
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
                          onClick={() => handleEdit(project._id)}
                          className="text-white hover:bg-gray-800"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(project._id)}
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
