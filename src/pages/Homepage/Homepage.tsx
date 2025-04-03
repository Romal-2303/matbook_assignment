import classes from "./Homepage.module.scss";
import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search_icon.svg";
import { ReactComponent as PinIcon } from "../../assets/icons/pin_icon.svg";
import { ReactComponent as PinFilledIcon } from "../../assets/icons/pin_filled_icon.svg";
import { ReactComponent as VerticalThreeIcons } from "../../assets/icons/three_vertical_dots.svg";
import { ReactComponent as DownArrowIcon } from "../../assets/icons/down_arrow.svg";
import { ReactComponent as SmallArrowIcon } from "../../assets/icons/small_arrow_icon.svg";
import TableComponent from "../../components/TableComponent/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  deleteFlowchartNode,
  fetchFlowchartNodes,
  updateFlowchartNode,
} from "../../redux/slices/flowchartData/flowchartData.slice";
import { selectFlowchartNodes } from "../../redux/slices/flowchartData/flowchartData.selector";
import {
  editBtnStyles,
  executeStyles,
  expandStyles,
  optionStyles,
  pinStyles,
} from "../../utilites/InlineStyles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";
import ExecuteModalContent from "./ExecuteModalContent/ExecuteModalContent";
import { useNavigate } from "react-router-dom";
import { selectApiFormData } from "../../redux/slices/apiFormData/apiFormData.selector";
import { getFormattedDate } from "../../utilites/helper";
import { setApiFormData } from "../../redux/slices/apiFormData/apiFormData.slice";
import emailjs from "@emailjs/browser";

