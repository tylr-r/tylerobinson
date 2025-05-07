import clsx from 'clsx';
import React from 'react';
import { logEvent } from '../services/firebase';

interface ToggleButtonProps {
  label: string;
  id?: string;
  href?: string;
  isDisabled?: boolean;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  label,
  id,
  href,
  isDisabled = false,
  isActive = false,
  onClick,
}) => {
  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) return;
    e.preventDefault();

    // Log button click event
    logEvent('ui_click', {
      element_type: 'button',
      element_id: id || label,
    });

    onClick?.(e);
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
