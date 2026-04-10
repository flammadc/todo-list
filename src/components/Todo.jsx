export const Todo = ({ useList, useDone, addDone, deleteTask }) => {
  return (
    <>
      {useList.length > 0 ? (
        useList.map((task) => (
          <div className="input-group w-50 mb-2" key={task.id}>
            <div className="input-group-text">
              <input
                onChange={() => addDone(task)}
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                checked={useDone.some((t) => t.id === task.id)}
              />
            </div>
            <input
              type="text"
              value={task.value}
              className={
                useDone.some((t) => t.id === task.id)
                  ? "form-control text-decoration-line-through"
                  : "form-control"
              }
              
            />
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
