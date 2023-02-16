import React from "react";

import style from "./No-Bg-Input.module.scss";

export const NoBgInput = ({ ...props }) => {
   return <input className={ style.NoBgInput } { ...props }/>;
};
