import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import POSManagement from './pages/POSManagement'
import Transactions from './pages/Transactions'
import Invoices from './pages/Invoices'
import Inventory from './pages/Inventory'
import Customers from './pages/Customers'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Support from './pages/Support'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'z-[9999]'
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="pos" element={<POSManagement />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App