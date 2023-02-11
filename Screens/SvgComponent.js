import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} {...props}>
      <Path
        // fill="#fff"
        // stroke="#ff6c00"
        stroke={props.colorBtn}
        d="M24.5 12.5c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12z"
      />
      <Path fill={props.colorBtn} d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6z" />
    </Svg>
  );
}
