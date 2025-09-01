import { useState } from 'react';

const SimpleForm = () => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      setItems([...items, inputText]);
      setInputText('');
    }
  };

  const handleInputChange = e => {
    setInputText(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Simple Form
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter some text..."
            className="flex-1 px-3 py-2 border border-gray-300  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Add
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Items List:
        </h3>
        {items.length === 0 ? (
          <p className="text-gray-500 italic">No items yet. Add some above!</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SimpleForm;
