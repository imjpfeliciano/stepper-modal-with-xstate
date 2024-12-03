import React from "react";
import "./App.css";
import Stepper from "./components/Stepper";
import ConfirmationState from "./components/steps/confirmation";
import StepOne from "./components/steps/step_one";
import StepTwo from "./components/steps/step_two";
import SuccessState from "./components/steps/success_state";
import { NavigationSteps } from "./constants/navigationConfig";

const StepConfig = {
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

const stepMap = {
  [NavigationSteps.INITIAL_STEP]: (props) => <StepOne {...props} />,
  [NavigationSteps.SECOND_STEP]: (props) => <StepTwo {...props} />,
  [NavigationSteps.QUIT_CONFIRMATION_STEP]: (props) => (
    <ConfirmationState {...props} />
  ),
  [NavigationSteps.FINISH]: (props) => <SuccessState {...props} />,
};

// Replace finish state with modal open, closed
// if state from xstate context is closed, then show the button, else show the modal
function App() {
  const [showModal, setShowModal] = React.useState(false);

  const onFinish = () => {
    console.log("Finish, closing modals");
    setShowModal(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!showModal && (
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Open Modal
          </button>
        )}
        {showModal && (
          <Stepper config={StepConfig} mapper={stepMap} onFinish={onFinish} />
        )}
      </header>
    </div>
  );
}

export default App;
