// import Header from "./stepper_header";

interface QuitConfirmationProps {
  actor: any;
}

const StepTwo: React.FC<QuitConfirmationProps> = ({ actor }) => {
  const handleClick = (event: string) => {
    console.log({ event });
    actor.send({ type: event });
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center border w-full p-4 rounded">
      <p className="text-2xl">
        Are you sure you want to quit? You will lose all the information you
        have entered.
      </p>
      <div className="flex flex-row gap-2">
        <button
          className="p-2 border rounded hover:bg-gray-100"
          onClick={() => handleClick("cancel")}
        >
          No, Go back
        </button>
        <button
          className="p-2 border rounded hover:bg-red-900 bg-red-500 text-white"
          onClick={() => handleClick("finish")}
        >
          Quit
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
