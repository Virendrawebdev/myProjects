import { useEffect, useState } from "react";
import { getSellerProducts , deleteProduct} from "../../services/product.api";
import AddProductForm from "../../components/seller/AddProductForm";
import Sidebar from "../../components/seller/Sidebar";
import EditProductForm from "../../components/seller/EditProductForm";
import Header from "../../components/seller/Header";
import { getSellerDashboard } from "../../services/dashboard.api";


const Products = ({ dashboard }) => {
  const [sellerDashboard, setSellerDashboard] = useState(dashboard || null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null); // State to hold the product being edited

  const productsPerPage = 8;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);
  const lowStockCount = products.filter((product) => product.stock <= 5).length;
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(price || 0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getSellerProducts();
      console.log("Fetched Products:", data);
      setProducts(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSellerProducts()
      .then((response) => setProducts(response.data || []))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      })
      .finally(() => setLoading(false));
    getSellerDashboard()
      .then((response) => setSellerDashboard(response.data))
      .catch((error) => console.error("Seller profile error:", error));
  }, []);

  const handleAddSuccess = () => {
    setShowForm(false);
    fetchProducts();
  };

  const handleupdateSuccess = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDelete = async (productId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  try {
    await deleteProduct(productId);

    await fetchProducts();

    alert("Product deleted successfully!");
  } catch (error) {
    console.error("Delete product error:", error);

    alert(
      error.response?.data?.message || "Failed to delete product"
    );
  }
};

  if (loading) {
    return (
      <div className="min-h-screen min-w-0 bg-[#f4f5ef] lg:flex">
        <Sidebar dashboard={sellerDashboard} />
        <div className="min-w-0 flex-1">
          <Header dashboard={sellerDashboard} />
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl animate-pulse">
              <div className="h-28 rounded-3xl bg-zinc-200" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-64 rounded-2xl bg-white" />)}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-0 bg-[#f4f5ef] lg:flex">
      <Sidebar dashboard={sellerDashboard} />
      <div className="min-w-0 flex-1">
      <Header dashboard={sellerDashboard} />
      <main className="min-w-0 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-[1600px]">
      <section className="mb-6 flex flex-col justify-between gap-5 rounded-3xl bg-[#e8eddb] p-5 sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Your catalog</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">Products</h1>
          <p className="mt-2 text-sm text-zinc-600">Manage your listings, pricing, and inventory.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#111110] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
        >
          <span aria-hidden="true">+</span> Add product
        </button>
      </section>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Total listings</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-950">{products.length}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">In stock</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-950">{products.filter((product) => product.stock > 0).length}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Needs restock</p>
          <p className={`mt-2 text-2xl font-semibold ${lowStockCount ? "text-amber-700" : "text-zinc-950"}`}>{lowStockCount}</p>
        </div>
      </div>

      {
        showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-950/55 p-3 backdrop-blur-sm sm:p-6">
            <AddProductForm onClose={() => setShowForm(false)} onSuccess={handleAddSuccess} />
          </div>
        )
      }

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-zinc-950/55 p-3 backdrop-blur-sm sm:p-6">
        <EditProductForm product={editingProduct} onClose={() => setEditingProduct(null)} onSuccess={handleupdateSuccess} />
        </div>
      )}

      <div>
        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center">
            <p className="text-lg font-semibold text-zinc-900">Your catalog is ready for its first product.</p>
            <p className="mt-2 text-sm text-zinc-500">Add a product to start building your store.</p>
            <button type="button" onClick={() => setShowForm(true)} className="mt-5 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700">Add your first product</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.productName}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                      No Image
                    </div>
                  )}
                  <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${product.stock > 5 ? "bg-white/95 text-emerald-700" : product.stock > 0 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-700"}`}>
                    {product.stock > 5 ? "In stock" : product.stock > 0 ? "Low stock" : "Out of stock"}
                  </span>
                </div>

                <div className="p-4">
                  <p className="truncate text-xs font-semibold uppercase tracking-wider text-zinc-400">{product.brand} · {product.category}</p>
                  <h2 className="mt-1 truncate font-semibold text-zinc-900">
                    {product.productName}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                    <p className="font-semibold text-zinc-950">₹{formatPrice(product.discountPrice > 0 && product.discountPrice < product.price ? product.discountPrice : product.price)}</p>
                    {product.discountPrice > 0 && product.discountPrice < product.price && <p className="text-xs text-zinc-400 line-through">₹{formatPrice(product.price)}</p>}
                    <p className="ml-auto text-xs text-zinc-500">{product.stock} units</p>
                  </div>
                  <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-zinc-500">
                    {product.description}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={()=>setEditingProduct(product)} className="flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400">
                      Edit
                    </button>

                    <button type="button" onClick={()=>handleDelete(product._id)} className="flex-1 rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
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
      </main>
      </div>
    </div>
  );
};

export default Products;