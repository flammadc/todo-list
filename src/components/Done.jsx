export const Done = ({
  useList,
  addDone,
  deleteTask,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => {
  return (
    <>
      {useList.filter((task) => task.isDone === true).length > 0 ? (
        useList
          .filter((task) => task.isDone === true)
          .map((done) => {
            const realIndex = useList.findIndex((t) => t.id === done.id);
            return (
              <div
                className="input-group w-50 mb-2"
                key={done.id}
                draggable
                onDragStart={() => onDragStart(realIndex)}
                onDragOver={(e) => onDragOver(e, realIndex)}
                onDragEnd={onDragEnd}
              >
                <div className="input-group-text">
                  <input
                    onChange={() => addDone(done)}
                    className="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    checked={useList.some((t) => t.id === done.id)}
                  />
                </div>
                <input
                  type="text"
                  value={done.value}
                  className={"form-control text-decoration-line-through"}
                  disabled
                  style={{ cursor: "grab" }}
                />
                <button
                  onClick={() => deleteTask(done.id)}
                  className="btn btn-danger"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            );
          })
      ) : (
        <h3>Done Still Empty!</h3>
      )}
    </>
  );
};
