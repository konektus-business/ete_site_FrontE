// src/components/common/Button.jsx
const variantClasses = {
  primary: 'bg-crmPrimary text-white hover:brightness-95',
  secondary: 'text-gray-600 border border-gray-200 hover:bg-gray-50 bg-white',
  danger: 'text-red-600 border border-red-200 hover:bg-red-50 bg-white',
  warning: 'text-amber-600 border border-amber-200 hover:bg-amber-50 bg-white',
  // Nouveau : variant plein rouge, pour les actions destructives à confirmer
  // (ex: bouton "Supprimer" dans ConfirmDeleteModal) — pas de conflit de
  // classes puisqu'on ne surcharge plus "danger" via className ailleurs
  dangerSolid: 'bg-red-600 text-white hover:bg-red-700',
};

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button
      className={`h-[38px] px-4 rounded-lg text-sm font-medium transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}