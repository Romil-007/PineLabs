import { jsPDF } from 'jspdf'
import { formatCurrency, formatDate } from './formatters'

export const generateTransactionReceipt = (transaction) => {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(20)
  doc.text('Transaction Receipt', 105, 20, { align: 'center' })
  
  // Transaction details
  doc.setFontSize(12)
  doc.text(`Transaction ID: ${transaction.id}`, 20, 40)
  doc.text(`Date: ${formatDate(transaction.date)}`, 20, 50)
  doc.text(`Customer: ${transaction.customer}`, 20, 60)
  doc.text(`Amount: ${formatCurrency(transaction.amount)}`, 20, 70)
  doc.text(`Payment Method: ${transaction.paymentMethod}`, 20, 80)
  doc.text(`POS Machine ID: ${transaction.machineId}`, 20, 90)
  
  // Save the PDF
  doc.save(`transaction-${transaction.id}.pdf`)
}

export const generateInvoice = (invoice) => {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(20)
  doc.text('Invoice', 105, 20, { align: 'center' })
  
  // Invoice details
  doc.setFontSize(12)
  doc.text(`Invoice ID: ${invoice.id}`, 20, 40)
  doc.text(`Date: ${formatDate(invoice.date)}`, 20, 50)
  doc.text(`Customer: ${invoice.customerName}`, 20, 60)
  
  // Items
  let y = 80
  doc.text('Items:', 20, y)
  y += 10
  
  invoice.items.forEach(item => {
    doc.text(`${item.product} x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`, 30, y)
    y += 10
  })
  
  // Total
  doc.text(`Total Amount: ${formatCurrency(invoice.total)}`, 20, y + 10)
  doc.text(`Status: ${invoice.status}`, 20, y + 20)
  
  // Save the PDF
  doc.save(`invoice-${invoice.id}.pdf`)
}

export const generateInventoryReport = (products) => {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(20)
  doc.text('Inventory Report', 105, 20, { align: 'center' })
  
  // Products
  let y = 40
  products.forEach(product => {
    doc.setFontSize(12)
    doc.text(`${product.name} (${product.sku})`, 20, y)
    doc.text(`Stock: ${product.stock}`, 120, y)
    doc.text(`Price: ${formatCurrency(product.price)}`, 160, y)
    y += 10
  })
  
  // Save the PDF
  doc.save('inventory-report.pdf')
}