import { useState, useEffect } from 'react';

const LifecycleDemo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);

  // Function to add logs with timestamp
  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prevLogs => [...prevLogs, `[${timestamp}] ${message}`]);
  };

  // useEffect for mount/unmount logging and cleanup
  useEffect(() => {
    // Mount log
    console.log('Component mounted');
    addLog('Component mounted');

    // Cleanup function (runs on unmount)
    return () => {
      console.log('Component unmounted');
      addLog('Component unmounted - cleanup executed');
    };
  }, []); // Empty dependency array means this runs once on mount

  // API fetch function
  const fetchData = async () => {
    // Abort controller for cleanup
    const abortController = new AbortController();

    setLoading(true);
    setError(null);
    addLog('Starting API fetch...');

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          signal: abortController.signal,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      addLog('API fetch successful');
      console.log('Data fetched:', result);
    } catch (err) {
      if (err.name === 'AbortError') {
        addLog('API fetch was cancelled');
        console.log('Fetch aborted');
      } else {
        setError(err.message);
        addLog(`API fetch failed: ${err.message}`);
        console.error('Fetch error:', err);
      }
    } finally {
      setLoading(false);
    }

    // Cleanup function for this specific fetch
    return () => {
      abortController.abort();
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Lifecycle Demo Component
      </h2>

      {/* API Fetch Section */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          API Data Fetching
        </h3>

        <button
          onClick={fetchData}
          disabled={loading}
          className={`px-6 py-3 font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg ${
            loading
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? 'Fetching...' : 'Fetch Data from API'}
        </button>

        {/* Display fetched data */}
        {data && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-black mb-2">Fetched Data:</h4>
            <p className="text-black">
              <strong>Title:</strong> {data.title}
            </p>
            <p className="text-black">
              <strong>Body:</strong> {data.body}
            </p>
          </div>
        )}

        {/* Display error */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-black mb-2">Error:</h4>
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Logs Section */}
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Component Logs
        </h3>
        <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-60 overflow-y-auto">
          {logs.length === 0 ? (
            <p>No logs yet...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
        <p className="text-gray-600 text-sm mt-2">
          Check browser console for additional logs
        </p>
      </div>
    </div>
  );
};

export default LifecycleDemo;
