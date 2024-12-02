import { createMachine, assign } from "xstate";

export const stepperMachine = createMachine({
  id: "stepper",
  initial: "step_one",
  context: {
    previousStep: null, // To store the step from which quit_confirmation was entered
  },
  states: {
    step_one: {
      on: {
        next: "step_two",
        close: {
          target: "quit_confirmation",
          actions: assign({ previousStep: () => "step_one" }),
        },
      },
    },
    step_two: {
      on: {
        next: "finish",
        close: {
          target: "quit_confirmation",
          actions: assign({ previousStep: () => "step_two" }),
        },
        back: "step_one",
      },
    },
    quit_confirmation: {
      on: {
        finish: "finish",
        cancel: [
          {
            target: "step_one",
            guard: ({ context }) => {
              const shouldRedirectToStepOne =
                context.previousStep === "step_one";
              return shouldRedirectToStepOne;
            },
          },
          {
            target: "step_two",
            guard: ({ context }) => {
              const shouldRedirectToStepTwo =
                context.previousStep === "step_two";
              return shouldRedirectToStepTwo;
            },
          },
        ],
      },
    },
    finish: {
      type: "final",
    },
  },
});
