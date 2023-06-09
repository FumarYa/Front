import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Dataprovider } from "./context/Dataprovider";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-48ch3aumapdbc15b.us.auth0.com"
      clientId="qUQGQyMYO61So6yhm9WDV7Rjo2vABzFE"
      redirectUri={window.location.origin}
    >
      <Dataprovider>
        <App />
      </Dataprovider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
