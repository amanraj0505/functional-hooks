import { INCREMENT, DECREMENT } from "../actionTypes";
export const counterActions = {
  increment,
  decrement,
};
function increment() {
  return { type: INCREMENT };
}
function decrement() {
  return { type: DECREMENT };
}
