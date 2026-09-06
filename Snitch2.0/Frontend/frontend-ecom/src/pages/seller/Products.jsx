import React, { useEffect, useState } from "react";
import { getSellerProducts } from "../../services/product.api";
import AddProductForm from "../../components/seller/AddProductForm";
import Sidebar from "../../components/seller/Sidebar";
const Products = (dashboard) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4; // Number of products to display per page

  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  useEffect(() => {
    // yahan existing product API connect karenge
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getSellerProducts();
        console.log("Fetched Products:", data);
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="sm:flex min-h-screen min-w-0 bg-[#f4f5ef]">
       <Sidebar dashboard={dashboard} />
   
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">
            Products
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your products and inventory
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl  bg-red-500 ml-2 px-2 py-2 text-sm font-medium text-white scroll-m-0 transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
          >
            + Add Product
          </button>
        </div>

      </div>
      {
        showForm && (
          <AddProductForm onClose={() => setShowForm(false)} />
        )
      }

      <div className="rounded-2xl border bg-white *:border-zinc-200  ">
        {products.length === 0 ? (
          <div className="p-10 text-center gap-2 text-sm text-zinc-500">
            <p className="text-zinc-500 ">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
              >
                <div className="aspect-square bg-zinc-100">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.productName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="truncate font-medium text-zinc-900">
                    {product.productName}
                  </h2>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="font-semibold text-zinc-900">
                      ₹{product.price}
                    </p>
                    <p className="font-semibold text-zinc-900">
                      Discount ₹{product.discountPrice}
                    </p>

                    <p
                      className={`text-sm ${product.stock <= 5 ? "text-red-500" : "text-zinc-500"
                        }`}
                    >
                      {product.stock} left
                    </p>
                  </div>
                  <div className="mt-2 text-sm text-zinc-500">
                    {product.description}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-xl border bg-green-500 border-zinc-200 px-3 py-2 text-sm font-medium *:text-white scroll-m-0 transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer">
                      Edit
                    </button>

                    <button className="flex-1 rounded-xl bg-zinc-900 px-3 py-2 text-sm font-medium text-white scroll-m-0 transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-lg px-4 py-2 text-sm ${currentPage === index + 1
                  ? "bg-zinc-900 text-white"
                  : "border border-zinc-200"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
     </div>
  );
};

export default Products;