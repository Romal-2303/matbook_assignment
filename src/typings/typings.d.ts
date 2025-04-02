declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "redux-persist/lib/storage";
declare module "redux-persist/es/persistStore";
declare module "redux-persist/es/persistReducer";
declare module "redux-logger";

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}
