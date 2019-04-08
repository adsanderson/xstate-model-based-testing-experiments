import React from "react";
import {
  fireEvent,
  getByText,
  render,
  prettyDOM,
  cleanup
} from "react-testing-library";
import { getSimplePaths } from "@xstate/graph";

import { Light } from "../light-component";

import { fetchMachine } from "../fetch-machine";
import { lightMachine } from "../light-machine";

function testModel(model, component, interactions) {
  const p = Object.values(getSimplePaths(model));
  const pathList = p.map(m => m.paths).flat();

  pathList.forEach(steps => {
    const { container } = render(<Light />);
    steps.forEach(step => {
      const func = interactions[step.state.value][step.event.type];
      func(container);
    });
    console.log(prettyDOM(container));
    cleanup();
  });
}

describe("a test", () => {
  test(`test`, () => {
    const lookup = {
      green: {
        SWITCH: container => fireEvent.click(getByText(container, "Switch")),
        STOP: container => fireEvent.click(getByText(container, "STOP!"))
      },
      amber: {
        SWITCH: container => fireEvent.click(getByText(container, "Switch")),
        STOP: container => fireEvent.click(getByText(container, "STOP!"))
      },
      red: {
        SWITCH: container => fireEvent.click(getByText(container, "Switch")),
        STOP: container => fireEvent.click(getByText(container, "STOP!"))
      }
    };

    testModel(lightMachine, <Light />, lookup);
  });
});
