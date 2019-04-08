import { Machine } from "xstate";

export const lightMachine = Machine({
  id: "light",
  initial: "green",
  states: {
    green: {
      on: {
        SWITCH: "amber"
      }
    },
    amber: {
      on: {
        SWITCH: "red"
      }
    },
    red: {
      on: {
        SWITCH: "green"
      }
    }
  }
});
