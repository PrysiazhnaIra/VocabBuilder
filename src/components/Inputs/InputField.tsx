import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import s from "./Inputs.module.css";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
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
    <div className={s.wrap}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        {...register}
        {...props}
        placeholder={name === "name" ? "Name" : "Email"}
        className={s.inputField}
      />
      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  );
}
