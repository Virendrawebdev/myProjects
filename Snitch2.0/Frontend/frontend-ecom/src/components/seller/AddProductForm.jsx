import React, { useState } from "react";
import { createProduct } from "../../services/product.api";

const AddProductForm = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        price: "",
        brand: "",
        discountPrice: "",
        stock: "",
        description: "",
        images: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const ImageUrls = () => {
        return String(formData.images || "")
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean)
            .filter((url) => /^https?:\/\//i.test(url));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedProductName = formData.productName.trim();
        const trimmedDescription = formData.description.trim();
        const trimmedBrand = formData.brand.trim();
        const trimmedCategory = formData.category.trim();

        if (!trimmedProductName || !trimmedDescription || !trimmedBrand || !trimmedCategory) {
            alert("Please fill in product name, description, brand, and category.");
            return;
        }

        try {
            const payload = {
                productName: trimmedProductName,
                description: trimmedDescription,
                brand: trimmedBrand,
                category: trimmedCategory,
                price: Number(formData.price),
                discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
                stock: Number(formData.stock),
                images: ImageUrls()
            };

            const response = await createProduct(payload);

            console.log("Product created:", response);
            alert("Product created successfully!");
            onSuccess?.();
        } catch (error) {
            console.error("Create product error:", error);
            console.log("Error response data:", error.response?.data);

            const backendErrors = error.response?.data?.error;
            const message = Array.isArray(backendErrors)
                ? backendErrors.map((issue) => issue.failed ? `${issue.failed}: ${issue.message}` : issue.message).join("\n")
                : error.response?.data?.message || "Failed to create product";

            alert(message);
        }
    };

    return (
       <div className="max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-zinc-900">
                        Add Product
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        Add a new product to your store
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="text-sm text-zinc-500 hover:text-zinc-900"
                >
                    Cancel
                </button>
            </div>

            <form className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="mt-1 block w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700">
                        Discount Price
                    </label>
                    <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleChange}
                        className="mt-1 block w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700">
                        brand
                    </label>
                    <input
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="mt-1 block w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700">
                        category
                    </label>
                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="mt-1 block w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                 <div className="mb-4 md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700">
                        image URLs (comma separated)
                    </label>
                    <input
                        type="text"
                        placeholder="Image URLs (comma separated)"
                        className="block w-full min-w-0 rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900"
                        name="images"
                        value={formData.images}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col justify-center gap-3 md:col-span-2 sm:flex-row sm:gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;