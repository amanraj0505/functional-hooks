import React from "react";
import { ContextExample } from "./App";
const CompC = () => {
  return (
    <>
      <ContextExample.Consumer>
        {(contextValue) => {
          return (
            <div>
              This is a double nested Component C (Context Example)
              contextValue: {contextValue}
            </div>
          );
        }}
      </ContextExample.Consumer>
    </>
  );
};

export default CompC;
