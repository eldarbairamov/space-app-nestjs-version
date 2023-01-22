import React, { type FC, useEffect } from "react";

import toast from "react-hot-toast";

interface ErrorModalProps {
   error: {
      message: string
   };
}

export const ValidationErrorToaster: FC<ErrorModalProps> = ({ error }) => {
   useEffect(() => {
      error.message && toast.error(error.message, {});
   }, [ error ]);

   return (<></>);
};
