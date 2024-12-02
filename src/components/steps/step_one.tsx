import { Actor } from "xstate";
import Header from "./stepper_header";

interface StepOneProps {
  actor: Actor<any>;
}

const StepOne: React.FC<StepOneProps> = ({ actor }) => {
  const handleClick = (event: string) => {
    console.log({ event });
    actor.send({ type: event });
  };
  console.log({ actor });
  return (
    <div className="flex flex-col gap-2 items-center justify-center border w-full p-4 rounded">
      <Header currentStep={1} totalSteps={3} />
      <p>Step 1</p>
      <div className="flex flex-row gap-2">
        <button
          className="p-2 border rounded hover:bg-gray-100"
          onClick={() => handleClick("close")}
        >
          cancel
        </button>
        <button
          className="p-2 border rounded hover:bg-gray-100"
          onClick={() => handleClick("next")}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default StepOne;
