import AddProcess from "../AddProcess/AddProcess";
import EditFlowChart from "../EditFlowChart/EditFlowChart";
import Flowchart from "../Flowchart/Flowchart";
import Homepage from "../Homepage/Homepage";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

type typeRoutesConfig = {
  path?: string | undefined;
  component: React.ElementType;
};

export const routes: typeRoutesConfig[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: SignUp,
  },
];

export const protectedRoutes: typeRoutesConfig[] = [
  {
    path: "/flowchart/add",
    component: AddProcess,
  },
  {
    path: "/flowchart/:mode/:id",
    component: EditFlowChart,
  },
  {
    path: "/",
    component: Homepage,
  },
];
