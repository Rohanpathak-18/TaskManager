import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaSpinner,
} from "react-icons/fa";

import { getStats } from "../services/taskService";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });

  const [loading, setLoading] =
    useState(true);

useEffect(() => {
  let mounted = true;

  const load = async () => {
    try {
      const data = await getStats();
      if (mounted) setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  load();

  return () => {
    mounted = false;
  };
}, []);

  const fetchStats = async () => {
    try {
      const data = await getStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const completionPercentage =
    stats.total > 0
      ? Math.round(
          (stats.completed /
            stats.total) *
            100
        )
      : 0;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: {
      opacity: 1,
      y: 0,
    },
  };

 if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Hero */}

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <h1 className="text-5xl font-bold">
              Dashboard
            </h1>

            <p className="text-slate-400 mt-3 text-lg">
              Welcome back. Track
              your productivity and
              manage tasks
              efficiently.
            </p>
          </motion.div>

          {/* Stats Cards */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.1,
              }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400">
                    Total Tasks
                  </p>

                  <h3 className="text-4xl font-bold mt-2">
                    {stats.total}
                  </h3>
                </div>

                <FaTasks size={40} />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.2,
              }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400">
                    Completed
                  </p>

                  <h3 className="text-4xl font-bold mt-2 text-green-400">
                    {
                      stats.completed
                    }
                  </h3>
                </div>

                <FaCheckCircle
                  size={40}
                />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.3,
              }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400">
                    Pending
                  </p>

                  <h3 className="text-4xl font-bold mt-2 text-yellow-400">
                    {stats.pending}
                  </h3>
                </div>

                <FaClock size={40} />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.4,
              }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-400">
                    In Progress
                  </p>

                  <h3 className="text-4xl font-bold mt-2 text-cyan-400">
                    {
                      stats.inProgress
                    }
                  </h3>
                </div>

                <FaSpinner
                  size={40}
                />
              </div>
            </motion.div>
          </div>

          {/* Progress */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
            className="bg-slate-900 mt-10 p-8 rounded-2xl border border-slate-800"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-semibold">
                Completion Progress
              </h3>

              <span className="text-green-400 font-bold">
                {
                  completionPercentage
                }
                %
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${completionPercentage}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="bg-green-500 h-4 rounded-full"
              />
            </div>

            <p className="text-slate-400 mt-4">
              {stats.completed}
              completed out of{" "}
              {stats.total} tasks
            </p>
          </motion.div>

          {/* Summary Cards */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-semibold">
                Pending Tasks
              </h3>

              <p className="text-4xl font-bold text-yellow-400 mt-3">
                {stats.pending}
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-semibold">
                In Progress
              </h3>

              <p className="text-4xl font-bold text-cyan-400 mt-3">
                {
                  stats.inProgress
                }
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-semibold">
                Completed
              </h3>

              <p className="text-4xl font-bold text-green-400 mt-3">
                {
                  stats.completed
                }
              </p>
            </div>
          </div>

          {/* Actions */}

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() =>
                navigate("/tasks")
              }
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl font-semibold"
            >
              Manage Tasks
            </button>

            <button
              onClick={fetchStats}
              className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-xl"
            >
              Refresh Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;