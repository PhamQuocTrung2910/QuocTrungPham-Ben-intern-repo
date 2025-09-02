import { useState } from 'react';

const CounterDemo = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Counter</h2>

      <div className="text-6xl font-bold text-blue-600 mb-6 font-mono">
        {count}
      </div>

      <button
        onClick={increment}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Increment
      </button>
    </div>
  );
};

export default CounterDemo;
