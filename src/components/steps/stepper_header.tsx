interface StepperHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const Header: React.FC<StepperHeaderProps> = ({ currentStep, totalSteps }) => (
  <div className="flex flex-row justify-between w-full">
    <div className="flex flex-col gap-2">
      <p>
        Step {currentStep} / {totalSteps}
      </p>
    </div>
    <button className="hover:bg-gray-100 hover:border hover:rounded-full h-8 w-8">
      X
    </button>
  </div>
);

export default Header;