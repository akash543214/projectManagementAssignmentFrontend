import { useState } from "react";
import { logoutUser } from "@/BackendApi/authApi";
import { logout } from "@/store/authSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, LogOut, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "Incomplete" | "In Progress" | "Complete";
  dueDate: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design Landing Page",
    description: "Create hero section and call-to-action",
    status: "In Progress",
    dueDate: "2025-08-15",
  },
  {
    id: 2,
    title: "API Integration",
    description: "Connect backend APIs to dashboard",
    status: "Incomplete",
    dueDate: "2025-08-20",
  },
];

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Task>>({});
    const dispatch = useDispatch();

  const startEditing = (task: Task) => {
    setEditingRow(task.id);
    setEditData(task);
  };

  const cancelEditing = () => {
    setEditingRow(null);
    setEditData({});
  };

  const saveEditing = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id === editingRow ? { ...(t as Task), ...(editData as Task) } : t))
    );
    cancelEditing();
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      title: "New Task",
      description: "Description here...",
      status: "Incomplete",
      dueDate: format(new Date(), "yyyy-MM-dd"),
    };
    setTasks((prev) => [newTask, ...prev]);
    setEditingRow(newTask.id);
    setEditData(newTask);
  };

  const handleLogout = async() => {
   
    try{
        await logoutUser();
        dispatch(logout());
    }catch{
      alert("error logging out");
    }
  };

  return (
    <div className="p-6">
      {/* Header with Logout */}
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2 dark:border-neutral-700"
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </div>

      {/* Add Task Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Tasks
        </h2>
        <Button
          onClick={handleAddTask}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </div>

      {/* Table */}
      <div className="mt-4 rounded-2xl border shadow-sm p-4 bg-white dark:bg-neutral-900 dark:border-neutral-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-neutral-800">
              <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
                Title
              </TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
                Description
              </TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-200">
                Due Date
              </TableHead>
              <TableHead className="font-semibold text-gray-700 dark:text-gray-200 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => {
              const isEditing = editingRow === task.id;
              return (
                <TableRow
                  key={task.id}
                  className="hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  {/* Title */}
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    {isEditing ? (
                      <Input
                        value={editData.title || ""}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, title: e.target.value }))
                        }
                        className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100"
                      />
                    ) : (
                      task.title
                    )}
                  </TableCell>

                  {/* Description */}
                  <TableCell className="text-gray-900 dark:text-gray-100 max-w-xs truncate">
                    {isEditing ? (
                      <Input
                        value={editData.description || ""}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100"
                      />
                    ) : (
                      <span title={task.description}>{task.description}</span>
                    )}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {isEditing ? (
                      <Select
                        value={editData.status || "Incomplete"}
                        onValueChange={(val) =>
                          setEditData((prev) => ({ ...prev, status: val as Task["status"] }))
                        }
                      >
                        <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-neutral-800 dark:border-neutral-700">
                          <SelectItem value="Incomplete">Incomplete</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Complete">Complete</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          task.status === "Complete" &&
                            "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
                          task.status === "In Progress" &&
                            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
                          task.status === "Incomplete" &&
                            "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        )}
                      >
                        {task.status}
                      </span>
                    )}
                  </TableCell>

                  {/* Due Date */}
                  <TableCell className="text-gray-900 dark:text-gray-100">
                    {isEditing ? (
                      <Input
                        type="date"
                        value={editData.dueDate || ""}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, dueDate: e.target.value }))
                        }
                        className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-100"
                      />
                    ) : (
                      format(new Date(task.dueDate), "yyyy-MM-dd")
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    {isEditing ? (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEditing}
                          className="dark:border-neutral-700"
                        >
                          Cancel
                        </Button>
                        <Button size="sm" onClick={saveEditing}>
                          Save
                        </Button>
                      </div>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="dark:bg-neutral-800">
                          <DropdownMenuItem onClick={() => startEditing(task)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(task.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
