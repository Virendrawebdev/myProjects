import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-6 sm:px-6 sm:py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-8">

        {/* Header */}
        <div className="mb-7 sm:mb-8">
          <p className="text-sm font-medium text-zinc-500">
            Snitch 2.0
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-zinc-900 sm:text-3xl">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Login to access your seller dashboard.
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Register Link */}
        <div className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-zinc-900 hover:underline"
          >
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;