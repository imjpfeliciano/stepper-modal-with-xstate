interface SuccessStateProps {
  onFinish: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ onFinish }) => {
  return (
    <div className="flex flex-col border rounded gap-2 p-4">
      <p className="text-xl">
        Thank you for reach the end of the stepper modal
      </p>

      <div className="flex flex-row justify-center items-center">
        <button
          className="p-2 border rounded hover:bg-gray-100 max-w-[200px]"
          onClick={onFinish}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default SuccessState;
