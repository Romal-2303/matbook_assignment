import Login from "../Login/Login";

type typeRoutesConfig = {
  path?: string | undefined;
  component: React.ElementType;
};

export const routes: typeRoutesConfig[] = [
  // {
  //   path: "/",
  //   component: HomePage,
  // },
  // {
  //   path: "/checkout",
  //   component: Checkout,
  // },
  {
    path: "/login",
    component: Login,
  },
  // {
  //   path: "/signup",
  //   component: LoginSignup,
  // },
];

// export const protectedRoutes: typeRoutesConfig[] = [
//   {
//     path: "/checkout",
//     component: Checkout,
//   },
// ];
