import React, { useEffect, useState } from "react";
import InputArea from "./InputArea";
import ToDoItem from "./ToDoItem";
import "./App.css";
import { useQuery, gql, useMutation } from "@apollo/client";

const ADD_ITEM = gql`
  mutation AddItem($name: String!) {
    addItem(input: { data: $name }) {
      name
    }
  }
`;

const DELETE_ITEM = gql`
  mutation DeleteItem($id: Int!) {
    deleteItem(id: $id) {
      name
    }
  }
`;

const GET_ITEMS = gql`
  query GetItems {
    items {
      name
    }
  }
`;

const App = () => {
  const [items, setItems] = useState([]);
  const { loading, data, error } = useQuery(GET_ITEMS);
  const [addItem, { loading: addLoading, error: addError, data: addedData }] =
    useMutation(ADD_ITEM);
  const [
    deleteI,
    { loading: deleteLoading, error: deleteError, data: updatedData },
  ] = useMutation(DELETE_ITEM);

  useEffect(() => {
    if (data) {
      setItems(data?.items);
    }
  }, [data]);

  useEffect(() => {
    if (addedData) {
      // console.log(addedData);
      setItems(addedData?.addItem);
    }
  }, [addedData]);

  useEffect(() => {
    if (updatedData) {
      setItems(updatedData?.deleteItem);
    }
  }, [updatedData]);

  const addItems = (item) => {
    addItem({
      variables: {
        name: item,
      },
    });
    // setItems((current) => {
    //   const newItemList = [...current, item];
    //   const stringType = JSON.stringify(newItemList);
    //   localStorage.setItem("items", stringType);
    //   return newItemList;
    // });
  };

  console.log(items);
  const deleteItem = (id) => {
    deleteI({
      variables: {
        id: Number(id),
      },
    });
  };

  return (
    <div className="app">
      <h1 className="app__title">To-Do List</h1>
      <InputArea addItems={addItems} />
      <div className="itemsContainer">
        {items.length === 0 ? (
          <h1>No Items Added</h1>
        ) : (
          items.map((item, index) => {
            return (
              <ToDoItem
                key={index}
                itemText={item.name}
                deleteItem={() => deleteItem(index)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default App;
