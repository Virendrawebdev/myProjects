import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left - Brand Visual */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
            alt="Snitch fashion"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
            <Link
              to="/"
              className="text-2xl font-bold tracking-[0.25em] text-white"
            >
              SNITCH
            </Link>

            <div className="max-w-md text-white">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                Style starts here
              </p>

              <h2 className="text-4xl font-semibold leading-tight xl:text-5xl">
                Dress different.
                <br />
                Stay confident.
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
                Discover your style and explore the latest fashion
                with Snitch 2.0.
              </p>
            </div>

            <p className="text-xs text-white/50">
              © 2026 SNITCH 2.0
            </p>
          </div>
        </div>

        {/* Right - Login */}
        <div className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-12 lg:hidden">
              <Link
                to="/"
                className="text-2xl font-bold tracking-[0.25em] text-zinc-950"
              >
                SNITCH
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                Welcome back
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                Sign in to your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Continue your shopping journey with Snitch.
              </p>
            </div>

            {/* Existing Form */}
            <LoginForm />

            {/* Register */}
            <div className="mt-8 border-t border-zinc-100 pt-6 text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-zinc-950 hover:underline"
              >
                Create account
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;




