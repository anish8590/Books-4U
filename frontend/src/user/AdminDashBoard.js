import React from 'react';
import Base from "../core/Base";
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';


const AdminDashBoard = ()=>{

    //destructuring
    const { user: {name, email, role} } = isAuthenticated();

    const adminLeft = () =>{
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    Admin Navigation
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-info">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/category" className="nav-link text-info">Manage Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-info">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-info">Manage Products</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRight = () => {
        return (
          <div className="card mb-4">
            <h4 className="card-header">Admin</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <span className="badge badge-success mr-2" style={{color:"white"},{backgroundColor:"green"}}>Name:</span> {name}
              </li>
              <li className="list-group-item">
                <span className="badge mr-2" style={{color:"white"},{backgroundColor:"green"}} >Email:</span> {email}
              </li>
    
              <li className="list-group-item">
                <span className="badge badge-danger" style={{color:"white"},{backgroundColor:"Red"}}>Admin Area</span>
              </li>
            </ul>
          </div>
        );
      };

    return(
        <Base title="Welcome to Admin Area" description="Manage all of your products here"
            className="container bg-success p-4">
            <div className="row">
                <div className="col-xs-9 col-sm-6 col-md-5 col-lg-3">
                    {adminLeft()}
                </div>
                <div className="col-xs-3 col-sm-6 col-md-7 col-lg-9">
                    {adminRight()}
                </div>
            </div>
        </Base>
    );
};

export default AdminDashBoard;