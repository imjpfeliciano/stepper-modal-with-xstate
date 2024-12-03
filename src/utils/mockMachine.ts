import { createMachine, assign } from "xstate";
import { NavigationSteps } from "../constants/navigationConfig";

export const stepperMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwC5gA7rAJwHSowH0B7AOzAGJyAPFAbQAYBdRUdY2ASxU7NZGqIAtAGYAjACZcADjFiAnAFYALPIaLFEsQHYANCACeiBYtwSJ42QDZxkicqsBfR-oKYc+NOhLkKAYwAbDjBGFiQQdi4ePnDBBFFJGTklVXVNHX0jBDFceXlzaQlrBmltRSsrbWdXLyw8N0IUAHdiKjBaUP5I7l5SfjihCtwrCW0GSrltbWkGEUzECTVcMVLFaUUxBgZtLWqQNzrPImbWwODO8O7ovtjhIZGxiZ1p2fns+WVckQtpcW0rJRWZR7A4eBonCgAIwAhn4ANYXNgcHoxUADRbyXCqMRAiRWHT2CyKN5iZSmZSbKyFCxaERraQg2oeACOAFduIQ-GQAGacbAAW2h1wovNInFgAAtERFkdd+og6VJSrIxIptlTlNplCTNbkqdIKflFgDJIyMIc2RyuaReQKhb1-NDSH4wAFpVdevL4iJPprpDYGJJSlY1lY3j6GLgtlsDap5GMyooze48JaUJyeXzBcK-E6XW6xGEkVFPbd4vdRuNtJMXnNDMYycsFNJflNtPIAaVnC4QKRiBA4PxQdgurLS2jhGqrFGdiJKso6Q5xm8hOsZ4H5CtCjNlKNk4cGmQwKOS6iBMIydIZxZ54urMv6wgRFfdwp56V46TVfuwV5Gi0TxRG4J3iCRA1yLY1REBgLHjMZpBJRQRGGJDtGfORVBDEof1Tdl02tW1s3HGVT2A89smrXA5ymORSXkA0kIQx9SSvMRoOgkp4wcEYcNwUVxQlQC5TLMlTAsZQP0UD45w2RDPhUJRqy2EZoKqbsgA */
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
