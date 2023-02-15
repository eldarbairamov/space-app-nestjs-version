import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./redux";
import { ConfigProvider, ThemeConfig } from "antd";
import { ToasterWithOptions } from "./component/UI/Toaster-With-Options/Toaster-With-Options";

import "./style/normalize.scss";
import "./style/baseline.scss";

const theme: ThemeConfig = {
   token: { colorPrimaryBg: "#e9e9ff", fontSize: 16, colorError: '#df8281', colorSuccess: '#90be8e' },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <Provider store={ store }>
      <ConfigProvider theme={ theme }>
         <App/>
         <ToasterWithOptions/>
      </ConfigProvider>
   </Provider>,
);
