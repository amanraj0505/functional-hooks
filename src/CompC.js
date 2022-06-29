import React, { useContext } from "react";
import { ContextExample } from "./App";
const CompC = () => {
  //we can also access the context using useContext hook
  const contextValue1 = useContext(ContextExample);
  return (
    <>
      <ContextExample.Consumer>
        {(contextValue) => {
          return (
            <div>
              This is a double nested Component C (Context Example)
              <br /> contextValue: {contextValue}
              <br />
              conntextValue1: {contextValue1}
            </div>
          );
        }}
      </ContextExample.Consumer>
    </>
  );
};

export default CompC;
