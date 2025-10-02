import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../Inputs/InputField";
import PasswordInput from "../Inputs/PasswordInput";
import { useForm } from "react-hook-form";
import type { User } from "../../types/types";
import { registerSchema } from "../../validation/authShemas";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./RegisterForm.module.css";

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: User) => {
    console.log("My data:", data);

    try {
      console.log("Register success:", data);
      navigate("/dictionary");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputWrapper}>
        <InputField
          name="name"
          register={register("name")}
          error={errors.name?.message}
        />
        <InputField
          name="email"
          type="email"
          register={register("email")}
          error={errors.email?.message}
        />
        <PasswordInput
          name="password"
          register={register("password")}
          error={errors.password?.message}
        />
      </div>
      <div className={s.btnWrapper}>
        <Button type="submit" className={s.btnActive}>
          Register
        </Button>
        <Link to="/login" className={s.toggleLink}>
          Login
        </Link>
      </div>
    </form>
  );
}
