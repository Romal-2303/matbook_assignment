import React from "react";
import classes from "./ConfigurationModal.module.scss";

interface ConfigProps {
  receivedType: string;
  setConfigPopupIndex: any;
}

const ConfigurationModal = ({
  receivedType,
  setConfigPopupIndex,
}: ConfigProps) => {
  const overlayScreenClickHandler = () => {
    setConfigPopupIndex(null);
  };

  return (
    <div className={classes["config-modal-wrapper"]}>
      <div
        className={classes["modal-overlay"]}
        onClick={overlayScreenClickHandler}
      ></div>
      <div
        className={classes["config-modal-container"]}
        style={{ height: receivedType === "Api Call" ? "359px" : "124px" }}
      >
        <div className={classes["config-tag"]}>Configuration</div>
        {receivedType === "Api Call" ? (
          <React.Fragment>
            <div className={classes["method-input-container"]}>
              <label>Method</label>
              <input placeholder="Type here..." />
            </div>
            <div className={classes["url-input-container"]}>
              <label>URL</label>
              <input placeholder="Type here..." />
            </div>
            <div className={classes["headers-input-container"]}>
              <label>Headers</label>
              <input placeholder="Header Name" />
            </div>
            <div className={classes["body-input-container"]}>
              <label>Body</label>
              <textarea placeholder="Enter Descriptions..." />
            </div>
          </React.Fragment>
        ) : (
          <div className={classes["email-input-container"]}>
            <label>{receivedType}</label>
            <input placeholder="Type here..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationModal;
