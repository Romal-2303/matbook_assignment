import classes from "./Login.module.scss";
import styles from "../../designSystem/_classes.module.scss";
import CompanyLogo from "../../assets/icons/company_logo.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google.svg";
import { ReactComponent as AppleIcon } from "../../assets/icons/apple.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import { ReactComponent as Checkbox } from "../../assets/icons/checkbox.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import cryptoRandomString from "crypto-random-string";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  const navigate = useNavigate();
  const [tickmarkVisibility, setTickmarVisibility] = useState(false);
  const [emailValue, setEmailvalue] = useState("");
  const [passwordValue, setPasswordvalue] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const loginClickHandler = async () => {
    setBtnDisabled(true);
    const token = cryptoRandomString({ length: 32 });
    const response = await fetch(
      "https://67ed62a74387d9117bbd700c.mockapi.io/workflow/users"
    );
    const users = await response.json();

    const receviedUser = users.find(
      (el: any) => el.email === emailValue && el.password === passwordValue
    );

    if (receviedUser) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("loginCounter", "0");
      navigate("/");
    } else {
      let counter = parseInt(localStorage.getItem("loginCounter") ?? "0");

      localStorage.setItem("loginCounter", `${counter + 1}`);

      if (counter === 1) {
        setBtnDisabled(false);
        alert(
          "Having issues while logging in?\n\n" +
            "Here are the credentials\n\n" +
            "Email: admin@gmail.com\n" +
            "Password: admin12345"
        );
        localStorage.setItem("loginCounter", "0");
      }

      setBtnDisabled(false);
      toast.error("Invalid email or password. Create a new account maybe ?");
    }
  };

  const tickMarkClickHandler = () => {
    setTickmarVisibility((prevState) => !prevState);
  };

  const signUpClickHandler = () => {
    navigate("/signup");
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
              <input
                placeholder="Type here..."
                value={emailValue}
                onChange={(e) => setEmailvalue(e.target.value)}
              />
            </div>
            <div className={classes["password-input-container"]}>
              <p>Password</p>
              <input
                placeholder="Type here..."
                value={passwordValue}
                onChange={(e) => setPasswordvalue(e.target.value)}
              />
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
              className={
                btnDisabled
                  ? `${classes["login-btn"]} ${classes["disabled-btn"]}`
                  : `${classes["login-btn"]}`
              }
              onClick={loginClickHandler}
            >
              Log In
              {btnDisabled && (
                <div className={classes["spinner-wrapper"]}>
                  <LoadingSpinner
                    width={16}
                    height={16}
                    color="white"
                    weight={2}
                  />
                </div>
              )}
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
                New User? <span onClick={signUpClickHandler}>SIGN UP HERE</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
