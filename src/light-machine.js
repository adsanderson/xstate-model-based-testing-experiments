import { Machine, assign } from "xstate";

const count = assign({
  tranistions: ctx => ctx + 1
});

export const lightMachine = Machine(
  {
    id: "light",
    initial: "green",
    context: {
      tranistions: 0
    },
    states: {
      green: {
        onEntry: ["countTransitions"],
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
    },
    on: {
      STOP: "red"
    }
  },
  {
    actions: {
      countTransitions: count
    }
  }
);
