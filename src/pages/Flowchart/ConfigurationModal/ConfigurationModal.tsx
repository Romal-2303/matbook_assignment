import React, { useState } from "react";
import classes from "./ConfigurationModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setApiFormData } from "../../../redux/slices/apiFormData/apiFormData.slice";
import { RootState } from "../../../redux/store";
import { selectApiFormData } from "../../../redux/slices/apiFormData/apiFormData.selector";

interface ConfigProps {
  receivedType: string;
  setConfigPopupIndex: any;
}

const ConfigurationModal = ({
  receivedType,
  setConfigPopupIndex,
}: ConfigProps) => {
  const dispatch = useDispatch();

  const apiFormData = useSelector((state: RootState) =>
    selectApiFormData(state)
  );

  const overlayScreenClickHandler = () => {
    setConfigPopupIndex(null);
  };

  const inputChangeHandler = (keyName: string) => (event: any) => {
    dispatch(setApiFormData({ ...apiFormData, [keyName]: event.target.value }));
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
              <input
                placeholder="Type here..."
                value={apiFormData.method}
                onChange={inputChangeHandler("method")}
              />
            </div>
            <div className={classes["url-input-container"]}>
              <label>URL</label>
              <input
                placeholder="Type here..."
                value={apiFormData.url}
                onChange={inputChangeHandler("url")}
              />
            </div>
            <div className={classes["headers-input-container"]}>
              <label>Headers</label>
              <input
                placeholder="Header Name"
                value={apiFormData.header}
                onChange={inputChangeHandler("header")}
              />
            </div>
            <div className={classes["body-input-container"]}>
              <label>Body</label>
              <textarea
                placeholder="Enter Descriptions..."
                value={apiFormData.body}
                onChange={inputChangeHandler("body")}
              />
            </div>
          </React.Fragment>
        ) : (
          <div className={classes["email-input-container"]}>
            <label>{receivedType}</label>
            <input
              placeholder="Type here..."
              value={apiFormData.email}
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
