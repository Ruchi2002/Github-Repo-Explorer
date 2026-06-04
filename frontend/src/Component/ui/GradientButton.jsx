export default function GradientButton({ onClick, disabled, type = "button", className = "", children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold cursor-pointer transition-transform active:scale-95 hover:scale-[1.02] border-none disabled:opacity-60 ${className}`}
      style={{
        background: "linear-gradient(135deg, #0969DA, #8250DF)",
        boxShadow: "0 2px 6px rgba(9,105,218,0.3)",
      }}
    >
      {children}
    </button>
  );
}
