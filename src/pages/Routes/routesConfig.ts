import Flowchart from "../Flowchart/Flowchart";
import Homepage from "../Homepage/Homepage";
import Login from "../Login/Login";

type typeRoutesConfig = {
  path?: string | undefined;
  component: React.ElementType;
};

export const routes: typeRoutesConfig[] = [
  {
    path: "/",
    component: Homepage,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/flowchart/:mode/:id",
    component: Flowchart,
  },
];
