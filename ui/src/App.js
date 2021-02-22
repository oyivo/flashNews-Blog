import React from "react";
import "../src/dist/css/main.css";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from ".//GlobalState";
import NavBar from "./components/navbar/navBar";
import Pages from "./components/mainPages/pages";
import "./App.css";

function App() {
  return (
    <>
      <DataProvider>
      <Router>
      <NavBar />
         <main className="container">
           <Pages />
         </main>
      </Router>
      </DataProvider>
    </>
  );
}

export default App;
