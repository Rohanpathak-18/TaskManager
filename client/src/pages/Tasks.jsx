import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

import TaskCard from "../components/TaskCard";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    });

  const [editingTask, setEditingTask] =
    useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await updateTask(
          editingTask._id,
          formData
        );

        toast.success(
          "Task Updated Successfully"
        );
      } else {
        await createTask(formData);

        toast.success(
          "Task Created Successfully"
        );
      }

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        dueDate: "",
      });

      setEditingTask(null);

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Operation Failed"
      );
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    setFormData({
      title: task.title,
      description:
        task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate
        ? task.dueDate.split("T")[0]
        : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this task?"
      );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      toast.success(
        "Task Deleted Successfully"
      );

      fetchTasks();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  const filteredTasks =
    tasks.filter((task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All"
          ? true
          : task.status ===
            statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            Manage Tasks
          </h1>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 p-6 rounded-xl mb-8 border border-slate-800"
          >
            <h2 className="text-2xl font-semibold mb-5">
              {editingTask
                ? "Update Task"
                : "Create Task"}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={
                  handleChange
                }
                className="p-3 rounded bg-slate-800 outline-none"
                required
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                className="p-3 rounded bg-slate-800 outline-none"
              />

              <select
                name="priority"
                value={
                  formData.priority
                }
                onChange={
                  handleChange
                }
                className="p-3 rounded bg-slate-800 outline-none"
              >
                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                className="p-3 rounded bg-slate-800 outline-none"
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

              <input
                type="date"
                name="dueDate"
                value={
                  formData.dueDate
                }
                onChange={
                  handleChange
                }
                className="p-3 rounded bg-slate-800 outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg mt-5"
            >
              {editingTask
                ? "Update Task"
                : "Create Task"}
            </button>
          </form>

          {/* Search + Filter */}

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search Tasks..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 p-3 rounded bg-slate-900 border border-slate-800"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="p-3 rounded bg-slate-900 border border-slate-800"
            >
              <option value="All">
                All Tasks
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>
          </div>

          {/* Tasks */}

          {filteredTasks.length ===
          0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl text-slate-400">
                No Tasks Found
              </h2>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map(
                (task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={
                      handleEdit
                    }
                    onDelete={
                      handleDelete
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Tasks;