import React from 'react';
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';


const UserDashBoard = ()=>{

     //destructuring
     const { user: {name, email, role} } = isAuthenticated();

     const userLeft = () =>{
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    Navigation
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/" className="nav-link text-info">Continue Shopping!</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/cart" className="nav-link text-info">Complete Purchase</Link>
                    </li>
    
                </ul>
            </div>
        );
    };

     const userRight = () => {
        return (
          <div className="card mb-4">
            <h4 className="card-header">User</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <span className="badge badge-success mr-2" style={{color:"white"},{backgroundColor:"green"}}>Name:</span> {name}
              </li>
              <li className="list-group-item">
                <span className="badge mr-2" style={{color:"white"},{backgroundColor:"green"}} >Email:</span> {email}
              </li>
    
              <li className="list-group-item">
                <span className="badge badge-danger" style={{color:"white"},{backgroundColor:"Red"}}>User Area</span>
              </li>
            </ul>
          </div>
        );
      };

     return(
        <Base title="Welcome to User Dashboard" description="View your profile here"
            className="container bg-success p-4">
            <div className="row">
                <div className="col-xs-9 col-sm-6 col-md-5 col-lg-3">
                    {userLeft()}
                </div>
                <div className="col-xs-3 col-sm-6 col-md-7 col-lg-9">
                    {userRight()}
                </div>
            </div>
        </Base>
    );
};

export default UserDashBoard;