import React, { useEffect } from "react";

import { MessageInstance } from "antd/es/message/interface";

interface ErrorModalProps {
   error: { message: string };
   messageApi: MessageInstance;
}

export function ValidationToaster({ error, messageApi }: ErrorModalProps) {
   useEffect(() => {
      error.message && messageApi.error(error.message);
   }, [ error ]);

   return (<></>);
}
