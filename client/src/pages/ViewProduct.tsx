import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import { auth } from "../lib/auth";
import { Card, CardContent } from "../components/UI/Card";
import Button from "../components/UI/Button";
import { ArrowLeft, ShoppingCart, Minus, Plus, Facebook, Twitter, Share2, Instagram, Linkedin } from "lucide-react";

interface ProductData {
  id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  regular_price: number;
  sale_price: number | null;
  status: string;
  sku: string;
  stock_status: string;
  solution_offered_by?: string;
  category?: string;
}

interface RelatedProduct {
  id: number;
  name: string;
  short_description: string;
  price: number;
  regular_price: number;
  sale_price: number | null;
  image: {
    url: string;
    alt: string;
  };
}

interface ViewProductProps {
  productId?: string;
}

export default function ViewProduct({ productId: propProductId }: ViewProductProps) {
  const [, setLocation] = useLocation();
  const params = useParams();
  const productId = propProductId || params.productId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description">("description");

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      setLocation("/login");
      return;
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const token = auth.getToken();
      if (!token) {
        setLocation("/login");
        return;
      }

      const response = await fetch(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch product");
      }

      setProduct(data.data.product);
      setRelatedProducts(data.data.relatedProducts || []);

    } catch (err: any) {
      console.error("Error fetching product:", err);
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-700">{error || "Product not found"}</p>
              <Button onClick={() => setLocation("/products")} className="mt-4">
                Back to Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => setLocation("/products")}
          className="mb-4"
        >
          Back to Products
        </Button>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <div className="relative">
              {product.status === "draft" && (
                <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded text-sm font-medium">
                  NEW
                </span>
              )}
              {product.sale_price && product.sale_price < product.regular_price && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
                  15% OFF
                </span>
              )}
              <img
                src="https://staging.bizoforce.com/wp-content/uploads/woocommerce-placeholder.png"
                alt={product.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

            {product.solution_offered_by && (
              <p className="text-sm text-gray-600 mb-2">
                Solution Offered By: <span className="text-blue-600">{product.solution_offered_by}</span>
              </p>
            )}

            {product.category && (
              <p className="text-sm text-gray-600 mb-4">
                CATEGORY: <span className="text-blue-600">{product.category}</span>
              </p>
            )}

            {/* Price */}
            <div className="mb-6">
              {product.sale_price && product.sale_price < product.regular_price ? (
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-orange-600">
                    {formatPrice(product.sale_price)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.regular_price)}
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(false)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-0 focus:ring-0"
                  min="1"
                />
                <button
                  onClick={() => handleQuantityChange(true)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Facebook className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Twitter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Instagram className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Linkedin className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Description Tab */}
        <div className="mb-12">
          <div className="border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 px-6 text-lg font-medium border-b-2 transition-colors ${
                activeTab === "description"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Description
            </button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setLocation(`/products/${relatedProduct.id}/view`)}
                >
                  <div className="relative">
                    <img
                      src={relatedProduct.image.url}
                      alt={relatedProduct.image.alt}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {relatedProduct.short_description || "Solution Offered By: Business"}
                    </p>
                    <div className="flex items-center gap-2">
                      {relatedProduct.sale_price && relatedProduct.sale_price < relatedProduct.regular_price ? (
                        <>
                          <span className="text-xl font-bold text-orange-600">
                            {formatPrice(relatedProduct.sale_price)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(relatedProduct.regular_price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-gray-900">
                          {formatPrice(relatedProduct.price)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
