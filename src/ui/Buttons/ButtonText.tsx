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
    small: 'w-full min-h-[16px] py-2 px-4 text-[18px]',
    medium: 'w-full min-h-[20px] py-3 px-6 text-[20px]',
    large: 'w-full min-h-[24px] py-4 px-8 text-[22px]',
  };
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
  };
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${colors[color]} ${disabled} text-white rounded-[2px] ${sizes[size]} tracking-widest`}
    >
      {children}
    </button>
  );
};

export default Button;
