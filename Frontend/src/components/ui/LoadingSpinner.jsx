function LoadingSpinner({ size = 'md' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex justify-center">
      <div className={`${sizes[size]} animate-spin rounded-full border-4 border-primary-200 border-t-primary-600`} />
    </div>
  )
}

export default LoadingSpinner