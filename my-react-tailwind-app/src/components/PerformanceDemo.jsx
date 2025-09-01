import { useState, useMemo } from 'react';

const PerformanceDemo = () => {
  const [listSize, setListSize] = useState(1000);
  const [filter, setFilter] = useState('all');
  const [counter, setCounter] = useState(0);
  const [calculationLogs, setCalculationLogs] = useState([]);

  // Function to add calculation logs
  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setCalculationLogs(prev => [
      ...prev.slice(-4),
      `[${timestamp}] ${message}`,
    ]);
  };

  // Generate large list of numbers - this is expensive!
  const numbers = useMemo(() => {
    const start = performance.now();
    addLog(`Generating list of ${listSize} numbers...`);

    const list = Array.from({ length: listSize }, (_, i) => ({
      id: i + 1,
      value: Math.floor(Math.random() * 1000),
      isPrime: isPrime(i + 1),
    }));

    const end = performance.now();
    addLog(`List generation completed in ${(end - start).toFixed(2)}ms`);
    return list;
  }, [listSize]); // Only regenerates when listSize changes

  // Expensive calculation - find primes, sum, averages
  const expensiveCalculation = useMemo(() => {
    const start = performance.now();
    addLog('Starting expensive calculations...');

    // Filter based on current filter
    let filteredNumbers = numbers;
    if (filter === 'even') {
      filteredNumbers = numbers.filter(num => num.value % 2 === 0);
    } else if (filter === 'odd') {
      filteredNumbers = numbers.filter(num => num.value % 2 !== 0);
    } else if (filter === 'primes') {
      filteredNumbers = numbers.filter(num => num.isPrime);
    }

    // Expensive calculations
    const sum = filteredNumbers.reduce((acc, num) => acc + num.value, 0);
    const average =
      filteredNumbers.length > 0 ? sum / filteredNumbers.length : 0;
    const max =
      filteredNumbers.length > 0
        ? Math.max(...filteredNumbers.map(n => n.value))
        : 0;
    const min =
      filteredNumbers.length > 0
        ? Math.min(...filteredNumbers.map(n => n.value))
        : 0;

    // Simulate more expensive work
    const primeCount = filteredNumbers.filter(num => num.isPrime).length;

    const end = performance.now();
    addLog(`Calculations completed in ${(end - start).toFixed(2)}ms`);

    return {
      count: filteredNumbers.length,
      sum,
      average: average.toFixed(2),
      max,
      min,
      primeCount,
      list: filteredNumbers,
    };
  }, [numbers, filter]); // Only recalculates when numbers or filter changes

  // Helper function to check if number is prime
  function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Performance Demo with useMemo
      </h2>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            List Size:
          </label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={listSize}
            onChange={e => setListSize(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-black text-sm">{listSize} numbers</span>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Filter:
          </label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            <option value="all">All Numbers</option>
            <option value="even">Even Numbers</option>
            <option value="odd">Odd Numbers</option>
            <option value="primes">Prime Numbers</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Test Re-renders:
          </label>
          <button
            onClick={() => setCounter(counter + 1)}
            className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-md transition-colors duration-200"
          >
            Re-render ({counter})
          </button>
        </div>
      </div>

      {/* Calculation Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-black mb-3">
            Calculation Results
          </h3>
          <div className="space-y-2 text-black">
            <p>
              <strong>Filtered Count:</strong>{' '}
              {expensiveCalculation.count.toLocaleString()}
            </p>
            <p>
              <strong>Sum:</strong> {expensiveCalculation.sum.toLocaleString()}
            </p>
            <p>
              <strong>Average:</strong> {expensiveCalculation.average}
            </p>
            <p>
              <strong>Max:</strong> {expensiveCalculation.max}
            </p>
            <p>
              <strong>Min:</strong> {expensiveCalculation.min}
            </p>
            <p>
              <strong>Prime Count:</strong> {expensiveCalculation.primeCount}
            </p>
          </div>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-black mb-3">
            Performance Logs
          </h3>
          <div className="bg-black text-green-400 p-3 rounded font-mono text-xs max-h-32 overflow-y-auto">
            {calculationLogs.length === 0 ? (
              <p>No calculations yet...</p>
            ) : (
              calculationLogs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Numbers List */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-black mb-3">
          Numbers List ({filter} - showing first 50)
        </h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 max-h-60 overflow-y-auto">
          {expensiveCalculation.list.slice(0, 50).map(num => (
            <div
              key={num.id}
              className={`p-2 text-center text-sm rounded ${
                num.isPrime
                  ? 'bg-red-200 text-red-800 font-bold'
                  : num.value % 2 === 0
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-gray-200 text-gray-800'
              }`}
            >
              {num.value}
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-sm mt-2">
          Red = Prime, Blue = Even, Gray = Odd
        </p>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-semibold text-black mb-2">🧠 Performance Notes:</h4>
        <ul className="text-black text-sm space-y-1">
          <li>
            • <strong>useMemo</strong> prevents recalculation when you click
            &quot;Re-render&quot;
          </li>
          <li>• Calculations only run when list size or filter changes</li>
          <li>
            • Check the performance logs to see when expensive operations run
          </li>
          <li>
            • Try changing the filter vs clicking re-render to see the
            difference!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceDemo;
