function AuthBackground() {
  return (
    <>
      {/* Main gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900" />
      
      {/* Animated patterns */}
      <div className="fixed inset-0 bg-grid-white/[0.05] animate-pulse-slow" />
      
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-primary-900/20 to-primary-900/40" />
      
      {/* Noise texture */}
      <div className="fixed inset-0 opacity-20" 
        style={{ 
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')",
          backgroundRepeat: 'repeat',
        }} 
      />
    </>
  )
}

export default AuthBackground