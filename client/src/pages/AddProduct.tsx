import { useState } from "react";
import { useLocation } from "wouter";
import MainLayout from "../components/Layout/MainLayout";
import { auth } from "../lib/auth";
import { Card, CardContent } from "../components/UI/Card";
import Button from "../components/UI/Button";
import Input, { Textarea, Select } from "../components/UI/Input";
import { ArrowLeft, Save, FileText } from "lucide-react";

interface ProductFile {
  name: string;
  file: File | null;
}

export default function AddProduct() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [saleSchedule, setSaleSchedule] = useState("");
  const [files, setFiles] = useState<ProductFile[]>([]);
  const [status, setStatus] = useState("draft");

  // Editor mode (Visual or Code)
  const [editorMode, setEditorMode] = useState<"visual" | "code">("visual");

  const handleAddFile = () => {
    setFiles([...files, { name: "", file: null }]);
  };

  const handleFileChange = (index: number, field: "name" | "file", value: string | File) => {
    const newFiles = [...files];
    if (field === "name") {
      newFiles[index].name = value as string;
    } else {
      newFiles[index].file = value as File;
    }
    setFiles(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
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
      setLoading(true);
      setError(null);

      if (!productName.trim()) {
        setError("Product name is required");
        return;
      }

      if (!description.trim()) {
        setError("Product description is required");
        return;
      }

      const token = auth.getToken();
      if (!token) {
        setLocation("/login");
        return;
      }

      // Prepare file data
      const fileData = files
        .filter(f => f.name && f.file)
        .map(f => ({
          name: f.name,
          fileName: f.file?.name,
          fileSize: f.file?.size
        }));

      const productData = {
        name: productName,
        description: description,
        categories: categories,
        regular_price: regularPrice,
        sale_price: salePrice,
        sale_schedule: saleSchedule,
        files: fileData,
        status: isDraft ? "draft" : "publish"
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create product");
      }

      console.log("✅ Product created:", data.data);
      
      // Redirect to products page
      setLocation("/products");
    } catch (err: any) {
      console.error("Error creating product:", err);
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
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
                    rows={8}
                    className="border-0 focus:ring-0 resize-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <Input
                  value={categories.join(", ")}
                  onChange={(e) => setCategories(e.target.value.split(",").map(c => c.trim()).filter(Boolean))}
                  placeholder="Enter categories (comma separated)"
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

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Regular Price ($)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={regularPrice}
                    onChange={(e) => setRegularPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sale Price ($)
                  </label>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="0.00"
                      className="w-full"
                    />
                    {salePrice && (
                      <button
                        type="button"
                        onClick={() => setSaleSchedule(saleSchedule ? "" : "enabled")}
                        className="text-orange-600 hover:text-orange-700 text-sm"
                      >
                        SCHEDULE
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Files Section */}
              <div>
                <div className="mb-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-2 text-sm font-medium text-gray-700">Name</th>
                        <th className="text-left py-2 text-sm font-medium text-gray-700">File</th>
                        <th className="w-20"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-2">
                            <Input
                              value={file.name}
                              onChange={(e) => handleFileChange(index, "name", e.target.value)}
                              placeholder="File name"
                              className="w-full"
                            />
                          </td>
                          <td className="py-2">
                            <input
                              type="file"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileChange(index, "file", e.target.files[0]);
                                }
                              }}
                              className="text-sm"
                            />
                          </td>
                          <td className="py-2">
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddFile}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  ADD FILE
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleSubmit(false)}
                  disabled={loading}
                  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  {loading ? "Creating..." : "ADD PRODUCT"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSubmit(true)}
                  disabled={loading}
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
