function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const baseClasses = 'btn'
  const variantClasses = `btn-${variant}`
  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`

  return (
    <button
      type={type}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button