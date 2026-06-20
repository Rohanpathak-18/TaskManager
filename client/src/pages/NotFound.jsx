import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white">
      <h1 className="text-8xl font-bold">
        404
      </h1>

      <p className="text-slate-400 mt-4">
        Page Not Found
      </p>

      <Link
        to="/dashboard"
        className="mt-6 bg-indigo-600 px-6 py-3 rounded-xl"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;