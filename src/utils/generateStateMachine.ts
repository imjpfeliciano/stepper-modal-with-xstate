import { createMachine, assign } from "xstate";
import { NavigationSteps } from "../constants/navigationConfig";

export const generateStateMachine = (stepConfig) => {
  const { initial, navigation } = stepConfig;

  const generateStates = (navigation) => {
    const states = {};

    for (const [step, transitions] of Object.entries(navigation)) {
      const stateConfig = { on: {} };

      for (const [event, target] of Object.entries(transitions)) {
        if (
          event === "close" &&
          target === NavigationSteps.QUIT_CONFIRMATION_STEP
        ) {
          stateConfig.on[event] = {
            target: NavigationSteps.QUIT_CONFIRMATION_STEP,
            actions: assign({ previousStep: () => step }),
          };
        } else {
          stateConfig.on[event] = target;
        }
      }

      states[step] = stateConfig;
    }

    // Adding the QUIT_CONFIRMATION_STEP with cancel logic
    states[NavigationSteps.QUIT_CONFIRMATION_STEP] = {
      on: {
        next: NavigationSteps.FINISH,
        cancel: [
          {
            target: (context) =>
              context.previousStep || NavigationSteps.INITIAL_STEP, // Default to INITIAL_STEP if no previousStep
            guard: ({ context }) => !!context.previousStep, // Ensure there's a previous step before redirecting
          },
        ],
      },
    };

    // Final state
    states[NavigationSteps.FINISH] = { type: "final" };

    return states;
  };

  // Create the machine using the states generated dynamically
  return createMachine({
    id: "stepper",
    initial,
    context: {
      previousStep: null, // To store the step from which quit_confirmation was entered
    },
    states: generateStates(navigation),
  });
};
