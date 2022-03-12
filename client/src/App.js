import React, { Fragment } from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Footer from "./components/Footer";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
