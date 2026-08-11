import { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const variants = {
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    iconColor: 'text-emerald-500',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    iconColor: 'text-red-500',
  },
};

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const { icon: Icon, bg, border, text, iconColor } = variants[type];

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center gap-2 rounded-lg border ${border} ${bg} px-4 py-3 shadow-md animate-in fade-in slide-in-from-top-2`}
    >
      <Icon size={18} className={iconColor} />
      <p className={`text-sm font-medium ${text}`}>{message}</p>
      <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">
        <X size={14} />
      </button>
    </div>
  );
}