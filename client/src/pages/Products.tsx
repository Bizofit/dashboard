import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import { auth } from "../lib/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/UI/Card";
import Button from "../components/UI/Button";
import {
  Package,
  DollarSign,
  ShoppingCart,
  ExternalLink,
  Plus,
  Edit3,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  permalink: string;
  price: number;
  regular_price: number;
  sale_price: number | null;
  stock_status: string;
  sku: string;
  total_sales: number;
  image: {
    url: string;
    alt: string;
  } | null;
}

interface ProductsData {
  products: Product[];
  stats: {
    total_products: number;
    published_products: number;
    draft_products: number;
    total_sales: number;
  };
}

export default function Products() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productsData, setProductsData] = useState<ProductsData | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = auth.getToken();
      if (!token) {
        setLocation("/login");
        return;
      }

      const response = await fetch("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProductsData(data.data);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.message || "Failed to load products");
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

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-red-700">
                <Package className="w-5 h-5" />
                <div>
                  <p className="font-medium">Error loading products</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
              <Button
                onClick={fetchProducts}
                className="mt-4 bg-red-600 hover:bg-red-700"
              >
                Try Again
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Products
              </h1>
              <p className="text-gray-600">
                WooCommerce products from Bizoforce marketplace
              </p>
            </div>
            <Button
              onClick={() => setLocation("/products/add")}
              className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        {productsData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Products */}
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Total Products</p>
                    <p className="text-3xl font-bold">
                      {productsData.products.length}
                    </p>
                  </div>
                  <Package className="w-12 h-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            {/* Total Sales */}
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm mb-1">Total Sales</p>
                    <p className="text-3xl font-bold">
                      {productsData.stats.total_sales}
                    </p>
                  </div>
                  <ShoppingCart className="w-12 h-12 text-green-200" />
                </div>
              </CardContent>
            </Card>

            {/* Revenue */}
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold">
                      {formatPrice(0)}
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            {/* In Stock */}
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm mb-1">In Stock</p>
                    <p className="text-3xl font-bold">
                      {productsData.stats.published_products}
                    </p>
                  </div>
                  <Package className="w-12 h-12 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Grid */}
        {productsData && productsData.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100">
                  {product.image ? (
                    <img
                      src={product.image.url}
                      alt={product.image.alt || product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  {product.stock_status === "instock" ? (
                    <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
                    {product.name}
                  </h3>

                  {product.sku && (
                    <p className="text-sm text-gray-500 mb-3">SKU: {product.sku}</p>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    {product.sale_price && product.sale_price < product.regular_price ? (
                      <>
                        <span className="text-2xl font-bold text-orange-600">
                          {formatPrice(product.sale_price)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.regular_price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Sales Info */}
                  {product.total_sales > 0 && (
                    <p className="text-sm text-gray-600 mb-4">
                      <ShoppingCart className="w-4 h-4 inline mr-1" />
                      {product.total_sales} sales
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setLocation(`/products/${product.id}/view`)}
                      variant="outline"
                      className="flex-1 text-sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      onClick={() => setLocation(`/products/${product.id}/edit`)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-sm"
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start selling by creating your first product
              </p>
              <Button
                onClick={() =>
                  window.open("https://bizoforce.com/wp-admin/post-new.php?post_type=product", "_blank")
                }
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
