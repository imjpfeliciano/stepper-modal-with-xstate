export enum NavigationSteps {
  INITIAL_STEP = "step_one",
  SECOND_STEP = "step_two",
  SUCCESS_STEP = "success",
  QUIT_CONFIRMATION_STEP = "quit_confirmation",
  FINISH = "finish",
}

export const StepConfig = {
  initial: NavigationSteps.INITIAL_STEP,
  navigation: {
    [NavigationSteps.INITIAL_STEP]: {
      next: NavigationSteps.SECOND_STEP,
      cancel: NavigationSteps.QUIT_CONFIRMATION_STEP,
    },
    [NavigationSteps.SECOND_STEP]: {
      back: NavigationSteps.INITIAL_STEP, // back button
      next: NavigationSteps.SUCCESS_STEP,
      cancel: NavigationSteps.QUIT_CONFIRMATION_STEP, // close button
    },
    [NavigationSteps.SUCCESS_STEP]: {
      next: NavigationSteps.FINISH, // Got it button
      cancel: NavigationSteps.FINISH, // Close button
    },
    [NavigationSteps.QUIT_CONFIRMATION_STEP]: {
      next: NavigationSteps.FINISH, // Yes button
    },
  },
};
