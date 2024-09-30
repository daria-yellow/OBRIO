import { ComponentProps } from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'default' | 'white';

interface Props extends ComponentProps<'button'> {
  text: string;
  variant?: ButtonVariant;
}

const Button: React.FC<Props> = ({
  text,
  variant = 'default',
  ...props
}: Props) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      <p>{text}</p>
    </button>
  );
};

export default Button;
