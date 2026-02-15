import { COLORS } from '../../utils/constants';

export default function Bouton({ children, onClick, variant = 'primary', fullWidth = false, disabled = false, className = '' }) {
  const base = 'flex items-center justify-center font-semibold transition-all duration-200';
  const styles = {
    primary: `bg-[${COLORS.textPrimary}] text-white hover:opacity-90`,
    outline: `bg-white border border-[${COLORS.border}] text-[${COLORS.textPrimary}] hover:bg-gray-50`,
    danger: `bg-[${COLORS.danger}] text-white hover:opacity-90`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant] || styles.primary} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} rounded-xl h-12 px-6 text-base ${className}`}
      style={{ boxShadow: 'var(--shadow-button)' }}
    >
      {children}
    </button>
  );
}
