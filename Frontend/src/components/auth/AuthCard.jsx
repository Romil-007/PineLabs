function AuthCard({ children }) {
  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-8 animate-fadeIn relative z-10">
      {children}
    </div>
  )
}

export default AuthCard