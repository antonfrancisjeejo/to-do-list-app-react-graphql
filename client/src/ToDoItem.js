import React from "react";

const ToDoItem = (props) => {
  return (
    <div className="toDoItem">
      <p>{props.itemText}</p>
      <button onClick={props.deleteItem}>Delete</button>
    </div>
  );
};

export default ToDoItem;
