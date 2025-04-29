import React, { useState } from 'react';
import clsx from 'clsx';

interface HelixButtonProps {
  label: string;
  id?: string;
  href?: string;
  isDisabled?: boolean;
  onClick?: (isActive: boolean, e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ToggleButton: React.FC<HelixButtonProps> = ({
  label,
  id,
  href,
  isDisabled,
  onClick,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) return;

    e.preventDefault();
    setIsActive(!isActive);

    if (onClick) {
      onClick(!isActive, e);
    }
  };

  return (
    <a
      id={id}
      href={href}
      className={clsx('button', { active: isActive, disabled: isDisabled })}
      onClick={handleToggle}
      aria-disabled={isDisabled ? 'true' : 'false'}
    >
      <span>{label}</span>
    </a>
  );
};

export default ToggleButton;
