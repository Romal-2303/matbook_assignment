import classes from "./TableComponent.module.scss";
import { ReactComponent as RedirectIcon } from "../../assets/icons/redirect_icon.svg";
import { ReactComponent as EpiCenterIcon } from "../../assets/icons/red_epicenter_icon.svg";
import styles from "../../designSystem/_classes.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

interface TableComponentProps {
  headers: any[];
  tableData: any[];
  nestedTableIndex?: number | null;
  nestedTableHeight?: any;
  setNestedTableHeight?: any;
}

const TableComponent = ({
  headers,
  tableData,
  nestedTableIndex,
  nestedTableHeight,
  setNestedTableHeight,
}: TableComponentProps) => {
  const navigate = useNavigate();

  const nestedTableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (nestedTableRef.current) {
      setNestedTableHeight(nestedTableRef.current.scrollHeight);
    }
  }, [nestedTableIndex, tableData]);

  const redirectClickHandler = (receivedId: number) => () => {
    navigate(`/flowchart/view/${receivedId}`);
  };

  return (
    <table className={classes["table-container"]}>
      <thead>
        <tr>
          {headers.map((headEl) => (
            <th style={{ width: `${headEl.width}` }}>{headEl.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((tableEl, tableIndex) => (
          <React.Fragment key={tableEl.id}>
            <tr>
              {headers.map((headEl, headIndex) => (
                <td key={headIndex}>{tableEl[headEl.key]}</td>
              ))}
            </tr>
            {nestedTableIndex === tableEl.id && (
              <td colSpan={headers.length}>
                <div
                  id="nested-table-container"
                  ref={nestedTableRef}
                  className={`${classes["nested-table-container"]} ${styles["hide-scrollbar"]}`}
                >
                  <div className={classes["info-wrapper"]}>
                    <div
                      className={classes["line-for-icons"]}
                      style={{ height: `${nestedTableHeight}px` }}
                    ></div>

                    {tableEl?.tasks?.map((el: any, index: number) => (
                      <div
                        key={index}
                        className={
                          index === 0
                            ? `${classes["info-container"]} ${classes["first-info-container"]}`
                            : classes["info-container"]
                        }
                      >
                        <div className={classes["redirect-container"]}>
                          <EpiCenterIcon />
                        </div>
                        <p>{el.date}</p>
                        <p
                          className={
                            el.status === "Passed"
                              ? classes["passed-tag"]
                              : classes["failed-tag"]
                          }
                        >
                          {el.status}
                        </p>
                        <div
                          className={classes["redirect-container"]}
                          onClick={redirectClickHandler(tableEl.id)}
                        >
                          <RedirectIcon />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
