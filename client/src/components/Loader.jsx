import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
      />
    </div>
  );
}

export default Loader;