import { useState, useRef, useEffect } from "react";
import "./todo.css";

function Todo() {
  const focus = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState(["No tasks added"]);
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState('start');
  const [addTaskNumber, setAddTaskNumber] = useState(0);

  useEffect(() => {
    focus.current.focus();
  }, []);

  function change(e) {
    setNewTask(e.target.value);
  }

  function add() {
    setStatus('adding');
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      addTaskNumber > -1 && setAddTaskNumber(addTaskNumber + 1);
    }
    if (newTask.trim() === "") setMsg(["Add tasks to do"]);
    setNewTask("");
  }
  function del(index) {
     setStatus('deleting');
    const t = tasks.filter((task, i) => i !== index);
    setTasks(t);
    addTaskNumber > 0 && setAddTaskNumber(addTaskNumber - 1);

  }
  function delM(index) {
    setStatus('deleting');
    const ms = msg.filter((m, i) => i !== index);
    setMsg(ms);
  }
  function up(index) {
    setStatus('ascending');
    if (index > 0) {
      const t = [...tasks];
      [t[index - 1], t[index]] = [t[index], t[index - 1]];
      setTasks(t);
    }
  }
  function down(index) {
    setStatus('desending');
    if (index < tasks.length - 1) {
      const t = [...tasks];
      [t[index], t[index + 1]] = [t[index + 1], t[index]];
      setTasks(t);
    }
  }

  return (
    <>
      <div
        className="tasks tasks-big mobile-tasks"
        style={{ border: "2px solid #123", background: "silver !important" }}
      >
        <h1 className="big-titles">
          <span className="txt">Tasks</span>
        </h1>
        <section className="entry">
          <input
            type="text"
            placeholder="add task ..."
            value={newTask}
            onChange={change}
            className="tasks-entry tasks-entry-big"
            ref={focus}
          />
          <button
            className={
              tasks.length === 0
                ? `tasks-entry-btn-disabled`
                : `tasks-entry-btn`
            }
            onClick={add}
          ></button>
        </section>
        <section className="tasks-shown-start">
          <h2>TASKS...</h2>
          <p>
            {tasks.length === 0
              ? `try to add tasks to do`
              : `You still have ${tasks.length} to do`}
          </p>
        </section>
        <section className="tasks-shown tasks-big-shown">
          <ol>
            {tasks.map((task, index) => (
              <li key={index}>
                <div className="txt-content">
                  <h2 className="task-txt">{task}</h2>
                </div>
                <div className="task-controls">
                  <button className="down-btn" onClick={() => down(index)}>
                    👇
                  </button>
                  <button className="up-btn" onClick={() => up(index)}>
                    👆
                  </button>
                  <button className="del-btn" onClick={() => del(index)}>
                    x
                  </button>
                </div>
              </li>
            ))}
            {tasks.length === 0 &&
              msg.map((m, i) => (
                <li key={i}>
                  <div className="txt-content">
                    <h2 className="task-txt">{m}</h2>
                  </div>
                  <div className="task-controls">
                    <button className="del-btn m" onClick={() => delM(i)}>
                      x
                    </button>
                  </div>
                </li>
              ))}
          </ol>
        </section>
        <section className="status">
          status: {status} TASKS| {tasks.length} MSG ={msg.length ===0 ? 'try to add tasks' : msg} ADD {addTaskNumber}
        </section>
      </div>
    </>
  );
}

export default Todo;
