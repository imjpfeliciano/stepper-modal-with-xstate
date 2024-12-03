import { Actor } from "xstate";
import Header from "./stepper_header";

interface StepOneProps {
  actor: Actor<any>;
}

// send -> callback
// state -> lo podemos obtener desde el contexto del actor
// el contexto decide que paso vamos, y del total, dependiendo de la data que tenga guardada
// si el form ya tiene data y navegamos para atras y delante, debemos mantener el estado
const StepOne: React.FC<StepOneProps> = ({ actor }) => {
  const handleClick = (event: string) => {
    // if (actor.getSnapshot().value === "quit_confirmation") {
    // }
    console.log({ event });
    actor.send({ type: event }); // a donde redireccionamos?
  };
  console.log({ actor });
  return (
    <div className="flex flex-col gap-2 items-center justify-center border w-full p-4 rounded">
      <Header
        currentStep={1}
        totalSteps={3}
        onClose={() => {
          handleClick("close");
        }}
      />
      <p>Step 1</p>
      <div className="flex flex-row gap-2">
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
