import { useState, useEffect, useRef } from "react";
import Add from "../src/sounds/add.wav";
import Delets from "../src/sounds/delet.mp3";
import "./App.css";

function App() {
  const [inputW, setinputW] = useState("");
  const [accept, setaccept] = useState("");
  const [todo, settodo] = useState([]);
  const inputRef = useRef();
  useEffect(() => {
    const storedTodos = JSON.parse(window.localStorage.getItem("todos")) || [];
    settodo(storedTodos);
  }, []);
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };
  const hanndelButton = () => {
    setaccept(true);
    if (inputW !== "") {
      const newItem = { completed: false, text: inputW };
      const updatedTodos = [...todo, newItem];
      settodo(updatedTodos);
      setinputW("");
      window.localStorage.setItem("todos", JSON.stringify(updatedTodos));
      playSound(Add);
    }
  };

  const hanndeDone = (index) => {
    const newitem = [...todo];
    newitem[index].completed = !newitem[index].completed;
    settodo(newitem);
    window.localStorage.setItem("todos", JSON.stringify(newitem));
  };

  const handelDelet = (index) => {
    const newitem = [...todo];
    newitem.splice(index, 1);
    settodo(newitem);
    window.localStorage.setItem("todos", JSON.stringify(newitem));
    playSound(Delets);
  };

  return (
    <div className="todo">
      <h1>Todo List</h1>
      <div>
        <ul className="ul">
          {todo.map(({ text, completed }, index) => {
            return (
              <div key={index} className="todos-de">
                <div>
                  <li
                    className={completed ? "done" : ""}
                    onClick={() => hanndeDone(index)}
                  >
                    {text}
                  </li>
                </div>
                <span onClick={() => handelDelet(index)}>🥊</span>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="last">
        <input
          value={inputW}
          onChange={(e) => setinputW(e.target.value)}
          ref={inputRef}
          placeholder="Enter item..."
        />
        {inputW === "" && accept && (
          <p className="wronge">Please enter an item?</p>
        )}
        <button onClick={hanndelButton}>Add</button>
      </div>
    </div>
  );
}

export default App;
