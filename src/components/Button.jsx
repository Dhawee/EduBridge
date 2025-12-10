import { Link } from "react-router-dom";

export default function Button({ text, to, onClick, variant }) {
  const base =
    "px-6 py-3 rounded-xl font-semibold transition shadow-md";

  const variants = {
    outline:
      "border border-green-400 text-green-400 hover:bg-green-400 hover:text-black",
    primary:
      "bg-green-500 text-black hover:bg-green-600",
  };

  // IF `to` is passed → Use Link
  if (to) {
    return (
      <Link
        to={to}
        className={`${base} ${variants[variant] || variants.primary}`}
      >
        {text}
      </Link>
    );
  }

  // OTHERWISE → Use <button>
  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary}`}
    >
      {text}
    </button>
  );
}
