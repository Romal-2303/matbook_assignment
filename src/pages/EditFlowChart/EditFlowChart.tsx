import FlowChart from "../../components/FlowChart/FlowChart";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectFlowchartNodes } from "../../redux/slices/flowchartData/flowchartData.selector";
import { useEffect, useState } from "react";
import {
  fetchFlowchartNodes,
  updateFlowchartNode,
} from "../../redux/slices/flowchartData/flowchartData.slice";
import { toast } from "react-toastify";
import { setApiFormData } from "../../redux/slices/apiFormData/apiFormData.slice";
import { selectApiFormData } from "../../redux/slices/apiFormData/apiFormData.selector";

const EditFlowChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const receivedData = useSelector(selectFlowchartNodes);
  const [nodesArr, setNodesArr] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const apiFormData = useSelector((state: RootState) =>
    selectApiFormData(state)
  );

  const navigate = useNavigate();

  const { mode, id } = useParams<{ mode: "edit" | "view"; id: string }>();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchFlowchartNodes(id))
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
    dispatch(setApiFormData(receivedData?.[0]?.apiDetail));
    setNodesArr(receivedData?.[0]?.connections ?? []);
  }, [receivedData]);

  const saveClickHandler = () => {
    const patchedPayload = {
      id: id,
      payload: { connections: nodesArr, apiDetail: apiFormData },
    };
    setLoading(true);

    dispatch(updateFlowchartNode(patchedPayload))
      .unwrap()
      .then((data) => {
        toast.success("Chart updated successfully!");
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
        navigate("/");
      });
  };

  return (
    <FlowChart
      mode={mode ?? "edit"}
      loading={loading}
      nodesArr={nodesArr}
      setNodesArr={setNodesArr}
      saveClickHandler={saveClickHandler}
    />
  );
};

export default EditFlowChart;
