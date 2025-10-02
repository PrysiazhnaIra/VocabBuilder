import * as yup from "yup";

const emailPattern = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;
const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{7,}$/;

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
