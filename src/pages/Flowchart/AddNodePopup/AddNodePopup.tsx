import classes from "./AddNodePopup.module.scss";

interface AddNewPopupProps {
  elementSelected?: any;
}

const AddNodePopup = ({ elementSelected }: AddNewPopupProps) => {
  const elementClickHandler = (receivedStr: string) => () => {
    elementSelected?.(receivedStr);
  };

  return (
    <div className={classes["pop-up-container"]}>
      <div
        className={classes["element"]}
        onClick={elementClickHandler("API Call")}
      >
        API Call
      </div>
      <div
        className={classes["element"]}
        onClick={elementClickHandler("Email")}
      >
        Email
      </div>
      <div
        className={classes["element"]}
        onClick={elementClickHandler("Text Box")}
      >
        Text Box
      </div>
    </div>
  );
};

export default AddNodePopup;
