import React from 'react'
import { useLocation } from 'react-router-dom'

const Stepper = ({ steps }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define a mapping from URL paths to step indices
  // This ensures the stepper highlights correctly based on the route
  const stepPaths = {
    '/shop': 0,
    '/cart': 1,
    '/checkout': 2,
    '/review-order': 3,
  };

  // Determine the index of the active step based on the current path
  const activeStepIndex = stepPaths[currentPath] !== undefined ? stepPaths[currentPath] : -1;

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mx-auto max-w-4xl mt-4 mb-8 flex justify-center items-center">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Individual Step Circle and Text */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300
                  ${index <= activeStepIndex ? 'bg-amber-700' : 'bg-gray-300'}
                `}
              >
                {index + 1} {/* Display step number */}
              </div>
              <div
                className={`mt-2 text-sm text-center transition-colors duration-300 whitespace-nowrap
                  ${index <= activeStepIndex ? 'text-amber-800 font-semibold' : 'text-gray-500'}
                `}
              >
                {step} {/* Display step name */}
              </div>
            </div>
            {/* Connecting Line between steps */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-colors duration-300
                  ${index < activeStepIndex ? 'bg-amber-700' : 'bg-gray-300'}
                `}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
