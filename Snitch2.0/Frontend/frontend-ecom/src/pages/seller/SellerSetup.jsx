import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSellerProfile } from "../../services/seller.api";
import Sidebar from "../../components/seller/Sidebar";
import Header from "../../components/seller/Header";

const initialForm = {
  shopName: "",
  description: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  upiId: "",
};

const fields = [
  { name: "shopName", label: "Shop name", maxLength: 50 },
  { name: "description", label: "Shop description", maxLength: 500, multiline: true, wide: true },
  { name: "phone", label: "Mobile number", maxLength: 10, inputMode: "numeric" },
  { name: "address", label: "Street address", maxLength: 200 },
  { name: "city", label: "City", maxLength: 100 },
  { name: "state", label: "State", maxLength: 100 },
  { name: "country", label: "Country", maxLength: 100 },
  { name: "pincode", label: "PIN code", maxLength: 6, inputMode: "numeric" },
  { name: "upiId", label: "UPI ID", maxLength: 100 },
];

const SellerSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name]) return current;
      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    try {
      await createSellerProfile(formData);
      navigate("/seller/dashboard", { replace: true });
    } catch (requestError) {
      console.error(requestError);
      const validationErrors = requestError?.response?.data?.error;
      if (Array.isArray(validationErrors)) {
        const nextFieldErrors = {};
        validationErrors.forEach(({ failed, message }) => {
          if (failed) nextFieldErrors[failed] = message;
        });
        setFieldErrors(nextFieldErrors);
        setError(
          Object.keys(nextFieldErrors).length
            ? "Please review the highlighted fields."
            : validationErrors.map(({ message }) => message).filter(Boolean).join(" ")
        );
      } else {
        setError(
          requestError?.response?.data?.message ||
            "Could not save your shop details. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-0 bg-[#f4f5ef] lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Header />
        <main className="min-w-0 px-3 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
          <section className="mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Seller onboarding
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
              Set up your shop
            </h1>
            <p className="mt-1 text-sm leading-5 text-zinc-500">
              Add your shop details to finish setting up your seller account and open
              your dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-3.5 sm:grid-cols-2">
              {fields.map(({ name, label, maxLength, multiline, inputMode, wide }) => (
                <div key={name} className={wide ? "sm:col-span-2" : ""}>
                  <label
                    htmlFor={name}
                    className="mb-1 block text-sm font-medium text-zinc-700"
                  >
                    {label}
                  </label>
                  {multiline ? (
                    <textarea
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      minLength={20}
                      maxLength={maxLength}
                      rows={2}
                      aria-invalid={Boolean(fieldErrors[name])}
                      aria-describedby={fieldErrors[name] ? `${name}-error` : undefined}
                      className={`w-full rounded-xl border px-3 py-2 outline-none focus:border-zinc-900 ${
                        fieldErrors[name] ? "border-red-500" : "border-zinc-200"
                      }`}
                    />
                  ) : (
                    <input
                      id={name}
                      name={name}
                      type="text"
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      maxLength={maxLength}
                      inputMode={inputMode}
                      minLength={
                        name === "shopName" ? 3 :
                        name === "address" ? 10 :
                        name === "city" || name === "state" ? 2 : undefined
                      }
                      pattern={
                        name === "phone" ? "[6-9][0-9]{9}" :
                        name === "pincode" ? "[0-9]{6}" :
                        name === "upiId" ? "[A-Za-z0-9._-]+@[A-Za-z]+" :
                        undefined
                      }
                      title={
                        name === "phone" ? "Enter a valid 10-digit Indian mobile number." :
                        name === "pincode" ? "Enter a 6-digit PIN code." :
                        name === "upiId" ? "Enter a valid UPI ID." :
                        undefined
                      }
                      aria-invalid={Boolean(fieldErrors[name])}
                      aria-describedby={fieldErrors[name] ? `${name}-error` : undefined}
                      className={`w-full rounded-xl border px-3 py-2 outline-none focus:border-zinc-900 ${
                        fieldErrors[name] ? "border-red-500" : "border-zinc-200"
                      }`}
                    />
                  )}
                  {fieldErrors[name] && (
                    <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                      {fieldErrors[name]}
                    </p>
                  )}
                </div>
              ))}

              {error && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700 sm:col-span-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-zinc-900 py-2.5 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
              >
                {loading ? "Saving shop details..." : "Save and open dashboard"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SellerSetup;
