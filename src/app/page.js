"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [todos, settodos] = useState([]);

  const [inputtodo, setinputtodo] = useState("");
  const [editId, seteditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = (newtask) => {
    settodos([...todos, newtask]);
    setinputtodo("");
  };

  const deleteTodo = (task) => {
    const newarrr = todos.filter((item) => item.id != task.id);
    settodos(newarrr);
  };

  const startediting = (taskid) => {
    seteditId(taskid.id);
  };

  const saveEdit = (id) => {
    const updatetodo = todos.map((item) =>
      item.id === id ? { ...item, task: editText } : item
    );
    settodos(updatetodo)
    seteditId(null)
    setEditText("");
  };

  return (
    <>
      <input
        type="text"
        className="text-black"
        value={inputtodo}
        onChange={(e) => setinputtodo(e.target.value)}
      />
      <button onClick={() => addTodo({ id: Date.now(), task: inputtodo })}>
        Add
      </button>
      {todos.map((item) => {
        return (
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "15px" }}
          >
            {
            item.id === editId ? (
              <>
                <input
                  type="text"
                  style={{color:"black"}}
                  // defaultValue={item.task}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(item.id)}>Save todo</button>
              </>
            ) : (
              <>
                <p>{item.task}</p>
                <button
                  onClick={() => startediting(item)}
                  style={{ marginLeft: "10px", border: "2px solid" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(item)}
                  style={{ marginLeft: "10px", border: "2px solid" }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
