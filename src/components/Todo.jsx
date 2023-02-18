import React, { useState, useEffect } from "react";
import "./Todo.css";

const getLocalData = () => {
  const lists = localStorage.getItem("myTask");
  if (lists) return JSON.parse(lists);
  else return [];
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [iseditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputdata) {
      alert("Please Enter The task");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((currEle) => {
          if (currEle.id === iseditItem) {
            return { ...currEle, name: inputdata };
          }
          return currEle;
        })
      );

      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  const editItem = (idx) => {
    const item_todo_edited = items.find((currEle) => {
      return currEle.id === idx;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(idx);
    setToggleButton(true);
  };

  const deleteItem = (idx) => {
    const updateItems = items.filter((currEle) => {
      return currEle.id !== idx;
    });
    setItems(updateItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("myTask", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/do.png" alt="checklist logo" />
            <figcaption>Add Your Today Tasks</figcaption>
          </figure>

          <div className="addItems">
            <input
              type="text"
              placeholder="Add Task"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((currEle) => {
              return (
                <div className="eachItem" key={currEle.id}>
                  <h3>{currEle.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(currEle.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(currEle.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>

          <p className="para">
            Add your tasks.<br /> Organize your life.<br /> Achieve more every day.
          </p>
        </div>
      </div>
    </>
  );
};

export default Todo;
