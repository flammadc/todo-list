import { useState } from "react";

export const Todo = ({ useList, addDone, deleteTask, updateTask }) => {
  const [useInput, setUseInput] = useState("");
  return (
    <>
      {useList.length > 0 ? (
        useList
          .filter((task) => task.isDone === false)
          .map((task) => (
            <div className="input-group w-50 mb-2" key={task.id}>
              <div className="input-group-text">
                <input
                  onChange={() => addDone(task)}
                  className="form-check-input mt-0"
                  type="checkbox"
                  value=""
                  checked={task.isDone}
                />
              </div>
              <input
                type="text"
                value={useInput[task.id] ?? task.value}
                className={
                  task.isDone
                    ? "form-control text-decoration-line-through"
                    : "form-control"
                }
                onChange={(e) =>
                  setUseInput({ ...useInput, [task.id]: e.target.value })
                }
              />
              <button
                onClick={() =>
                  updateTask(task.id, useInput[task.id] ?? task.value)
                }
                className="btn btn-warning"
                disabled={task.isDone}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn btn-danger"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))
      ) : (
        <h3>Todo Still Empty!</h3>
      )}
    </>
  );
};
