import React, { useState , useEffect} from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {  updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({match}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

    //destructure
    const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = event => {
    setError("");
    setName(event.target.value);   
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request
    updateCategory(match.params.categoryId, user._id, token, { name }).then(data => {
      //console.log(match.params.categoryId);
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update category</h4>;
    }
  };

    //Form
    const myCategoryForm = () => (
        <form>
          <div className="form-group">
            <p className="lead">Enter the new category Name</p>
            <input
              type="text"
              className="form-control my-3"
              onChange={handleChange}
              value={name}
              autoFocus
              required
              placeholder="Category name"
            />
            <button type="submit" onClick={onSubmit} className="btn btn-outline-info">
              Update Category
            </button>
          </div>
        </form>
    );

    return (
        <Base
          title="Update category here"
          description="Add a new category for new tshirts"
          className="container bg-info p-4"
        >
          <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
              {successMessage()}
              {warningMessage()}
              {myCategoryForm()}
              {goBack()}
            </div>
          </div>
        </Base>
    );
};

export default UpdateCategory;