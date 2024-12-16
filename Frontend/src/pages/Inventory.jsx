import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import EmptyState from '../components/ui/EmptyState'
import ProductCard from '../components/ui/ProductCard'
import AddProductModal from '../components/modals/AddProductModal'
import ConfirmationModal from '../components/modals/ConfirmationModal'
import { formatCurrency } from '../utils/formatters'

function Inventory() {
  const [products, setProducts] = useState([
    {
      id: 'PRD001',
      name: 'Product A',
      sku: 'SKU001',
      category: 'Electronics',
      stock: 45,
      price: 999,
      description: 'High-quality electronic product',
    },
    {
      id: 'PRD002',
      name: 'Product B',
      sku: 'SKU002',
      category: 'Accessories',
      stock: 5,
      price: 499,
      description: 'Premium accessory',
    },
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddProduct = (productData) => {
    const newProduct = {
      id: `PRD${String(products.length + 1).padStart(3, '0')}`,
      ...productData,
    }
    setProducts([...products, newProduct])
    toast.success('Product added successfully')
  }

  const handleDeleteProduct = () => {
    setProducts(products.filter((product) => product.id !== selectedProduct.id))
    setIsDeleteModalOpen(false)
    setSelectedProduct(null)
    toast.success('Product deleted successfully')
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <div className="space-x-2">
          <Button variant="secondary">Import</Button>
          <Button onClick={() => setIsAddModalOpen(true)}>Add Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">{products.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Low Stock Items</p>
            <p className="text-3xl font-bold text-red-600">
              {products.filter((p) => p.stock <= 10).length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(
                products.reduce((total, p) => total + p.price * p.stock, 0)
              )}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="mb-6">
          <SearchInput
            placeholder="Search products..."
            onSearch={setSearchQuery}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => {
                  // Implement edit functionality
                  toast.info('Edit functionality coming soon')
                }}
                onDelete={() => {
                  setSelectedProduct(product)
                  setIsDeleteModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No products found"
            description="Add your first product to get started"
            actionText="Add Product"
            onAction={() => setIsAddModalOpen(true)}
          />
        )}
      </Card>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedProduct(null)
        }}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message={`Are you sure you want to delete ${selectedProduct?.name}? This action cannot be undone.`}
      />
    </div>
  )
}

export default Inventory