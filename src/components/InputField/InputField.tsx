import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function InputField({
  label,
  name,
  register,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} {...register} {...props} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
