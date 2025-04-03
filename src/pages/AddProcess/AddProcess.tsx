import classes from "./AddProcess.module.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectFlowchartNodes } from "../../redux/slices/flowchartData/flowchartData.selector";
import FlowChart from "../../components/FlowChart/FlowChart";
import AddModal from "./AddModal/AddModal";
import { v4 as uuidv4 } from "uuid";
import { addFlowchartNode } from "../../redux/slices/flowchartData/flowchartData.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { selectApiFormData } from "../../redux/slices/apiFormData/apiFormData.selector";

const AddProcess = () => {
  const dispatch = useDispatch<AppDispatch>();
  const apiFormData = useSelector((state: RootState) =>
    selectApiFormData(state)
  );

  const navigate = useNavigate();

  const [nodesArr, setNodesArr] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);

  const generateShortUUID = () => {
    return Buffer.from(uuidv4().replace(/-/g, ""), "hex")
      .toString("base64")
      .replace(/\//g, "_") // Replace '/' for URL safety
      .replace(/\+/g, "-") // Replace '+' for URL safety
      .substring(0, 6); // Keep it short
  };

  const saveClickHandler =
    (receivedName: string, receivedDesc: string) => () => {
      let postPayload = {
        name: receivedName,
        workflowId: generateShortUUID(),
        lastEditedOn: new Date().toISOString().slice(0, 10),
        description: receivedDesc,
        pinned: false,
        status: "passed",
        connections: nodesArr,
        tasks: [
          // { date: "28/05 - 22:43 IST", status: "Passed" },
          // { date: "28/05 - 22:43 IST", status: "Failed" },
          // { date: "28/05 - 22:43 IST", status: "Failed" },
        ],
        apiDetail: apiFormData,
      };
      setModalVisibility(false);
      setLoading(true);

      dispatch(addFlowchartNode(postPayload))
        .then((data) => {
          toast.success("Process Created Successfully!");
        })
        .finally(() => {
          setLoading(false);
          navigate("/");
        });
    };

  return (
    <>
      <FlowChart
        mode="add"
        loading={loading}
        nodesArr={nodesArr}
        setNodesArr={setNodesArr}
        saveClickHandler={() => setModalVisibility(true)}
      />
      {modalVisibility && (
        <AddModal
          saveClickHandler={saveClickHandler}
          setModalVisibility={setModalVisibility}
        />
      )}
    </>
  );
};

export default AddProcess;
