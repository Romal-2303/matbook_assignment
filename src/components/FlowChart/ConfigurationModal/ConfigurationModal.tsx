import React from "react";
import classes from "./ConfigurationModal.module.scss";
import { useState } from "react";

interface ConfigProps {
  receivedType: string;
  setConfigPopupIndex: any;
}

const ConfigurationModal = ({
  receivedType,
  setConfigPopupIndex,
}: ConfigProps) => {
  const [inputObject, setInputObject] = useState({});

  const overlayScreenClickHandler = () => {
    setConfigPopupIndex(null);
  };

  const inputChangeHandler = (keyName: string) => (event: any) => {};

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
              <input
                placeholder="Type here..."
                onChange={inputChangeHandler("method")}
              />
            </div>
            <div className={classes["url-input-container"]}>
              <label>URL</label>
              <input
                placeholder="Type here..."
                onChange={inputChangeHandler("url")}
              />
            </div>
            <div className={classes["headers-input-container"]}>
              <label>Headers</label>
              <input
                placeholder="Header Name"
                onChange={inputChangeHandler("header")}
              />
            </div>
            <div className={classes["body-input-container"]}>
              <label>Body</label>
              <textarea
                placeholder="Enter Descriptions..."
                onChange={inputChangeHandler("body")}
              />
            </div>
          </React.Fragment>
        ) : (
          <div className={classes["email-input-container"]}>
            <label>{receivedType}</label>
            <input
              placeholder="Type here..."
              onChange={inputChangeHandler(
                receivedType === "Email" ? "email" : "textbox"
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationModal;
