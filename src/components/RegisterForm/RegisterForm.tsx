import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import PasswordInput from "../PasswordInput/PasswordInput";
import { useForm } from "react-hook-form";
import type { User } from "../../types/types";
import { registerSchema } from "../../validation/authShemas";
import { yupResolver } from "@hookform/resolvers/yup";

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
      <InputField
        label="Name"
        name="name"
        register={register("name")}
        error={
          typeof errors.email?.message === "string"
            ? errors.email.message
            : undefined
        }
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        register={register("email")}
        error={
          typeof errors.email?.message === "string"
            ? errors.email.message
            : undefined
        }
      />
      <PasswordInput
        label="Password"
        name="password"
        register={register("password")}
        error={errors.password?.message}
      />
      <Button type="submit">Register</Button>
      <Button type="button">
        <Link to="/login">Login</Link>
      </Button>
    </form>
  );
}