const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const receivedData = useSelector(selectFlowchartNodes);
  const apiFormData = useSelector((state: RootState) =>
    selectApiFormData(state)
  );

  const [tableDataArr, setTableDataArr] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [executeModalVisibility, setExecuteModalVisibility] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [deletePopupIndex, setDeletePopupIndex] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [nestedTableIndex, setNestedTabledIndex] = useState<number | null>(
    null
  );
  const [nestedTableHeight, setNestedTableHeight] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  const arrayMaker = (receivedArr: any[] = []): any => {
    if (!Array.isArray(receivedArr)) return [];

    return [...receivedArr]
      .sort((a: any, b: any) => b.pinned - a.pinned)
      .map((el: any, index: number) => {
        return {
          id: el.id,
          name: el.name,
          workflowId: el.workflowId,
          lastEditedOn: el.lastEditedOn,
          description: el.description,
          tasks: el.tasks,
          connections: el.connections,
          execute: (
            <div
              style={executeStyles}
              className={classes["exec-btn"]}
              onClick={executeClickHandler(el.id)}
            >
              Execute
            </div>
          ),
          pinned: (
            <div style={pinStyles} onClick={pinClickHandler(el.id, el.pinned)}>
              {el.pinned ? <PinFilledIcon /> : <PinIcon />}
            </div>
          ),
          edit: (
            <div
              style={editBtnStyles}
              className={classes["edit-btn"]}
              onClick={editClickHandler(el.id)}
            >
              Edit
            </div>
          ),
          option: (
            <div
              className={classes["options-container"]}
              onClick={optionClickHandler(el.id)}
              style={optionStyles}
            >
              <VerticalThreeIcons />
              {deletePopupIndex === el.id && (
                <div
                  className={classes["delete-modal"]}
                  onClick={deleteClickHandler(el.id)}
                >
                  Delete
                </div>
              )}
            </div>
          ),
          expand: (
            <>
              <div
                className={
                  nestedTableIndex === el.id ? classes["arrow-up"] : classes[""]
                }
                style={expandStyles}
                onClick={expandClickHandler(nestedTableIndex ? null : el.id)}
              >
                <DownArrowIcon />
              </div>
            </>
          ),
        };
      });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchFlowchartNodes())
      .unwrap()
      .catch(() => {
        toast.error(
          <div>
            <strong>Error while fetching data</strong>
            <p>Refresh the page or please try again later !</p>
          </div>
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    let createdArr = arrayMaker(receivedData);
    setTableDataArr(createdArr);
  }, [receivedData, deletePopupIndex, nestedTableIndex]);

  const pinClickHandler = (receivedId: number, pinnedStatus: boolean) => () => {
    const patchedPayload = {
      id: receivedId,
      payload: { pinned: !pinnedStatus },
    };
    setLoading(true);

    dispatch(updateFlowchartNode(patchedPayload))
      .unwrap()
      .then(() => {
        toast.success("Changed made successfully!");
      })
      .catch((err) => {
        toast.error(
          <div>
            <strong>Error while updating data</strong>
            <p>Refresh the page or please try again later !</p>
          </div>
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const executeClickHandler = (receivedId: number) => () => {
    let foundEle = receivedData.find((el: any) => el.id === receivedId);
    dispatch(setApiFormData(foundEle.apiDetail));
    setTargetId(receivedId);
    setExecuteModalVisibility(true);
  };

  const triggerApi = () => {
    let { header, email, url, body, method } = apiFormData;

    if (method.toLowerCase() === "get") {
      return fetch(url, {
        method: "GET",
        headers: {
          ...JSON.parse(`{${header}}`),
        },
      });
    } else {
      return fetch(url, {
        method: "POST",
        headers: {
          ...JSON.parse(`{${header}}`),
        },
        body: body,
      });
    }
  };

  const executeProcessClickHandler = () => {
    setLoading(true);
    setExecuteModalVisibility(false);

    let foundEle = tableDataArr.find((el) => el.id === targetId);

    triggerApi()
      .then((data) => {
        const patchedPayload = {
          id: targetId,
          payload: {
            status: "Passed",
            tasks: [
              ...(foundEle.tasks ?? []),
              { date: getFormattedDate(), status: "Passed" },
            ],
          },
        };

        dispatch(updateFlowchartNode(patchedPayload))
          .unwrap()
          .then(() => {
            dispatch(setApiFormData(receivedData?.[0].apiDetail));

            toast.success("Process Execution Successful!");
          })
          .catch((err) => {
            toast.error(
              <div>
                <strong>Error while updating data</strong>
                <p>Refresh the page or please try again later !</p>
              </div>
            );
          })
          .finally(() => {
            setLoading(false);
            setExecuteModalVisibility(false);
          });

        return data.json();
      })
      .then((response) => {
        if (foundEle?.connections?.includes("Email"))
          emailjs
            .send(
              process.env.REACT_APP_EMAILJS_SERVICE_ID!,
              process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
              {
                to_email: apiFormData.email,
                response: JSON.stringify(response),
              },
              process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
            )
            .then(
              (result) => {
                toast.success("Email sent successfully!");
              },
              (error) => {
                toast.error("Failed to send email.");
              }
            );
      })
      .catch(() => {
        const patchedPayload = {
          id: targetId,
          payload: {
            status: "Failed",
            tasks: [
              ...(foundEle.tasks ?? []),
              { date: getFormattedDate(), status: "Failed" },
            ],
          },
        };
        toast.error("Process Execution Failed!");

        dispatch(updateFlowchartNode(patchedPayload))
          .unwrap()
          .then(() => {})
          .catch((err) => {
            toast.error(
              <div>
                <strong>Error while updating data</strong>
                <p>Refresh the page or please try again later !</p>
              </div>
            );
          })
          .finally(() => {
            setLoading(false);
          });
      });
  };

  const editClickHandler = (receivedId: number) => () => {
    navigate(`/flowchart/edit/${receivedId}`);
  };

  const optionClickHandler = (receivedIndex: number) => (event: any) => {
    event.stopPropagation();
    setDeletePopupIndex(receivedIndex);
  };

  const homepageClickHandler = () => {
    setDeletePopupIndex(null);
  };

  const deleteClickHandler = (receivedId: number) => () => {
    setLoading(true);
    dispatch(deleteFlowchartNode(receivedId))
      .unwrap()
      .then(() => {
        toast.success("Process deleted successfully!");
      })
      .catch((err) => {
        toast.error(
          <div>
            <strong>Error while deleting data</strong>
            <p>Refresh the page or please try again later !</p>
          </div>
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const expandClickHandler = (receivedIndex: number) => () => {
    if (
      receivedData?.find((el: any) => el.id === receivedIndex)?.tasks
        ?.length === 0
    ) {
      toast.info("No info to show!");
      return;
    }

    setNestedTabledIndex(receivedIndex);
    setNestedTableHeight(null);
  };

  const searchInputChangeHandler = (event: any) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchValue(searchQuery);

    if (!searchQuery.trim()) {
      setTableDataArr(arrayMaker(receivedData));
      return;
    }

    const filteredData = receivedData.filter(
      (item: any) =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.workflowId.toLowerCase().includes(searchQuery)
    );

    setTableDataArr(arrayMaker(filteredData));
  };

  const logoutClickHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.setItem("loginCounter", "0");
    navigate("/login");
  };

  const createNewClickHandler = () => {
    navigate("/flowchart/add");
  };

  return (
    <div
      className={classes["homepage-container"]}
      onClick={homepageClickHandler}
    >
      <div className={classes["header"]}>
        <div className={classes["icon-text-wrapper"]}>
          <div className={classes["icon-container"]}>
            <Hamburger />
          </div>
          <h1>Workflow Builder</h1>
        </div>
        <div className={classes["logout-btn"]} onClick={logoutClickHandler}>
          Log Out
        </div>
      </div>

      <div className={classes["homepage-content"]}>
        <div className={classes["utility-container"]}>
          <div className={classes["search-input-container"]}>
            <input
              placeholder="Search By Workflow Name/ID"
              value={searchValue}
              onChange={searchInputChangeHandler}
            ></input>
            <div className={classes["search-icon-wrapper"]}>
              <SearchIcon />
            </div>
          </div>
          <button
            className={classes["create-new-btn"]}
            onClick={createNewClickHandler}
          >
            + Create New Process
          </button>
        </div>

        <div className={classes["table-pagination-wrapper"]}>
          <div className={classes["table-wrapper"]}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <TableComponent
                headers={[
                  { key: "name", value: "Workflow Name", width: "22%" },
                  { key: "workflowId", value: "ID", width: "10%" },
                  {
                    key: "lastEditedOn",
                    value: "Last Edited On",
                    width: "23%",
                  },
                  { key: "description", value: "Description", width: "30%" },
                  { key: "pinned", value: "", width: "200px" },
                  { key: "execute", value: "", width: "3%" },
                  { key: "edit", value: "", width: "3%" },
                  { key: "option", value: "", width: "3%" },
                  { key: "expand", value: "", width: "3%" },
                ]}
                tableData={tableDataArr}
                nestedTableIndex={nestedTableIndex}
                nestedTableHeight={nestedTableHeight}
                setNestedTableHeight={setNestedTableHeight}
              />
            )}
          </div>
          <div className={classes["pagination-wrapper"]}>
            <div className={classes["pagination-container"]}>
              <div className={classes["left-arrow-container"]}>
                <SmallArrowIcon />
              </div>
              <div className={classes["numbers-container"]}>
                <div className={classes["numbers"]}>1</div>
                <div
                  className={`${classes["numbers"]} ${classes["number-selected"]}`}
                >
                  2
                </div>
                <div className={classes["numbers"]}>3</div>
                <div className={classes["numbers"]}>...</div>
                <div className={classes["numbers"]}>15</div>
              </div>
              <div className={classes["right-arrow-container"]}>
                <SmallArrowIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {executeModalVisibility && (
        <Modal
          onYesClick={executeProcessClickHandler}
          onNoClick={() => setExecuteModalVisibility(false)}
          onCrossClick={() => setExecuteModalVisibility(false)}
          content={<ExecuteModalContent />}
        />
      )}
    </div>
  );
};

export default Homepage;
