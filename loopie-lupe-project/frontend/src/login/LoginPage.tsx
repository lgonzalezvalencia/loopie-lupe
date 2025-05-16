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

interface LoginPageProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const LoginForm = ({ setIsLoggedIn }: LoginPageProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
      console.log(setIsLoggedIn);
      setIsLoggedIn(true);
      console.log(setIsLoggedIn);
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
          Log In
        </button>
      </form>
    </>
  );
};

function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  return (
    <>
      <div className="login-container">
        <h1 className="login-container__title">MindFlow</h1>
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      </div>
    </>
  );
}

export default LoginPage;
