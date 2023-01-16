import "./App.css";
import { useEffect, useState, createContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "./redux/actions/counterActions";
import CompA from "./CompA";
const ContextExample = createContext();
function App() {
  const [counter, setCounter] = useState(1);
  const [title, setTitle] = useState("");
  const reduxCount = useSelector((state) => state.counter.counter);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const refValue = useRef("");
  const [inputText, setInputText] = useState("");
  const [count, setCount] = useState(100);
  const [useEffectcount, setUseEffectCount] = useState(100);
  const intervelRef = useRef();

  const startIntervel = () => {
    intervelRef.current = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
  };
  const handleReset = () => {
    clearInterval(intervelRef.current); // increment is undefined
    setCount(100);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setUseEffectCount((useEffectcount) => useEffectcount + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------//

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
    inputRef.current.focus();
  }, []);
  useEffect(() => {
    return () => {
      console.log("cleanup(componentWillUnmount)");
    };
  }, []);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------//

  //here current is persisted and we are updating it manually but this refvalue.current can be use to access the previous value of the state.
  // if we use useSte here trying to persist the previous value we can't do that as the useSate value will be updated after reRender;
  /**
   * Assignments to the 'previousValue' variable from inside React Hook useEffect will be lost after each render. To preserve the value over time,
   * store it in a useRef Hook and keep the mutable value in the '.current' property. Otherwise, you can move this variable directly inside useEffect (trying to use var)
   */
  useEffect(() => {
    refValue.current = inputText;
  }, [inputText]);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------//

  return (
    <>
      <ContextExample.Provider value={"Aman"}>
        <div className="App">
          <p>(1) UseRef Usage</p>
          <input
            ref={inputRef}
            onChange={(e) => setInputText(e.target.value)}
          />
          <p>
            Input text used to be{" "}
            <b style={{ color: "red" }}>{refValue.current}</b> but now its{" "}
            <b style={{ color: "red" }}>{inputText}</b>
          </p>
          <div>
            ----------------------------------------------------------------------------------------------------------------------
          </div>
          <p>
            <p>(2) UseEffect and Redux</p>
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
          <div>
            ----------------------------------------------------------------------------------------------------------------------
          </div>
          <p>(3) Use Of Context</p>
          <CompA />
          <div>
            ----------------------------------------------------------------------------------------------------------------------
          </div>
          <p>(4) React functional Component and SetIntervel</p>
          <div style={{ margin: 10 }}>Interval Counter: {count}</div>
          <div style={{ margin: 10 }}>UseEffct Counter: {useEffectcount}</div>
          <button
            style={{
              marginBottom: 20,
              height: 40,
              width: 200,
              borderRadius: 4,
              background: "#fdcb6e",
            }}
            onClick={() => startIntervel()}
          >
            Start Interval
          </button>
          <button
            style={{
              height: 40,
              width: 200,
              borderRadius: 4,
              background: "#fdcb6e",
            }}
            onClick={() => handleReset()}
          >
            Reset Intervel
          </button>
          <div>
            ----------------------------------------------------------------------------------------------------------------------
          </div>
        </div>
      </ContextExample.Provider>
    </>
  );
}

export default App;
export { ContextExample };
