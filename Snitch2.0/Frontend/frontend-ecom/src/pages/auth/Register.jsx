import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-5">
          <p className="text-sm font-medium text-zinc-500">
            Snitch 2.0
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-zinc-900">
            Create account
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Join Snitch and start shopping or selling.
          </p>
        </div>

        <RegisterForm />

        <div className="mt-3 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-zinc-900 hover:underline"
          >
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;