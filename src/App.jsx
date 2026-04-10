import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router";
import { Todo } from "./components/Todo";
import { Done } from "./components/Done";

function App() {
  const [useInput, setUseInput] = useState("");
  const [useUpdate, setUseUpdate] = useState("");

  const [useList, setUseList] = useState(() => {
    const savedData = localStorage.getItem("savedList");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [useDone, setUseDone] = useState(() => {
    const savedData = localStorage.getItem("savedDone");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    if (useList) {
      localStorage.setItem("savedList", JSON.stringify(useList));
    }
    if (useDone) {
      localStorage.setItem("savedDone", JSON.stringify(useDone));
    }
  });

  const addTask = (e) => {
    e.preventDefault();
    if (useInput.trim() === "") return;

    const newTask = {
      id: Math.random(),
      value: useInput,
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
    const isDone = useDone.some((t) => t.id === task.id);
    if (isDone) {
      setUseDone(useDone.filter((t) => t.id !== task.id));
      setUseList([...useList, task]);
    } else {
      setUseList(useList.filter((t) => t.id !== task.id));
      setUseDone([...useDone, task]);
    }
  };

  const deleteTask = (id) => {
    setUseList(useList.filter((t) => t.id !== id));
    setUseDone(useDone.filter((t) => t.id !== id));
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
      <nav className="d-flex gap-4 mb-1">
        <Link to="/" className="nav-link fw-medium">
          To do
        </Link>
        <Link to="/done" className="nav-link fw-medium">
          Done
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Todo
              useList={useList}
              updateTask={updateTask}
              useDone={useDone}
              addDone={addDone}
              deleteTask={deleteTask}
            />
          }
        ></Route>
        <Route
          path="/done"
          element={
            <Done useDone={useDone} addDone={addDone} deleteTask={deleteTask} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
