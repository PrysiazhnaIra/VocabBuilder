import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import Icon from "../Icon/Icon";

interface PasswordInputProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function PasswordInput({
  label,
  name,
  register,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="input-group password-field">
      <label htmlFor={name}>{label}</label>
      <div className="input-wrapper">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          {...register}
          placeholder="Password"
        />
        <button type="button" onClick={toggleVisibility}>
          <Icon name={showPassword ? "icon-eye-off" : "icon-eye"} />
        </button>
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
