import * as yup from "yup";

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(emailPattern, "Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      passwordPattern,
      "Password must be at least 7 characters with 6 letters and 1 digit"
    )
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailPattern, "Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      passwordPattern,
      "Password must be at least 7 characters with 6 letters and 1 digit"
    )
    .required("Password is required"),
});
