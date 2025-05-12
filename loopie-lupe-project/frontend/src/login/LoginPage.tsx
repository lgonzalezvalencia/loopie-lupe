import "./LoginPage.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="login-form">
        <div className="login-form__email-label">
          <label htmlFor="email">E-mail</label>
        </div>
        <div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="login-form__email-input"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="form-error__email">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="login-form__password-label">
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
            className="login-form__password-input"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="form-error__password">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="submit-login-button">
          Log-in
        </button>
      </form>
    </>
  );
};

function LoginPage() {
  return (
    <>
      <div className="login-container">
        <h1 className="login-container__title">Mindflow</h1>
        <LoginForm />
      </div>
    </>
  );
}

export default LoginPage;
