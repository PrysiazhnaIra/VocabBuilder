import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../Inputs/InputField";
import PasswordInput from "../Inputs/PasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/authShemas";
import type { User } from "../../types/types";
import s from "./LoginForm.module.css";
import { useLoginMutation } from "../../redux/api/authApi";
import { toast } from "react-toastify";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: User) => {
    try {
      await loginUser(data).unwrap();
      toast.success("Login successful! Welcome back.");
      navigate("/dictionary");
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputWrapper}>
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
        <Button type="submit" className={s.btnActive} disabled={isLoading}>
          {isLoading ? "Logining..." : "Login"}
        </Button>
        <Link to="/register" className={s.toggleLink}>
          Register
        </Link>
      </div>
    </form>
  );
}
