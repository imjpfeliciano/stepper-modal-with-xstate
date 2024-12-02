// import { createMachine } from "xstate";
import { StepperProps } from "../components/Stepper";

// Takes the initial configuration and builds the configuration for a state machine using xstate
// on each step, we need to know which is the current step, so if we are in step 1 and we click on cancel, we need to go to the cancel state
// if we are in step 2 and we click on cancel, and then we click on back, we need to go back to step 1
export const buildConfiguration = (config: StepperProps["config"]) => {
  const states = Object.keys(config.navigation);
  const machine = {
    context: {
      currentStep: config.initial,
    },
    states: {},
    initial: config.initial,
    actions: {
      setCurrentStep: (context, event) => {
        context.currentStep = event.target;
      },
      goToPrevStep: (context, event) => {
        context.currentStep = config.navigation[context.currentStep].back;
      },
    },
  };
  states.forEach((state) => {
    // for each state passed as a configuration, we want to create a state in the machine
    machine.states[state] = {
      on: {
        // When the user clicks on the next button, we want to go to the next state
        // but also we want to update the current step in the context
        next: {
          target: config.navigation[state].next,
          actions: ["setCurrentStep"],
        },
        // When the user clicks on the cancel button, we want to go to the cancel state
        // no need to update the current step in case of cancel
        cancel: config.navigation[state].cancel,

        // If we are on initial state, we don't have a back button to go back
        // so we need to check if the state has a back button to go back
        ...(config.navigation[state].back && {
          back: {
            target: config.navigation[state].back,
            actions: ["setCurrentStep"],
          },
        }),
      },
    };
  });

  // Append additional states to the machine for:
  // - back: If the user clicks on the back button, we need to go back to the previous step from the context
  // back step is only a transition between the confirmation state and the previous step
  // machine.states["PREV_STEP"] = {};

  // // - finish: If the user clicks on the finish button, we need to go to the finish state and close the stepper
  // machine.states["FINISH"] = {
  //   type: "final",
  // };

  console.log({ machine });
  return machine;
};
