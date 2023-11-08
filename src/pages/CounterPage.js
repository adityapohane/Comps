import React, { useReducer } from "react";
import Button from "../components/Button";
import Panel from "../components/Panel";
import { produce } from "immer";
const INCREMENT_COUNT = "increment";
const DECREMENT_COUNT = "decrement";
const CHANGE_VALUE = "valueToAdd";
const CHANGE_COUNT = "Adding_Value";

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT: 
      // using immer we can directly assign value to just like we doo
      state.count = state.count + 1;
      return;

    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    case CHANGE_VALUE:
      return {
        ...state,
        valueToAdd: action.payload,
      };
    case CHANGE_COUNT:
// this is how we change our set using immer
      state.count = state.count + state.valueToAdd;
      return;

    default:
      return state;
  }

};


function CounterPage({ initialCount }) {
  // const [count, setCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);
  // produce have reducer function soo we can use immer for whole reducer
  const [state, dispatch] = useReducer(produce(reducer), {
    count: initialCount,
    valueToAdd: 0,
  });

  const increment = () => {
    dispatch({
      type: INCREMENT_COUNT,
    });
  };
  const decrement = () => {
    dispatch({
      type: DECREMENT_COUNT,
    });
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    console.log(value, typeof value);
    dispatch({
      type: CHANGE_VALUE,
      payload: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: CHANGE_COUNT,
    });
  };

  return (
    <Panel className="m-3">
      <h1 className="text-lg">count is {state.count}</h1>
      <div className="flex flex-row"></div>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Add a lot</label>
        <input
          type="number"
          value={state.valueToAdd || ""}
          onChange={handleChange}
          className="p-1 m-3 bg-gray-50 border border-gray-300"
        />
        <Button>Add it</Button>
      </form>
    </Panel>
  );
}

export default CounterPage;
