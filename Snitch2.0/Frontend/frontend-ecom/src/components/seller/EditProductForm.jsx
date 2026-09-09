import React, { useState } from "react";
import { updateProduct } from "../../services/product.api";

const EditProductForm = ({ product, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        ...product,
        images: Array.isArray(product.images) ? product.images.join(", ") : product.images || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                productName: formData.productName,
                description: formData.description,
                brand: formData.brand,
                category: formData.category,
                price: Number(formData.price),
                discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
                stock: Number(formData.stock),
                images: formData.images
                    .split(",")
                    .map((url) => url.trim())
                    .filter(Boolean),
            };

            await updateProduct(product._id, payload);
            alert("Product updated successfully!");
            onSuccess?.();
        } catch (error) {
            console.error("Error updating product:", error.response?.data || error);
        }
    };

    return (
        <div className="max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-zinc-900">
                        Edit Product
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        Update your product details
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

            <p className="text-sm text-zinc-600">
                Editing: {product?.productName}
            </p>
            <form className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
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
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProductForm;