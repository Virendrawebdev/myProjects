import React, { useState } from "react";
import { createProduct } from "../../services/product.api";

const AddProductForm = ({ onClose }) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imageUrls = formData.images
                .split(",")
                .map((url) => url.trim())
                .filter(Boolean);

            const payload = {
                productName: formData.productName,
                description: formData.description,
                brand: formData.brand,
                category: formData.category,
                price: Number(formData.price),
                discountPrice: formData.discountPrice ? Number(formData.discountPrice) : 0,
                stock: Number(formData.stock),
                images: imageUrls
            };

            const response = await createProduct(payload);

            console.log("Product created:", response);
            alert("Product created successfully!");
            onClose();
        } catch (error) {
            console.error("Create product error:", error);
            alert(error.response?.data?.message || error.response?.data?.error || "Failed to create product");
        }
    };

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
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

            <form className="grid grid-cols-1 gap-4 md:grid-cols-2 *:gap-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Brand"
                    className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Category"
                    className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    placeholder="Price"
                    className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    placeholder="Discount Price"
                    className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    placeholder="Stock"
                    className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    placeholder="Image URLs (comma separated)"
                    className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                />

                <textarea
                    placeholder="Product Description"
                    rows="5"
                    className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 md:col-span-2"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 md:col-span-2"
                >
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;