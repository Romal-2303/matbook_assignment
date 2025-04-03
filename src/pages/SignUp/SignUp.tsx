import classes from "./SignUp.module.scss";
import styles from "../../designSystem/_classes.module.scss";
import CompanyLogo from "../../assets/icons/company_logo.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google.svg";
import { ReactComponent as AppleIcon } from "../../assets/icons/apple.svg";
import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import { ReactComponent as Checkbox } from "../../assets/icons/checkbox.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

interface LoginProps {}

const SignUp = ({}: LoginProps) => {
  const navigate = useNavigate();
  const [tickmarkVisibility, setTickmarVisibility] = useState(false);
  const [emailValue, setEmailvalue] = useState("");
  const [passwordValue, setPasswordvalue] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const tickMarkClickHandler = () => {
    setTickmarVisibility((prevState) => !prevState);
  };

  const loginClickHandler = () => {
    navigate("/login");
  };

  const createAccountClickHandler = async () => {
    setBtnDisabled(true);

    fetch("https://67ed62a74387d9117bbd700c.mockapi.io/workflow/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailValue, password: passwordValue }),
    })
      .then((data) => {
        toast.success("Account Created Successfully!");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Error while creating accout. Please try again!");
      })
      .finally(() => {
        setBtnDisabled(false);
      });

    // const data = await response.json();
    // return data;
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
          <p className={classes["welcome-text"]}>Hey There!</p>
          <h2 className={classes["login-text"]}>Create a New Account</h2>
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
              onClick={createAccountClickHandler}
            >
              Create Account
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
                Already a User?{" "}
                <span onClick={loginClickHandler}>LOGIN HERE</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
