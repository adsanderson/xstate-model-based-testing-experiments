import { fetchMachine } from "../fetch-machine";

import { getSimplePaths } from "@xstate/graph";
import { lightMachine } from "../light-machine";

describe("a test", () => {
  test(`test`, () => {
    const x = getSimplePaths(lightMachine);
    console.log(x);
    // expect(Object.keys(x)).toHaveLength(1);
  });
});
