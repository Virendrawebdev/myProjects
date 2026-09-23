import React, { useState } from "react";
import { Link } from "react-router-dom";
import { recommendProducts } from "../../services/ai.api";
import CustomerHeader from "../../components/customer/CustomerHeader";

const AIRecommend = () => {
  const [prompt, setPrompt] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    try {
      setLoading(true);

      const response = await recommendProducts(prompt);

      setProducts(response.data || []);
    } catch (error) {
      console.error("AI recommendation error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to get AI recommendations"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <CustomerHeader/>
    
    <div className="min-h-screen bg-zinc-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium text-zinc-500">
            SNITCH 2.0 AI
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
            Find Your Perfect Style
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-500">
            Tell us what you are looking for and AI will recommend
            products based on your requirement.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={handleRecommend}
          className="mx-auto mt-8 max-w-2xl"
        >
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: I want a casual black shirt under ₹2000"
              rows={3}
              className="w-full resize-none rounded-xl border border-zinc-200 p-4 text-sm outline-none focus:border-zinc-900"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Finding Products..." : "✨ Get Recommendations"}
            </button>
          </div>
        </form>

        {/* Results */}
        {products.length > 0 && (
          <section className="mt-10">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-zinc-900">
                Recommended For You
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                AI selected these products based on your requirement.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group overflow-hidden rounded-2xl bg-white"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden bg-zinc-100">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.productName}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <p className="text-xs text-zinc-500">
                      {product.brand || product.category}
                    </p>

                    <h3 className="mt-1 truncate text-sm font-medium text-zinc-900">
                      {product.productName}
                    </h3>

                    <p className="mt-2 font-semibold text-zinc-900">
                      ₹
                      {product.discountPrice || product.price}
                    </p>

                    {product.reason && (
                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-zinc-500">
                        {product.reason}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-sm text-zinc-400">
              Describe what you want and let AI find products for you.
            </p>
          </div>
        )}
      </div>
    </div>
      </>
  
  );
};
export default AIRecommend;