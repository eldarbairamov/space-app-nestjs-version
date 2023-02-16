import React, { FC, useEffect } from "react";

import { MessageInstance } from "antd/es/message/interface";

interface ErrorModalProps {
   error: { message: string };
   messageApi: MessageInstance;
}

export const ValidationToaster: FC<ErrorModalProps> = ({ error, messageApi }) => {
   useEffect(() => {
      error.message && messageApi.error(error.message);
   }, [ error ]);

   return (<></>);
};
