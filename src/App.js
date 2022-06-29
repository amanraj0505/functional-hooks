import logo from "./cat.png";
import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { counterActions } from "./redux/actions/counterActions";

function App() {
  const [counter, setCounter] = useState(1);
  const [title, setTitle] = useState("");
  const reduxCount = useSelector((state) => state.counter.counter);
  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    console.log("useEffect called (Counter)");
    fetch("https://jsonplaceholder.typicode.com/todos/" + String(counter))
      .then((response) => response.json())
      .then((json) => setTitle(json.title));
  }, [counter]);
  useEffect(() => {
    console.log("useEffect called every time (componentDidUpdate)");
  });
  useEffect(() => {
    console.log("useEffect called at start (componentDidMount)");
  }, []);
  useEffect(() => {
    return () => {
      console.log("cleanup(componentWillUnmount)");
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {counter}
          <br></br>
          <button
            style={{
              height: 40,
              width: 200,
              borderRadius: 4,
              background: "#fdcb6e",
            }}
            onClick={() => {
              setCounter(counter + 1);
            }}
          >
            Increment
          </button>
          <button
            style={{
              height: 40,
              width: 200,
              borderRadius: 4,
              background: "#fdcb6e",
              marginLeft: 10,
            }}
            onClick={() => {
              setCounter(counter - 1);
            }}
          >
            Decrement
          </button>
        </p>
        <p>
          {reduxCount}
          <br></br>
          <button
            style={{
              height: 40,
              width: 200,
              borderRadius: 4,
              background: "#fdcb6e",
            }}
            onClick={() => {
              dispatch(counterActions.increment());
            }}
          >
            Redux Increment
          </button>
          <button
            style={{
              height: 40,
              width: 200,
              borderRadius: 4,
              background: "#fdcb6e",
              marginLeft: 10,
            }}
            onClick={() => {
              dispatch(counterActions.decrement());
            }}
          >
            Redux Decrement
          </button>
        </p>
        <p>
          User Title for number {counter} : {title}
        </p>
      </header>
    </div>
  );
}

export default App;
