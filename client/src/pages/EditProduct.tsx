import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import { auth } from "../lib/auth";
import { Card, CardContent } from "../components/UI/Card";
import Button from "../components/UI/Button";
import Input, { Textarea, Select } from "../components/UI/Input";
import { ArrowLeft, FileText, X } from "lucide-react";

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
  categories?: string[];
  tags?: string[];
}

interface EditProductProps {
  productId?: string;
}

export default function EditProduct({ productId: propProductId }: EditProductProps) {
  const [, setLocation] = useLocation();
  const params = useParams();
  const productId = propProductId || params.productId;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [productType, setProductType] = useState("simple");
  const [status, setStatus] = useState("publish");

  // Editor mode (Visual or Code)
  const [editorMode, setEditorMode] = useState<"visual" | "code">("visual");
  const [shortDescMode, setShortDescMode] = useState<"visual" | "code">("visual");

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

      const product = data.data;
      setProductName(product.title || "");
      setDescription(product.description || "");
      setShortDescription(product.short_description || "");
      setRegularPrice(product.regular_price?.toString() || "");
      setSalePrice(product.sale_price?.toString() || "");
      setStatus(product.status || "publish");
      
      if (product.categories) {
        setCategories(product.categories);
      }
      
    } catch (err: any) {
      console.error("Error fetching product:", err);
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    try {
      setSaving(true);
      setError(null);

      if (!productName.trim()) {
        setError("Product name is required");
        return;
      }

      const token = auth.getToken();
      if (!token) {
        setLocation("/login");
        return;
      }

      const productData = {
        name: productName,
        description: description,
        short_description: shortDescription,
        categories: categories,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        regular_price: regularPrice,
        sale_price: salePrice,
        product_type: productType,
        status: isDraft ? "draft" : status
      };

      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update product");
      }

      console.log("✅ Product updated:", data.data);
      
      // Redirect to products page
      setLocation("/products");
    } catch (err: any) {
      console.error("Error updating product:", err);
      setError(err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
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

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => setLocation("/products")}
            >
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <Card>
          <CardContent className="p-6">
            <form className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  className="w-full"
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Toolbar */}
                  <div className="bg-gray-50 border-b border-gray-300 px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Add Media"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-gray-600 px-2">ADD MEDIA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className={`px-3 py-1 text-sm rounded ${
                          editorMode === "visual"
                            ? "bg-white border border-gray-300"
                            : "bg-transparent"
                        }`}
                        onClick={() => setEditorMode("visual")}
                      >
                        Visual
                      </button>
                      <button
                        type="button"
                        className={`px-3 py-1 text-sm rounded ${
                          editorMode === "code"
                            ? "bg-white border border-gray-300"
                            : "bg-transparent"
                        }`}
                        onClick={() => setEditorMode("code")}
                      >
                        Code
                      </button>
                    </div>
                  </div>

                  {/* Editor Buttons */}
                  <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center gap-1">
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Bold">
                      <strong>B</strong>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Italic">
                      <em>I</em>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Underline">
                      <u>U</u>
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Quote">
                      "
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Code">
                      &lt;/&gt;
                    </button>
                  </div>

                  {/* Text Area */}
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    rows={6}
                    className="border-0 focus:ring-0 resize-none"
                  />
                </div>
              </div>

              {/* Product Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Short Description
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Toolbar */}
                  <div className="bg-gray-50 border-b border-gray-300 px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Add Media"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-gray-600 px-2">ADD MEDIA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className={`px-3 py-1 text-sm rounded ${
                          shortDescMode === "visual"
                            ? "bg-white border border-gray-300"
                            : "bg-transparent"
                        }`}
                        onClick={() => setShortDescMode("visual")}
                      >
                        Visual
                      </button>
                      <button
                        type="button"
                        className={`px-3 py-1 text-sm rounded ${
                          shortDescMode === "code"
                            ? "bg-white border border-gray-300"
                            : "bg-transparent"
                        }`}
                        onClick={() => setShortDescMode("code")}
                      >
                        Code
                      </button>
                    </div>
                  </div>

                  {/* Editor Buttons */}
                  <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 flex items-center gap-1">
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Bold">
                      <strong>B</strong>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Italic">
                      <em>I</em>
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Underline">
                      <u>U</u>
                    </button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Quote">
                      "
                    </button>
                    <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Code">
                      &lt;/&gt;
                    </button>
                  </div>

                  {/* Text Area */}
                  <Textarea
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Enter short description"
                    rows={4}
                    className="border-0 focus:ring-0 resize-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <div className="border border-gray-200 rounded-lg p-3 min-h-[80px]">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                      >
                        {category}
                        <button
                          type="button"
                          onClick={() => removeCategory(category)}
                          className="hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Search or add a tag..."
                  className="w-full"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                {!featuredImage ? (
                  <div>
                    <label className="cursor-pointer text-orange-600 hover:text-orange-700 text-sm">
                      Set featured image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFeaturedImageChange}
                        className="hidden"
                      />
                    </label>
                    <br />
                    <button
                      type="button"
                      className="text-orange-600 hover:text-orange-700 text-sm mt-1"
                    >
                      Remove featured image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      {featuredImage.name}
                    </div>
                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      className="text-orange-600 hover:text-orange-700 text-sm"
                    >
                      Remove featured image
                    </button>
                  </div>
                )}
              </div>

              {/* Product Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Type
                </label>
                <Select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full max-w-xs"
                  options={[
                    { value: "simple", label: "Simple product" },
                    { value: "grouped", label: "Grouped product" },
                    { value: "variable", label: "Variable product" },
                    { value: "external", label: "External/Affiliate product" }
                  ]}
                />
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="pb-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-gray-300"
                  >
                    Linked Products
                  </button>
                  <button
                    type="button"
                    className="pb-2 text-sm font-medium text-orange-600 border-b-2 border-orange-600"
                  >
                    Attributes
                  </button>
                  <button
                    type="button"
                    className="pb-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-gray-300"
                  >
                    SEO
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleSubmit(false)}
                  disabled={saving}
                  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  {saving ? "Saving..." : "SAVE CHANGES"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSubmit(true)}
                  disabled={saving}
                  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  SAVE DRAFT
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
