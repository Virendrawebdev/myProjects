import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/product.api";
import CustomerHeader from "../../components/customer/CustomerHeader";

const ProductDetails = () => {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId);
                console.log("Product details:", response);

                setProduct(response.data);
            } catch (error) {
                console.error("Product details error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    if (!product) {
        return <div className="p-6">Product not found</div>;
    }

    return (
        <>
        <CustomerHeader/>
        <div className="min-h-screen bg-zinc-50 p-4">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-2">

                    {/* Image */}
                    <div className="overflow-hidden rounded-2xl bg-white">
                        <img
                            src={product.images?.[0]}
                            alt={product.productName}
                            className="h-full max-h-[600px] w-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <p className="text-sm text-zinc-500">
                            {product.brand}
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">
                            {product.productName}
                        </h1>

                        <p className="mt-4 text-2xl font-semibold text-zinc-900">
                            ₹{product.Price || product.price}
                        </p>

                        <p className="mt-4 text-2xl font-semibold text-zinc-900">
                            ₹{product.discountPrice || product.price} Off
                        </p>

                        <p className="mt-6 leading-7 text-zinc-600">
                            {product.description}
                        </p>

                        {/* Size */}
                        <div className="mt-6">
                            <p className="mb-3 text-sm font-medium text-zinc-900">
                                Select Size
                            </p>

                            <div className="flex gap-2">
                                {["S", "M", "L", "XL"].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setSize(item)}
                                        className={`h-10 w-12 rounded-lg border text-sm font-medium ${size === item
                                            ? "border-zinc-900 bg-zinc-900 text-white"
                                            : "border-zinc-300 bg-white text-zinc-900"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-6">
                            <p className="mb-3 text-sm font-medium text-zinc-900">
                                Quantity
                            </p>

                            <div className="flex w-fit items-center rounded-lg border border-zinc-300 bg-white">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2"
                                >
                                    −
                                </button>

                                <span className="px-4">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        setQuantity(Math.min(product.stock, quantity + 1))
                                    }
                                    className="px-4 py-2"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-zinc-500">
                            Stock: {product.stock}
                        </p>

                        <div className="mt-8 flex gap-3">
                            <button className="flex-1 rounded-full border border-zinc-900 bg-white px-6 py-3 font-medium text-zinc-900">
                                Add to Cart
                            </button>

                            <button className="flex-1 rounded-full bg-zinc-900 px-6 py-3 font-medium text-white">
                                Buy Now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
};

export default ProductDetails;

