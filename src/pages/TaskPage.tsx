import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogOut from "@/components/Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TaskData } from "@/types/common";
import { getTasks, addTask, updateTask, deleteTask } from "@/BackendApi/taskApi";
import { useParams } from "react-router";

export default function TaskPage() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTaskData, setEditTaskData] = useState<TaskData | null>(null);
  const [newTask, setNewTask] = useState<Omit<TaskData, "_id">>({
    title: "",
    description: "",
    status: "todo",
    dueDate: new Date(),
  });
  const { id } = useParams();

    const fetchTasks = async () => {
    try {
      console.log(id)
      if (id) {
        const res = await getTasks(id);
        console.log(res);
        setTasks(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (id: string) => {
    const selectedTask = tasks.find((t) => t._id === id);
    if (selectedTask) {
      setEditingId(id);
      setEditTaskData({ ...selectedTask });
    }
  };

  const handleSave = async (id: string) => {
    if (!editTaskData) return;
    try {
      await updateTask(id, editTaskData);
      setEditingId(null);
      setEditTaskData(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async () => {
    try {
      if (id) {
        await addTask(id, newTask);
        setNewTask({
          title: "",
          description: "",
          status: "todo",
          dueDate: new Date(),
        });
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tasks</h1>
     <LogOut />
      </div>

      {/* Add Task */}
      <div className="flex items-center gap-2 mb-6">
        <Input
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="bg-gray-900 border-gray-700 text-white"
        />
        <Input
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="bg-gray-900 border-gray-700 text-white"
        />
        <select
          value={newTask.status}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              status: e.target.value as TaskData["status"],
            })
          }
          className="bg-gray-900 border border-gray-700 text-white rounded px-2 py-1"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <Input
          type="date"
          value={newTask.dueDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setNewTask({ ...newTask, dueDate: new Date(e.target.value) })
          }
          className="bg-gray-900 border-gray-700 text-white"
        />
        <Button
          onClick={handleAddTask}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add Task
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Description</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Due Date</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="border-b border-gray-800 hover:bg-gray-900"
              >
                <td className="px-4 py-3">
                  {editingId === task._id ? (
                    <Input
                      value={editTaskData?.title || ""}
                      onChange={(e) =>
                        setEditTaskData((prev) =>
                          prev ? { ...prev, title: e.target.value } : prev
                        )
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    task.title
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === task._id ? (
                    <Input
                      value={editTaskData?.description || ""}
                      onChange={(e) =>
                        setEditTaskData((prev) =>
                          prev
                            ? { ...prev, description: e.target.value }
                            : prev
                        )
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === task._id ? (
                    <select
                      value={editTaskData?.status || "todo"}
                      onChange={(e) =>
                        setEditTaskData((prev) =>
                          prev
                            ? {
                                ...prev,
                                status: e.target
                                  .value as TaskData["status"],
                              }
                            : prev
                        )
                      }
                      className="bg-gray-800 border border-gray-700 text-white rounded px-2 py-1"
                    >
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  ) : (
                    task.status
                  )}
                </td>
                <td className="px-4 py-3">
                  {editingId === task._id ? (
                    <Input
                      type="date"
                      value={
                        editTaskData?.dueDate
                          ? new Date(editTaskData.dueDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setEditTaskData((prev) =>
                          prev
                            ? { ...prev, dueDate: new Date(e.target.value) }
                            : prev
                        )
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  ) : (
                    new Date(task.dueDate).toLocaleDateString()
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {editingId === task._id ? (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleSave(task._id)}
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
                      <DropdownMenuContent
                        align="end"
                        className="bg-gray-900 border-gray-700"
                      >
                        <DropdownMenuItem
                          onClick={() => handleEdit(task._id)}
                          className="text-white hover:bg-gray-800"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(task._id)}
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
