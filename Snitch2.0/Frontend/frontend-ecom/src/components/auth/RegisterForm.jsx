import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth.api";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      await registerUser(formData);

      navigate("/login");
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Full Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          className="w-full rounded-xl border border-zinc-200 px-4 py-2 outline-none transition focus:border-zinc-900"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="w-full rounded-xl border border-zinc-200 px-4 py-2 outline-none transition focus:border-zinc-900"
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
          className="w-full rounded-xl border border-zinc-200 px-4 py-2 outline-none transition focus:border-zinc-900"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">
          Confirm Password
        </label>

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
          className="w-full rounded-xl border border-zinc-200 px-4 py-2 outline-none transition focus:border-zinc-900"
        />
      </div>

      {/* Role */}
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">
          Account Type
        </label>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 outline-none focus:border-zinc-900"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-zinc-900 py-2 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
};

export default RegisterForm;