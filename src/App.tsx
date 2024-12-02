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
      next: NavigationSteps.SUCCESS_STEP,
      close: NavigationSteps.QUIT_CONFIRMATION_STEP,
    },
    [NavigationSteps.SUCCESS_STEP]: {
      next: NavigationSteps.FINISH, // Got it button
      close: NavigationSteps.FINISH, // Close button
    },
    [NavigationSteps.QUIT_CONFIRMATION_STEP]: {
      next: NavigationSteps.FINISH, // Yes button
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
