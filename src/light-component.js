import React from "react";
import { useMachine } from "@xstate/react";

import { lightMachine } from "./light-machine";

export function Light() {
  const [current, send] = useMachine(lightMachine);

  return (
    <div>
      <div data-testid="state-value">{current.value}</div>
      <button onClick={() => send("SWITCH")}>Switch</button>
      <button onClick={() => send("STOP")}>STOP!</button>
    </div>
  );
}
