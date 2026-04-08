export const Done = ({ useDone, addDone, deleteTask }) => {
  return (
    <>
      {useDone.length > 0 ? (
        useDone.map((done) => (
          <div className="input-group w-50 mb-2" key={done.id}>
            <div className="input-group-text">
              <input
                onChange={() => addDone(done)}
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                checked={useDone.some((t) => t.id === done.id)}
              />
            </div>
            <input
              type="text"
              value={done.value}
              className={"form-control text-decoration-line-through"}
              disabled
            />
            <button
              onClick={() => deleteTask(done.id)}
              className="btn btn-danger"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        ))
      ) : (
        <h3>Done Still Empty!</h3>
      )}
    </>
  );
};
