import { X } from "lucide-react";

interface AlertProps {
  variant?: "success" | "danger" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

export default function Alert({
  variant = "info",
  message,
  onClose,
}: AlertProps) {
  const variants = {
    success: "bg-green-100 text-green-800 border-green-400",
    danger: "bg-red-100 text-red-800 border-red-400",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
    info: "bg-blue-100 text-blue-800 border-blue-400",
  };

  return (
    <div className={`p-4 rounded-lg border ${variants[variant]} relative`}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-current hover:opacity-70"
        >
          <X size={16} />
        </button>
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
