import Header from "./stepper_header";

interface StepTwoProps {
  actor: any;
}

const StepTwo: React.FC<StepTwoProps> = ({ actor }) => {
  const handleClick = (event: string) => {
    console.log({ event });
    actor.send({ type: event });
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center border w-full p-4 rounded">
      <Header currentStep={2} totalSteps={3} />
      <p>Step 2</p>
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

export default StepTwo;
