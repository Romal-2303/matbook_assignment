import classes from "./Login.module.scss";
import styles from "../../designSystem/_classes.module.scss";
import CompanyLogo from "../../assets/icons/company_logo.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google.svg";
import { ReactComponent as AppleIcon } from "../../assets/icons/apple.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import { ReactComponent as Checkbox } from "../../assets/icons/checkbox.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const navigate = useNavigate();
  const [tickmarkVisibility, setTickmarVisibility] = useState(false);

  const loginClickHandler = () => {
    navigate("/");
  };

  const tickMarkClickHandler = () => {
    setTickmarVisibility((prevState) => !prevState);
  };

  return (
    <div
      className={`${classes["login-page-container"]} ${styles["hide-scrollbar"]}`}
    >
      <div className={classes["shadow-layer"]}></div>
      <div className={classes["company-info-wrapper"]}>
        <div className={classes["company-info-child-container"]}>
          <div className={classes["logo-container"]}>
            <img src={CompanyLogo} />
          </div>
          <div className={classes["company-container"]}>
            <h2>Building the Future...</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
      <div className={classes["login-modal-container"]}>
        <div className={classes["login-modal"]}>
          <p className={classes["welcome-text"]}>WELCOME BACK!</p>
          <h2 className={classes["login-text"]}>Log In to your Account</h2>
          <div className={classes["login-form-container"]}>
            <div className={classes["email-input-container"]}>
              <p className={classes["input-text"]}>Email</p>
              <input placeholder="Type here..." />
            </div>
            <div className={classes["password-input-container"]}>
              <p>Password</p>
              <input placeholder="Type here..." />
            </div>
            <div className={classes["form-utility-btns"]}>
              <div className={classes["remember-checkbox"]}>
                <div
                  className={classes["tickmark-wrapper"]}
                  onClick={tickMarkClickHandler}
                >
                  {!tickmarkVisibility ? (
                    <div className={classes["tickmark-container"]}></div>
                  ) : (
                    <Checkbox />
                  )}
                </div>
                <label htmlFor="rememberme">Remember me</label>
              </div>
              <p>Forgot Password?</p>
            </div>
            <button
              className={classes["login-btn"]}
              onClick={loginClickHandler}
            >
              Log In
            </button>
            <div className={classes["or-separator"]}>
              <p>Or</p>
            </div>
            <div className={classes["login-with-other-options"]}>
              <div className={classes["google-btn"]}>
                <div className={classes["btn-text"]}>
                  <div className={classes["icon-container"]}>
                    <GoogleIcon />
                  </div>
                  Log In With Google
                </div>
              </div>
              <div className={classes["facebook-btn"]}>
                <div className={classes["btn-text"]}>
                  <div className={classes["icon-container"]}>
                    <FacebookIcon />
                  </div>
                  Log In With Facebook
                </div>
              </div>
              <div className={classes["apple-btn"]}>
                <div className={classes["btn-text"]}>
                  <div className={classes["icon-container"]}>
                    <AppleIcon />
                  </div>
                  <p>Log In With Apple</p>
                </div>
              </div>
            </div>
            <div className={classes["new-user-text"]}>
              <p>
                New User? <span>SIGN UP HERE</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
