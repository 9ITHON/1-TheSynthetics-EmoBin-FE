declare module "*.svg" {
  import * as React from "react";
  import { SvgProps } from "react-native-svg";
  const content: (props: SvgProps) => JSX.Element;
  export default content;
}
