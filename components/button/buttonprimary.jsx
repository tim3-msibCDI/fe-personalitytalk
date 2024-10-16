export default function ButtonPrimary({ children, onClick, className, type = "button", disabled = false }) {

  return (
    <>
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary py-2 px-8 rounded-lg text-whitebg ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
    </>
  )
}
