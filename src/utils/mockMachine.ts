import { createMachine, assign } from "xstate";
import { NavigationSteps } from "../constants/navigationConfig";

export const stepperMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwC5gA7rAJwHSowH0B7AOzAGJyAPFAbQAYBdRUdY2ASxU7NZGqIAjAA4A7LgBMANgYAWIZICskgJyqAzCNUAaEAE9EksXNxKlWxRqEalc1ZIC+jvQUw58adCXIUAxgA2HGCMLEgg7Fw8fOGCCKISMvKKKupaugaIIkK4GpJqNvYiSkJy1s6uXlh4boQoAO7EVGC0ofyR3Lyk-HFlGrhychYMDNZi0iKjeoYIGtKqZqKSQkpiItZyYmJKFSBu1Z5EDU2BwW3hHdHdsYh9A0MaI2MTU5kIxqYyjzbFmuulu32HlqxwoACMAIZ+ADW5zYHE6MVAcUkIzMkzEkjk2REy1xcmmRixuBMNkUqlKSmkX0BVQ8AEcAK7cQh+MgAM042AAthCrhROaROLAABZwiIIq49LIqXCqJTyXElSSPESE97GKTqTZJCzykTSWkYA5Mlls0icnl8rr+CGkPxgALiy5daUIOTSJRmTRiDS+hjSeabdUKBYaR5iFZLQrGI3uPCmlCsjlc3n8vx2h1OoRheFRV03d3h+7DUZCcaTDTq-KmIYMEqDWQaVSBpy7UjECBwfhA7DtSUF5GIAC00nVo9wIyn05nYjjB1qZDA-fzSIEt0k6qE5ZJKiUqmyYlGB6EhpcezpNS8dUaK8R1yH7wPuHLomkg232Ns1bycpEZQmMRVF9ClcXnBlmSTc1LTTQcJVXB91wQaRI3uEY1iUYpHjHN58gkD0GE0FYgO0NQz0qY0PEFYURTvKVC3lL0IyxI81CVMQf36ERJlRU9uM9EwdmcRwgA */
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

export const MockConfig = {
  initial: NavigationSteps.INITIAL_STEP,
  navigation: {
    [NavigationSteps.INITIAL_STEP]: {
      next: NavigationSteps.SECOND_STEP,
      close: NavigationSteps.QUIT_CONFIRMATION_STEP,
    },
    [NavigationSteps.SECOND_STEP]: {
      back: NavigationSteps.INITIAL_STEP,
      next: NavigationSteps.FINISH,
      close: NavigationSteps.QUIT_CONFIRMATION_STEP,
    },
  },
};
