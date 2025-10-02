import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import Icon from "../Icon/Icon";
import s from "./Inputs.module.css";

interface PasswordInputProps {
  label?: string;
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
    <div>
      <label htmlFor={name}>{label}</label>
      <div className={s.inputWrapper}>
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          {...register}
          placeholder="Password"
          className={s.inputField}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className={s.eyeIconWrap}
        >
          <Icon
            name={showPassword ? "icon-eye-off" : "icon-eye"}
            className={s.eyeIcon}
          />
        </button>
      </div>
      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  );
}
