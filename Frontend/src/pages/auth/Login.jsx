import { useState } from 'react'
import LoginForm from '../../components/auth/LoginForm'
import OtpLoginForm from '../../components/auth/OtpLoginForm'
import AuthBackground from '../../components/auth/AuthBackground'
import AuthCard from '../../components/auth/AuthCard'

function Login() {
  const [showOtpLogin, setShowOtpLogin] = useState(false)

  return (
    <div className="min-h-screen flex relative">
      <AuthBackground />
      
      <div className="relative w-full flex">
        {/* Left Panel - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md text-white text-center">
            <div className="mb-8">
              <svg className="w-32 h-32 mx-auto text-white/90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
              Welcome Back!
            </h1>
            <p className="text-lg text-primary-200">
              Manage your business efficiently with our comprehensive POS solution.
            </p>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <AuthCard>
            {showOtpLogin ? (
              <OtpLoginForm onBack={() => setShowOtpLogin(false)} />
            ) : (
              <LoginForm onOtpLogin={() => setShowOtpLogin(true)} />
            )}
          </AuthCard>
        </div>
      </div>
    </div>
  )
}

export default Login