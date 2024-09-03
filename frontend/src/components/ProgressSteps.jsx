import clsx from 'clsx';

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-12">
      <div className={clsx(step1 ? "text-green-500" : "text-gray-300")}>
        <span className="ml-2">Login</span>
        <div className="mt-2 text-lg text-center">✅</div>
      </div>

      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-24 bg-green-500"></div>}
          <div className={clsx(step2 ? "text-green-500" : "text-gray-300")}>
            <span>Shipping</span>
            <div className="mt-2 text-lg text-center">✅</div>
          </div>
        </>
      )}

      {step3 && (
        <>
          {step1 && step2 && <div className="h-0.5 w-24 bg-green-500"></div>}
          <div className={clsx(step3 ? "text-green-500" : "text-gray-300")}>
            <span className={clsx(!step3 && "ml-24")}>Summary</span>
            {step1 && step2 && step3 && (
              <div className="mt-2 text-lg text-center">✅</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressSteps;
