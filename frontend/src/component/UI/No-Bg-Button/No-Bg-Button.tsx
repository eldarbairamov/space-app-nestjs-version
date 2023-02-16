import React, { FC } from "react";

import style from "./No-Bg-Button.module.scss";

interface IInvisibleButtonProps {
   text: string;
   hoverSubject: string;
   onClick: () => Promise<void>;
}

export const NoBgButton: FC<IInvisibleButtonProps> = ({ text, hoverSubject, ...props }) => {
   return (
      <button className={ style.NoBgButton } data-hover={ hoverSubject } { ...props } >
         { text }
      </button>
   );
};
