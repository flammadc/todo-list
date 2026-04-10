import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  UNSAFE_useScrollRestoration,
} from "react-router";
import { Todo } from "./components/Todo";
import { Done } from "./components/Done";
import { All } from "./components/All";

function App() {
  const [useInput, setUseInput] = useState("");

  const [useList, setUseList] = useState(() => {
    const savedData = localStorage.getItem("savedList");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    if (useList) {
      localStorage.setItem("savedList", JSON.stringify(useList));
    }
  });

  const addTask = (e) => {
    e.preventDefault();
    if (useInput.trim() === "") return;

    const newTask = {
      id: Math.random(),
      value: useInput,
      isDone: false,
    };

    setUseList([...useList, newTask]);
    setUseInput("");
  };

  const updateTask = (id, e) => {
    const updatedList = useList.map((prev) => {
      if (prev.id === id) {
        return { ...prev, value: e };
      }
      return prev;
    });
    setUseList(updatedList);
  };

  const addDone = (task) => {
    const updatedList = useList.map((prev) => {
      if (prev.id === task.id) {
        return { ...prev, isDone: !prev.isDone };
      }
      return prev;
    });
    setUseList(updatedList);
  };

  const deleteTask = (id) => {
    setUseList(useList.filter((t) => t.id !== id));
  };

  return (
    <div className="container py-4 ">
      <h1>Todo list</h1>
      <form className="input-group w-50 mb-3 ">
        <input
          type="text"
          className="form-control "
          placeholder="Add Text"
          value={useInput}
          onChange={(e) => setUseInput(e.target.value)}
        />
        <button onClick={addTask} type="submit" className="btn btn-dark">
          + Add
        </button>
      </form>
      <nav className="d-flex flex-row gap-4 mb-1 navbar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link fw-medium p-1 rounded ${isActive ? "bg-dark text-light" : ""}`
          }
        >
          All Task
        </NavLink>
        <NavLink
          to="/todo"
          className={({ isActive }) =>
            `nav-link fw-medium p-1 rounded ${isActive ? "bg-dark text-light" : ""}`
          }
        >
          To do
        </NavLink>
        <NavLink
          to="/done"
          className={({ isActive }) =>
            `nav-link fw-medium p-1 rounded ${isActive ? "bg-dark text-light" : ""}`
          }
        >
          Done
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <All
              useList={useList}
              updateTask={updateTask}
              addDone={addDone}
              deleteTask={deleteTask}
            />
          }
        ></Route>
        <Route
          path="/todo"
          element={
            <Todo
              useList={useList}
              updateTask={updateTask}
              addDone={addDone}
              deleteTask={deleteTask}
            />
          }
        ></Route>
        <Route
          path="/done"
          element={
            <Done useList={useList} addDone={addDone} deleteTask={deleteTask} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
