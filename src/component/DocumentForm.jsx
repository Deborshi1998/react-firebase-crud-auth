import React, { useState } from "react";
import "./FormStyles.css";
function DocumentForm({ crudOps }) {
  const [handleCreate, handleRead, handleUpdate, handleDelete] = crudOps;
  const defaultState = {
    "Document Name": "",
    Name: "",
    "Alter Ego": "",
    Quote: "",
    Type: "",
    "User Id": "",
  };
  const [formState, setFormState] = useState(defaultState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="form_component_parent">
      <h1>Document Form</h1>
      <form action="">
        {Object.keys(formState).map((key) => {
          return (
            key !== "User Id" && (
              <div className="form_label" key={key}>
                <label htmlFor={key}>{key}</label>
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={formState[key]}
                  onChange={handleChange}
                />
              </div>
            )
          );
        })}
        <div>
          <button onClick={(e) => handleCreate(e, formState)}>CREATE</button>
        </div>
        <div>
          <button onClick={(e) => handleRead(e, formState, setFormState)}>
            READ
          </button>
        </div>
        <div onClick={(e) => handleUpdate(e, formState)}>
          <button>UPDATE</button>
        </div>
        <div>
          <button onClick={(e) => handleDelete(e, formState)}>DELETE</button>
        </div>
      </form>
    </div>
  );
}

export default DocumentForm;
