const HelloWorld = ({ name = 'Focus Bear' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Hello, {name}!
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome to your React component with Tailwind CSS!
        </p>
      </div>
    </div>
  );
};

export default HelloWorld;
