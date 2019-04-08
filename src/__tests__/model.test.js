import React from "react";
import {
  fireEvent,
  getByText,
  getByTestId,
  render,
  prettyDOM,
  cleanup
} from "react-testing-library";
import { getSimplePaths } from "@xstate/graph";

import { Light } from "../light-component";
import { lightMachine } from "../light-machine";

describe("Iterate through all paths in component", () => {
  test(`Light component`, () => {
    const lookup = {
      green: {
        confirmState: container => expectStateToBe(container, "green"),
        SWITCH: (container, expectedValue) =>
          clickEvent(container, "switch", expectedValue),
        STOP: (container, expectedValue) =>
          clickEvent(container, "STOP!", expectedValue)
      },
      amber: {
        confirmState: container => expectStateToBe(container, "amber"),
        SWITCH: (container, expectedValue) =>
          clickEvent(container, "switch", expectedValue),
        STOP: (container, expectedValue) =>
          clickEvent(container, "STOP!", expectedValue)
      },
      red: {
        confirmState: container => expectStateToBe(container, "red"),
        SWITCH: (container, expectedValue) =>
          clickEvent(container, "switch", expectedValue),
        STOP: (container, expectedValue) =>
          clickEvent(container, "STOP!", expectedValue)
      }
    };

    testModel(lightMachine, <Light />, lookup);
  });
});

function clickEvent(container, buttonText, expectedValue) {
  fireEvent.click(getByText(container, "Switch"));
}

function expectStateToBe(container, expected) {
  console.log(getByTestId(container, "state-value").innerText, expected);
  expect(getByTestId(container, "state-value").innerText).toBe(expected);
}

function logStateValue(container) {
  console.log(getByTestId(container, "state-value").innerText);
}

function testModel(model, component, interactions) {
  const p = Object.values(getSimplePaths(model));
  const pathList = p.map(m => m.paths).flat();

  pathList.forEach(steps => {
    console.log("START ------------------------------------------------------");
    const { container } = render(<Light />);
    logStateValue(container);
    steps.forEach(step => {
      const func = interactions[step.state.value][step.event.type];
      func(container, step.state.value);
      logStateValue(container);
      const nextState = model.transition(step.state.value, step.event.type);
      console.log("Next state", nextState.value);
      interactions[nextState.value].confirmState(container, nextState.value);
    });
    console.log("STOP -------------------------------------------------------");
    cleanup();
  });
}
