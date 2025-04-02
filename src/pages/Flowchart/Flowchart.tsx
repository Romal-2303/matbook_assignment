import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddNodePopup from "./AddNodePopup/AddNodePopup";
import ConfigurationModal from "./ConfigurationModal/ConfigurationModal";
import classes from "./Flowchart.module.scss";
import { ReactComponent as StartCircle } from "../../assets/icons/start_circle.svg";
import { ReactComponent as EndCircle } from "../../assets/icons/end_circle.svg";
import { ReactComponent as AddCircle } from "../../assets/icons/add_circle.svg";
import { ReactComponent as AddCircleRed } from "../../assets/icons/add_circle_red.svg";
import { ReactComponent as ArrowWithTail } from "../../assets/icons/arrow_with_tail.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete_icon.svg";
import { ReactComponent as SaveIcon } from "../../assets/icons/save_icon.svg";
import { ReactComponent as UndoIcon } from "../../assets/icons/undo_icon.svg";
import { ReactComponent as RedoIcon } from "../../assets/icons/redo_icon.svg";
import { ReactComponent as EpicenterIcon } from "../../assets/icons/green_epicenter.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus_icon.svg";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus_icon.svg";

let tempNodesArr = [] as any;

const Flowchart = () => {
  const { mode } = useParams<{ mode: string }>();

  // States
  const [scale, setScale] = useState(1); // Zoom level
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Panning position
  const [isDragging, setIsDragging] = useState(false);
  const [nodesArr, setNodesArr] = useState(tempNodesArr);
  const [addCirclehoveredIndex, setAddCircleHoveredIndex] = useState<
    null | number
  >(null);
  const [editMode, setEditMode] = useState(mode === "edit" ? true : false);
  const [popupActiveIndex, setPopupActiveIndex] = useState<null | number>(null);
  const [configPopupIndex, setConfigPopupIndex] = useState<null | number>(null);
  const [configPopupType, setConfigPopupType] = useState<string>("");
  const [trackHistory, setTrackHistory] = useState<any[]>([]);
  const [undoHistory, setUndoHistory] = useState<any[]>([]);

  // Refs
  const lastMousePosition = useRef({ x: 0, y: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    setEditMode(mode === "edit" ? true : false);
  }, [mode]);

  // Handles Zooming In & Out
  const handleWheel = (event: any) => {
    event.preventDefault();
    const zoomSpeed = 0.03;

    setScale((prevScale) => {
      let newScale = prevScale + (event.deltaY > 0 ? -zoomSpeed : zoomSpeed);
      return Math.min(Math.max(newScale, 0.5), 3); // Limit zoom range
    });
  };

  // Handles Panning (Drag to Move)
  const handleMouseDown = (event: any) => {
    setIsDragging(true);
    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: any) => {
    if (!isDragging) return;
    const dx = event.clientX - lastMousePosition.current.x;
    const dy = event.clientY - lastMousePosition.current.y;

    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    lastMousePosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  const addClickHandler = (receivedIndex: number) => (event: any) => {
    event.stopPropagation();

    setPopupActiveIndex(receivedIndex);
  };

  const deleteIconClickHandler = (receivedIndex: number) => (event: any) => {
    event.stopPropagation();

    setTrackHistory((prevState) => [
      ...prevState,

      {
        action: "delete",
        value: nodesArr[receivedIndex],
        order: receivedIndex,
      },
    ]);

    setNodesArr((prevState: any) => {
      return prevState.filter(
        (el: any, index: number) => receivedIndex !== index
      );
    });
  };

  const goBackClickHandler = () => {
    navigate("/");
  };

  const mouseEnterHandler = (receivedIndex: number) => () => {
    setAddCircleHoveredIndex(receivedIndex);
  };

  const mouseLeaveHandler = (receivedIndex: number | null) => () => {
    setAddCircleHoveredIndex(receivedIndex);
  };

  const insertAtIndex = (arr: any, index: number, element: string) => [
    ...arr.slice(0, index),
    element,
    ...arr.slice(index),
  ];

  const removeAtIndex = (arr: any, index: number) => [
    ...arr.slice(0, index),
    ...arr.slice(index + 1),
  ];

  const elementSelected = (receivedIndex: number) => (receivedEle: string) => {
    setTrackHistory((prevState) => [
      ...prevState,
      {
        action: "add",
        value: receivedEle,
        order: receivedIndex,
      },
    ]);

    let newArr = insertAtIndex(nodesArr, receivedIndex, receivedEle);

    setNodesArr(newArr);
    setPopupActiveIndex(null);
  };

  const nodeClickHandler =
    (receivedIndex: number, type: string) => (event: any) => {
      event.stopPropagation();
      setConfigPopupIndex(receivedIndex);
      setConfigPopupType(type);
    };

  const flowChartCickHandler = () => {
    setPopupActiveIndex(null);
    setConfigPopupIndex(null);
  };

  const undoClickHandler = () => {
    let tempMode = trackHistory[trackHistory.length - 1]?.action;
    let tempValue = trackHistory[trackHistory.length - 1]?.value;
    let tempOrder = trackHistory[trackHistory.length - 1]?.order;

    if (!tempMode) return;

    setUndoHistory((prevState) => [
      ...prevState,
      {
        action: tempMode,
        value: tempValue,
        order: tempOrder,
      },
    ]);

    if (tempMode === "delete") {
      let newArr = insertAtIndex(nodesArr, tempOrder, tempValue);
      setNodesArr(newArr);
    } else {
      let newArr = removeAtIndex(nodesArr, tempOrder);

      setNodesArr(newArr);
    }

    setTrackHistory((prevState) =>
      prevState.filter(
        (el: any, index: number, arr) => index !== arr.length - 1
      )
    );
  };
  const redoClickHandler = () => {
    let tempMode = undoHistory[undoHistory.length - 1]?.action;
    let tempValue = undoHistory[undoHistory.length - 1]?.value;
    let tempOrder = undoHistory[undoHistory.length - 1]?.order;

    if (!tempMode) return;

    if (tempMode === "delete") {
      deleteIconClickHandler(tempOrder)({ stopPropagation: () => {} });
    } else {
      elementSelected(tempOrder)(tempValue);
    }

    setUndoHistory((prevState) =>
      prevState.filter(
        (el: any, index: number, arr) => index !== arr.length - 1
      )
    );
  };

  const increamentHandler = () => {
    setScale((prevState: any) => {
      if (prevState + 0.1 > 4) return 4;
      return prevState + 0.1;
    });
  };
  const decreamentHandler = () => {
    setScale((prevState: any) => {
      if (prevState - 0.1 < 1) return 1;

      return prevState - 0.1;
    });
  };

  return (
    <div className={classes["flow-chart-container"]}>
      <div className={classes["header"]}>
        <div className={classes["go-back-container"]}>
          <p className={classes["go-back-text"]} onClick={goBackClickHandler}>
            &lt;- Go Back
          </p>
          <p>Untitled</p>
          {editMode ? (
            <div className={classes["save-icon-container"]}>
              <SaveIcon />
            </div>
          ) : (
            <p className={classes["status-text"]}>Passed</p>
          )}
        </div>
      </div>

      <div
        className={classes["flow-chart-wrapper"]}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: "center",
        }}
        onClick={flowChartCickHandler}
      >
        <div className={classes["flow-chart-container"]}>
          <div className={classes["start-circle-container"]}>
            <StartCircle />
          </div>

          <div className={classes["node-connector"]}>
            <ArrowWithTail />
            {editMode && (
              <div
                className={classes["add-circle-container"]}
                onMouseEnter={mouseEnterHandler(0)}
                onMouseLeave={mouseLeaveHandler(null)}
                onClick={addClickHandler(0)}
              >
                {addCirclehoveredIndex === 0 ? <AddCircleRed /> : <AddCircle />}
              </div>
            )}

            {popupActiveIndex === 0 && (
              <AddNodePopup elementSelected={elementSelected(0)} />
            )}
          </div>

          {nodesArr.length > 0 &&
            nodesArr.map((el: any, index: number) => (
              <>
                <div
                  className={classes["node-container"]}
                  onClick={nodeClickHandler(index, el)}
                >
                  {el}
                  <div
                    className={classes["delete-icon-container"]}
                    onClick={deleteIconClickHandler(index)}
                  >
                    <DeleteIcon />
                  </div>
                </div>

                <div className={classes["node-connector"]}>
                  <ArrowWithTail />
                  {editMode && (
                    <div
                      className={classes["add-circle-container"]}
                      onClick={addClickHandler(index + 1)}
                      onMouseEnter={mouseEnterHandler(index + 1)}
                      onMouseLeave={mouseLeaveHandler(null)}
                    >
                      {addCirclehoveredIndex === index + 1 ? (
                        <AddCircleRed />
                      ) : (
                        <AddCircle />
                      )}
                    </div>
                  )}
                  {popupActiveIndex === index + 1 && (
                    <AddNodePopup
                      elementSelected={elementSelected(index + 1)}
                    />
                  )}
                </div>
              </>
            ))}

          <div className={classes["end-circle-container"]}>
            <EndCircle />
          </div>
        </div>
      </div>
      {configPopupIndex !== null && (
        <ConfigurationModal
          receivedType={configPopupType}
          setConfigPopupIndex={setConfigPopupIndex}
        />
      )}

      <div className={classes["undo-redo-btns-container"]}>
        <div className={classes["undo-btn"]} onClick={undoClickHandler}>
          <UndoIcon />
        </div>

        <div className={classes["redo-btn"]} onClick={redoClickHandler}>
          <RedoIcon />
        </div>
      </div>

      <div className={classes["zoom-scale-container"]}>
        <div className={classes["epicenter-container"]}>
          <EpicenterIcon />
        </div>
        <div className={classes["icons-range-container"]}>
          <div
            className={classes["plus-icon-container"]}
            onClick={decreamentHandler}
          >
            <MinusIcon />
          </div>
          <div className={classes["range-selector-container"]}>
            <input
              className={classes["slider"]}
              type="range"
              min="1"
              max="4"
              step={"0.1"}
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
            />
          </div>

          <div
            className={classes["plus-icon-container"]}
            onClick={increamentHandler}
          >
            <PlusIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flowchart;
