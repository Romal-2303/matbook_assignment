import { ReactNode } from "react";
import classes from "./Modal.module.scss";
import { ReactComponent as CrossIcon } from "../../assets/icons/cross_icon.svg";

interface ModalProps {
  content?: ReactNode;
  onYesClick?: any;
  onNoClick?: any;
  onCrossClick?: any;
}

const Modal = ({
  content,
  onYesClick,
  onNoClick,
  onCrossClick,
}: ModalProps) => {
  const yesClickHandler = () => {
    onYesClick?.();
  };

  const noClickHandler = () => {
    onNoClick?.();
  };

  const crossClickHandler = () => {
    onCrossClick?.();
  };

  return (
    <div className={classes["modal-wrapper"]}>
      <div className={classes["modal-overlay"]}></div>
      <div className={classes["modal-container"]}>
        <div className={classes["content"]}>{content}</div>
        <div className={classes["footer"]}>
          <button className={classes["modal-btn"]} onClick={yesClickHandler}>
            Yes
          </button>
          <button className={classes["modal-btn"]} onClick={noClickHandler}>
            No
          </button>
        </div>

        <div className={classes["close-icon"]} onClick={crossClickHandler}>
          <CrossIcon />
        </div>
      </div>
    </div>
  );
};

export default Modal;
