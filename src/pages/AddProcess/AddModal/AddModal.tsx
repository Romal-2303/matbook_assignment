import classes from "./AddModal.module.scss";
import { ReactComponent as CrossIcon } from "../../../assets/icons/cross_icon.svg";
import { useState } from "react";

interface AddModalProps {
  saveClickHandler: any;
  setModalVisibility: any;
}

const AddModal = ({ saveClickHandler, setModalVisibility }: AddModalProps) => {
  const [nameValue, setNameValue] = useState("");
  const [descValue, setDescValue] = useState("");

  const crossClickHandler = () => {
    setModalVisibility(false);
  };

  return (
    <div className={classes["modal-wrapper"]}>
      <div className={classes["modal-overlay"]}></div>
      <div className={classes["modal-container"]}>
        <div className={classes["content"]}>
          <h2>Save your workflow</h2>
          <div className={classes["name-input-container"]}>
            <label>Name</label>
            <input
              placeholder="Name here"
              value={nameValue}
              onChange={(e: any) => setNameValue(e.target.value)}
            ></input>
          </div>
          <div className={classes["desc-input-container"]}>
            <label>Description</label>
            <textarea
              placeholder="Write here.."
              value={descValue}
              onChange={(e: any) => setDescValue(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className={classes["footer"]}>
          <button
            className={classes["modal-btn"]}
            onClick={saveClickHandler(nameValue, descValue)}
          >
            Save
          </button>
        </div>

        <div className={classes["close-icon"]} onClick={crossClickHandler}>
          <CrossIcon />
        </div>
      </div>
    </div>
  );
};

export default AddModal;
