import { useState, useRef, useEffect } from "react";
import "./todo.css";
import Button from "./Button";
import Himo from "./himo.png";
function Todo() {
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
  const [msg, setMsg] = useState(["..."]);
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState("ابدأ");
  const [addTaskNumber, setAddTaskNumber] = useState(0);

  useEffect(() => {
    focus.current.focus();
    setStatus("صندوق اضافة");
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(localTasks));
  }, [localTasks]);

  function change(e) {
    setNewTask(e.target.value);
    setStatus("الكتابة ...");
  }
  const inputOnclick = () => {
    setStatus("صندوق اضافة");
  };
  const refreshOnClick = () => {
    localTasks.length !== 0
      ? setStatus("استعادة المهام")
      : setStatus("اعادة تشغيل");
  };
  const refreshOnunClick = () => {
    setStatus("...");
  };

  function add() {
    if (newTask.trim() !== "") {
      setStatus("اضف مهمة");
      setTasks((t) => [...t, newTask]);
      setLocalTasks((t) => [...t, newTask]);
      addTaskNumber > -1 && setAddTaskNumber(addTaskNumber + 1);
    }
    if (newTask.trim() === "") {
      setMsg(["أضف مهمة"]);
      setStatus("تنبيه");
    }
    setNewTask("  ");
  }
  function del(index) {
    setStatus("حذف");
    const t = tasks.filter((task, i) => i !== index);
    setTasks(t);
    addTaskNumber > 0 && setAddTaskNumber(addTaskNumber - 1);
  }
  function speak(index) {
    setStatus("تحدث");
    const t = tasks.filter((task, i) => i === index);
    const v = new SpeechSynthesisUtternace(t);
    window.speechSynthesis.speak(v);
  }
  function delM(index) {
    setStatus("ازالة التنبيه");
    const ms = msg.filter((m, i) => i !== index);
    setMsg(ms);
  }
  function up(index) {
    setStatus("تصاعدي");
    if (index > 0) {
      const t = [...tasks];
      [t[index - 1], t[index]] = [t[index], t[index - 1]];
      setTasks(t);
    }
  }
  function down(index) {
    setStatus("تنازلي");
    if (index < tasks.length - 1) {
      const t = [...tasks];
      [t[index], t[index + 1]] = [t[index + 1], t[index]];
      setTasks(t);
    }
  }
  const handleRefresh = () => {
    window.location.reload();
  };
  const emptyTasks = () => {
    setTasks([]);
  };

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
          <Button
            hint="تحميل"
            onMouseOver={refreshOnClick}
            onMouseOut={refreshOnunClick}
            onClick={handleRefresh}
          >
            💿
          </Button>
        </section>
        <section className="entry">
           <button
            className={
              tasks.length === 0
                ? `tasks-entry-btn-disabled`
                : `tasks-entry-btn`
            }
            onClick={add}
          ></button>
          <input
            type="text"
            placeholder="اضف مهمة ..."
            value={newTask}
            onChange={change}
            className="tasks-entry tasks-entry-big"
            ref={focus}
            onFocus={inputOnclick}
          />
         
        </section>
        <section className="tasks-shown-start">
          <h2>TASKS...</h2>
          <p>
            {tasks.length === 0 && localTasks.length === 0
              ? `أضف مهام`
              : tasks.length === 0
              ? `المهام ليست معروضه`
              : tasks.length === 1
              ? `مازال لديك مهمة للقيام بها`
              : tasks.length === 2
              ? `مازال لديك مهمتان للقيام بهما`
              : `مازال لديك ${tasks.length} مهام للقيام بها`}
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
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <button className="down-btn" onClick={() => down(index)}>
                    👇
                    </button>
                    <button className="up-btn" onClick={() => up(index)}>
                    👆
                    </button>
                  </div>
                  
                  <button className="speak-btn" onClick={() => speak(index)}>
                    s
                  </button>
                </div>
                <div className="txt-content">
                  <h2 lang="ar" className="task-txt">
                    {task}
                  </h2>
                </div>
              </li>
            ))}
            {tasks.length === 0 &&
              msg.map((m, i) => (
                <li key={i} className="d-father">
                  <div className="tsk-cont-d">
                    <button className="del-btn d" onClick={() => delM(i)}>
                      x
                    </button>
                  </div>
                  <div className="txt-content">
                    <h2 className="task-txt">
                      {m === "..." &&
                      tasks.length === 0 &&
                      localTasks.length === 0
                        ? `لايوجد مهام`
                        : tasks.length === 0 && localTasks.length > 0
                        ? "المهام غير معروضه"
                        : m}
                    </h2>
                  </div>
                </li>
              ))}
          </ol>
        </section>
        <section className="status">
          <h6 className="span status-part">
            <span className="values status-value">{status}</span>
          </h6>
          <h6 className="span tasks-part">
            <span className="tasks-title">TS</span>
            <span className="values tasks-value">{tasks.length}</span>
          </h6>
          <h6 className="span tasks-stored-part">
            <span className="tasks-stored-title">TSS</span>
            <span className="values tasks-stored-value">
              {localTasks.length}
            </span>
          </h6>
          <h6 className="span msg-part">
            <span className="msg-title">M</span>
            <span className="values msg-value">
              {msg.length === 0 ? " أضف مهام" : msg}
            </span>
          </h6>
          <h6 className="span tasks-added-part">
            <span className="tasks-added-title">ATN</span>
            <span className="values tasks-added-value">{addTaskNumber}</span>
          </h6>
        </section>
        <section className="lastLine">
          <button className="rest" onClick={() => setLocalTasks([])}>
            حذف المخزن
          </button>
          <button
            className="rest"
            onClick={() => {
              localStorage.clear();
              setTasks([]);
              setLocalTasks([]);
            }}
          >
            حذف الجميع
          </button>
          <button className="rest" onClick={emptyTasks}>
            الانتهاء من المهام
          </button>
          <button className="rest" onClick={() => setNewTask("")}>
            تفريغ الصندوق
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

export default Todo;


