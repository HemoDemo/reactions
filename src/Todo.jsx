import { useState, useRef, useEffect } from "react";
import "./todo.css";
import Refresh from './Refresh';
import Himo from "./himo.png";
function Todos() {
  const getTasks = () => {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (data) {
      return JSON.parse(localStorage.getItem("tasks"));
    } else {
      return [];
    }
  };

  const focus = useRef(null);
  const [tasks, setTasks] = useState(getTasks());
  const [localTasks, setLocalTasks] = useState(getTasks());
  const [msg, setMsg] = useState(["NO TASKS ADDED"]);
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState("START");
  const [addTaskNumber, setAddTaskNumber] = useState(0);

  useEffect(() => {
    focus.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(localTasks));
  }, [localTasks]);

  function change(e) {
    setNewTask(e.target.value);
  }

  function add() {
    setStatus("adding");
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setLocalTasks((t) => [...t, newTask]);
      addTaskNumber > -1 && setAddTaskNumber(addTaskNumber + 1);
    }
    if (newTask.trim() === "") setMsg(["Add tasks to do"]);
    setNewTask("");
  }
  function del(index) {
    setStatus("deleting");
    const t = tasks.filter((task, i) => i !== index);
    setTasks(t);
    addTaskNumber > 0 && setAddTaskNumber(addTaskNumber - 1);
  }
  function delM(index) {
    setStatus("deleting");
    const ms = msg.filter((m, i) => i !== index);
    setMsg(ms);
  }
  function up(index) {
    setStatus("ascending");
    if (index > 0) {
      const t = [...tasks];
      [t[index - 1], t[index]] = [t[index], t[index - 1]];
      setTasks(t);
    }
  }
  function down(index) {
    setStatus("desending");
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
        <section className="big-titles">
          <span className="txt4"></span>
          <span className="txt5"></span>
          <span className="txt6"></span>
          <span className="txt">TASKS</span>
          <span className="txt6"></span>
          <span className="txt5"></span>
          <span className="txt4"></span>
          <Refresh />
        </section>
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
              ? `no tasks shown`
              : localTasks.length === 0 ?
              `try to add tasks`
              : `You still have ${tasks.length} to do`}
          </p>
        </section>
        <section className="tasks-shown tasks-big-shown">
          <ol className="tasks-container">
            {tasks.map((task, index) => (
              <li key={index}>
                
                <div className="task-controls">
                  <button className="del-btn" onClick={() => del(index)}>
                    x
                  </button>
                  <button className="down-btn" onClick={() => down(index)}>
                    👇
                  </button>
                  <button className="up-btn" onClick={() => up(index)}>
                    👆
                  </button>
                </div>
                <div className="txt-content">
                  <h2 className="task-txt">{task}</h2>
                </div>
              </li>
            ))}
            {tasks.length === 0 &&
              msg.map((m, i) => (
                <li key={i} className="d-father">
                  <div className="txt-content">
                    <h2 className="task-txt">{m}</h2>
                  </div>
                  <div className="task-controls tsk-cont-d">
                    <button className="del-btn d" onClick={() => delM(i)}>
                      x
                    </button>
                  </div>
                </li>
              ))}
          </ol>
        </section>
        <section className="status">
          <h6 className='span status-part'>
            <span className='strong status-title'>ST</span>
            <span className='values status-value'>
              {status}
            </span>
          </h6>
          <h6 className='span tasks-part'>
            <span className='strong tasks-title'>
              TS
            </span>
              <span className='values tasks-value'>
                {tasks.length}
              </span>
          </h6>
          <h6 className='span tasks-stored-part'>
            <span className='strong tasks-stored-title'>
            TSS
            </span>
            <span className='values tasks-stored-value'>
              {localTasks.length}
            </span>
          </h6>
          <h6 className='span msg-part'>
            <span className='strong msg-title'>
             M
           </span>
           <span className=' msg-value'>
             {msg.length === 0 ? "TRY TO ADD TASKS" : msg}
           </span>
         </h6>
         <h6 className='span tasks-added-part'>
            <span className='strong tasks-added-title'>
              ATN
            </span>
            <span className='values tasks-added-value'>
              {addTaskNumber}
            </span>
          </h6>
        </section>
        <section className="lastLine">
          <button className="rest" onClick={() => setLocalTasks([])}>
            REST
          </button>
          <button
            className="rest"
            onClick={() => {
              localStorage.clear();
              setTasks([]);
              setLocalTasks([]);
            }}
          >
            REST-ALL
          </button>
          <button className="rest" onClick={() => setTasks([])}>
            NOTASKS
          </button>
          <button className="rest" onClick={() => setNewTask("")}>
            CLEAR
          </button>
        </section>
        <section className="app-creator">
          <img src={Himo} className="himo-img" alt="himo logo" />
          <h5 className="himo-title">CREATED BY IBRAHIM HASSAN 2025</h5>
        </section>
      </div>
    </>
  );
}

export default Todos;

