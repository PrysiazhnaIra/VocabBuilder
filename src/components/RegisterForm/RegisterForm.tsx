import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import InputField from "../Inputs/InputField";
import PasswordInput from "../Inputs/PasswordInput";
import { useForm } from "react-hook-form";
import type { User } from "../../types/types";
import { registerSchema } from "../../validation/authShemas";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./RegisterForm.module.css";
import { useRegisterMutation } from "../../redux/api/authApi";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/errorParser";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: User) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful! Welcome aboard.");
      navigate("/dictionary");
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      console.error("Registration failed:", message);
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
        <Button type="submit" className={s.btnActive} disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
        <div className={s.toggleWrapper}>
          <span className={s.toggleText}>Already have an account?</span>
          <Link to="/login" className={s.toggleLink}>
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
