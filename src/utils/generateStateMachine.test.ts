import { describe, it, expect } from "vitest";
import { createActor } from "xstate";
import { generateStateMachine } from "./generateStateMachine";

import { NavigationSteps } from "../constants/navigationConfig";

const StepConfig = {
  initial: NavigationSteps.INITIAL_STEP,
  navigation: {
    [NavigationSteps.INITIAL_STEP]: {
      next: NavigationSteps.SECOND_STEP,
      close: NavigationSteps.QUIT_CONFIRMATION_STEP,
    },
    [NavigationSteps.SECOND_STEP]: {
      back: NavigationSteps.INITIAL_STEP,
      next: NavigationSteps.SUCCESS_STEP,
      close: NavigationSteps.QUIT_CONFIRMATION_STEP,
    },
    [NavigationSteps.SUCCESS_STEP]: {
      next: NavigationSteps.FINISH,
      close: NavigationSteps.FINISH,
    },
    [NavigationSteps.QUIT_CONFIRMATION_STEP]: {
      next: NavigationSteps.FINISH,
    },
  },
};

describe("generateStateMachine", () => {
  it("should generate a state machine", () => {
    const stepperMachine = generateStateMachine(StepConfig);

    // Test if the initial state is correct
    const service = createActor(stepperMachine).start();
    expect(service.getSnapshot().value).toBe(StepConfig.initial);

    // Test if the 'next' transition works and moves from initial to second_step
    service.send({ type: "next" });
    expect(service.getSnapshot().value).toBe(NavigationSteps.SECOND_STEP);
  });

  it("should handle the 'close' event", () => {
    const stepperMachine = generateStateMachine(StepConfig);

    const service = createActor(stepperMachine).start();
    service.send({ type: "close" });
    expect(service.getSnapshot().value).toBe(
      NavigationSteps.QUIT_CONFIRMATION_STEP
    );
  });

  it("should transition to finish following the happy path", () => {
    const stepperMachine = generateStateMachine(StepConfig);

    const service = createActor(stepperMachine).start();
    service.send({ type: "next" });
    service.send({ type: "next" });
    service.send({ type: "next" });

    expect(service.getSnapshot().value).toBe(NavigationSteps.FINISH);
  });

  it("should handle the back event", () => {
    const stepperMachine = generateStateMachine(StepConfig);

    const service = createActor(stepperMachine).start();
    service.send({ type: "next" });
    service.send({ type: "back" });

    expect(service.getSnapshot().value).toBe(NavigationSteps.INITIAL_STEP);
  });

  it("should handle 'cancel' action from QUIT_CONFIRMATION_STEP and return to prev step", () => {
    const stepperMachine = generateStateMachine(StepConfig);

    const service = createActor(stepperMachine).start();
    service.send({ type: "close" });
    service.send({ type: "cancel" });
    expect(service.getSnapshot().value).toBe(NavigationSteps.INITIAL_STEP);
  });

  it('should go to "finish" state from QUIT_CONFIRMATION_STEP', () => {
    const stepperMachine = generateStateMachine(StepConfig);

    const service = createActor(stepperMachine).start();
    service.send({ type: "next" }); // from step_one to step_two
    service.send({ type: "close" }); // from step_two to quit_confirmation
    service.send({ type: "next" }); // from quit_confirmation to finish

    expect(service.getSnapshot().value).toBe(NavigationSteps.FINISH);
  });
});
