// import { buildConfiguration } from "../utils/stateMachineBuilder";
import { stepperMachine } from "../utils/mockMachine";
import { createActor } from "xstate";
import { useSelector } from "@xstate/react";
import { generateStateMachine } from "../utils/generateStateMachine";
import { MockConfig } from "../utils/mockMachine";

export interface StepperProps {
  onFinish: () => void;
  config: {
    initial: string;
    navigation: {
      [key: string]: {
        next: string;
        back?: string;
        cancel: string;
      };
    };
  };
  mapper: Record<string, () => JSX.Element>;
}

export interface StepperRendererProps extends StepperProps {
  stepper: any;
  actor: unknown;
}

const StepperRenderer: React.FC<StepperRendererProps> = ({
  config,
  mapper,
  stepper,
  actor,
  onFinish,
}) => {
  const currentStep = stepper.value ?? config.initial;
  console.log({ currentStep, onFinish });
  const CurrentStepComponent = mapper[currentStep];

  return <CurrentStepComponent actor={actor} onFinish={onFinish} />;
};

const DEBUG_MODE = false;
const machine = DEBUG_MODE ? stepperMachine : generateStateMachine(MockConfig);

let StepperActor = createActor(machine);
StepperActor.start();

const startNewActor = () => {
  StepperActor.stop();
  StepperActor = createActor(machine);
  StepperActor.start();
};

const Stepper: React.FC<StepperProps> = ({ config, mapper, onFinish }) => {
  const stepper = useSelector(StepperActor, (state) => state);

  const handleFinishState = () => {
    onFinish();
    startNewActor();
  };

  return (
    <StepperRenderer
      config={config}
      mapper={mapper}
      stepper={stepper}
      actor={StepperActor}
      onFinish={handleFinishState}
    />
  );
};

export default Stepper;
