type ButtonProps = {
  size: 'small' | 'medium' | 'large';
  large?: 'small' | 'large'
  color: 'primary' | 'secondary';
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

const Button = ({disabled=false,  size, children , color="primary", large="small",type="button", onClick}:ButtonProps) => {
  // Define los tamaños posibles
  const sizes = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-4 px-6 text-base',
    large: 'py-6 px-8 text-lg',
  };
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secpndary',
  };
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full ${colors[color]} ${disabled} text-white rounded-lg ${sizes[size]} tracking-widest font-inter font-bold`}
    >
      {children}
    </button>
  );
};

export default Button;
