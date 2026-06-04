export default function Card({ children, className = "", style, ...props }) {
  return (
    <div
      className={`bg-white rounded-xl ${className}`}
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
