import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./redux";
import { ConfigProvider, ThemeConfig } from "antd";

import "./style/normalize.scss";
import "./style/baseline.scss";

const theme: ThemeConfig = {
   token: { colorPrimaryBg: "#e9e9ff", fontSize: 15, colorError: '#df8281', colorSuccess: '#90be8e', colorText: '#4e4e51' },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <Provider store={ store }>
      <ConfigProvider theme={ theme }>
         <App/>
      </ConfigProvider>
   </Provider>,
);
