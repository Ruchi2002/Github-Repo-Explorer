export default function Shimmer({ className, style }) {
  return (
    <div
      className={className}
      style={{
        background: "linear-gradient(90deg, #F0F0F0 25%, #E0E0E0 50%, #F0F0F0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: 6,
        ...style,
      }}
    />
  );
}
