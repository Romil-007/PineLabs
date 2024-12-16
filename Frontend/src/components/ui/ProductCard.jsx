import { formatCurrency } from '../../utils/formatters'

function ProductCard({ product, onEdit, onDelete }) {
  const getStockStatus = () => {
    if (product.stock <= 0) return 'Out of Stock'
    if (product.stock <= 10) return 'Low Stock'
    return 'In Stock'
  }

  const getStockStatusColor = () => {
    if (product.stock <= 0) return 'bg-red-100 text-red-800'
    if (product.stock <= 10) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor()}`}>
          {getStockStatus()}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-medium">{formatCurrency(product.price)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Stock:</span>
          <span className="font-medium">{product.stock} units</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Category:</span>
          <span className="font-medium capitalize">{product.category}</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="px-3 py-1 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductCard