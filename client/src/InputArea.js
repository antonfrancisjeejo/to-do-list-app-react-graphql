import React, { useState } from "react";

const InputArea = (props) => {
  let [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const add = () => {
    props.addItems(inputText);
    setInputText("");
  };

  return (
    <div className="inputField">
      <input
        value={inputText}
        type="text"
        placeholder="What you want to do?"
        onChange={handleChange}
      />
      <button onClick={add}>Add</button>
    </div>
  );
};

export default InputArea;
