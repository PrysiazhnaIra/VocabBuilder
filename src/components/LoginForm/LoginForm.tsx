import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import PasswordInput from "../PasswordInput/PasswordInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/authShemas";
import type { User } from "../../types/types";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: User) => {
    try {
      console.log("Login success:", data);
      navigate("/dictionary");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        name="email"
        type="email"
        register={register("password")}
        error={errors.password?.message}
      />
      <PasswordInput
        label="Password"
        name="password"
        register={register("password")}
        error={errors.password?.message}
      />
      <Button type="submit">Login</Button>
      <Button type="button">
        <Link to="/register">Register</Link>
      </Button>
    </form>
  );
}
