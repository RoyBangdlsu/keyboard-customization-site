function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-300 ${className}`}>
      {children}
    </button>
  );
}

export default Button;