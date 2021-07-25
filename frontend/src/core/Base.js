import React from "react";
import Menu from "./menu.js";

//function based component
const Base = ({
  //for reusability by injecting parameters
  title = "My Title",
  //over written  by child
  description = "My desription",
  className = "bg-dark text-white p-4",
  children
  //home file component is got by - children - as used Base tag there
}) => (
  <div>
    <Menu/>
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <br/><br/><br/><br/>
    
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">MERN</span> Bookstore
        </span>
      </div>
    </footer>
  </div>
);

export default Base;

  