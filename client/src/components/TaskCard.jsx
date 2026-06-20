import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";

      case "In Progress":
        return "bg-cyan-500";

      default:
        return "bg-yellow-500";
    }
  };

  const getPriorityColor = (
    priority
  ) => {
    switch (priority) {
      case "High":
        return "bg-red-500";

      case "Medium":
        return "bg-orange-500";

      default:
        return "bg-green-500";
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.3,
      }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}

      <div className="flex justify-between items-start gap-3">
        <h3 className="text-xl font-bold break-words">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>
      </div>

      {/* Description */}

      <p className="text-slate-400 mt-4 min-h-[60px]">
        {task.description ||
          "No description provided"}
      </p>

      {/* Due Date */}

      <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
        <FaCalendarAlt />

        <span>
          {task.dueDate
            ? new Date(
                task.dueDate
              ).toLocaleDateString()
            : "No Due Date"}
        </span>
      </div>

      {/* Footer */}

      <div className="mt-5 flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority} Priority
        </span>

        <div className="flex gap-3">
          <button
            onClick={() =>
              onEdit(task)
            }
            className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg transition"
          >
            <FaEdit />
          </button>

          <button
            onClick={() =>
              onDelete(task._id)
            }
            className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskCard;