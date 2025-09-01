import { useState, useCallback, memo } from 'react';

// Child component wrapped with React.memo to prevent unnecessary re-renders
const TaskItem = memo(({ task, onToggle, onDelete }) => {
  const renderTime = new Date().toLocaleTimeString();

  // Log when this component renders
  console.log(`🔄 TaskItem &quot;${task.text}&quot; rendered at ${renderTime}`);

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4"
        />
        <span
          className={`${task.completed ? 'line-through text-gray-500' : 'text-black'} font-medium`}
        >
          {task.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
      >
        Delete
      </button>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';

// Another child component to show selective re-rendering
const TaskStats = memo(({ total, completed, pending }) => {
  const renderTime = new Date().toLocaleTimeString();
  console.log(`📊 TaskStats rendered at ${renderTime}`);

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="font-semibold text-black mb-2">Task Statistics</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="text-black">
          <div className="text-2xl font-bold text-blue-600">{total}</div>
          <div className="text-sm">Total</div>
        </div>
        <div className="text-black">
          <div className="text-2xl font-bold text-green-600">{completed}</div>
          <div className="text-sm">Completed</div>
        </div>
        <div className="text-black">
          <div className="text-2xl font-bold text-orange-600">{pending}</div>
          <div className="text-sm">Pending</div>
        </div>
      </div>
    </div>
  );
});

TaskStats.displayName = 'TaskStats';

// Main parent component
const CallbackDemo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Master useCallback', completed: false },
    { id: 3, text: 'Build awesome apps', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');
  const [parentRenderCount, setParentRenderCount] = useState(0);

  // Force parent re-render for demonstration
  const forceRerender = () => {
    setParentRenderCount(prev => prev + 1);
  };

  // WITH useCallback - this function is memoized
  const handleToggle = useCallback(id => {
    console.log(`🔄 Toggle function called for task ${id}`);
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []); // No dependencies needed because we use functional state update

  // WITH useCallback - memoized delete function
  const handleDelete = useCallback(id => {
    console.log(`🗑️ Delete function called for task ${id}`);
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }, []);

  // Add new task (NOT memoized to show the difference)
  const addTask = () => {
    if (newTask.trim()) {
      const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
      setTasks(prev => [
        ...prev,
        { id: newId, text: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };

  // Handle Enter key press for adding tasks
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Calculate stats
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  console.log(
    `🏠 Parent CallbackDemo rendered (count: ${parentRenderCount + 1})`
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        useCallback Demo
      </h2>

      {/* Performance Info */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-black mb-2">
          🔧 Performance Testing
        </h3>
        <button
          onClick={forceRerender}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
        >
          Force Parent Re-render ({parentRenderCount})
        </button>
        <p className="text-black text-sm mt-2">
          <strong>Check console:</strong> Child components with useCallback
          won&apos;t re-render when parent re-renders!
        </p>
      </div>

      {/* Add Task Form */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="mb-6">
        <TaskStats total={total} completed={completed} pending={pending} />
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-black">Tasks</h3>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* React DevTools Instructions */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-black mb-2">
          🔍 Using React DevTools to Confirm Re-renders:
        </h4>
        <div className="space-y-3 text-black text-sm">
          <div>
            <strong>Step 1: Install React DevTools</strong>
            <p>
              Install the React Developer Tools browser extension from Chrome
              Web Store or Firefox Add-ons
            </p>
          </div>

          <div>
            <strong>Step 2: Enable Render Highlighting</strong>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Open browser DevTools (F12)</li>
              <li>Go to &quot;Components&quot; tab (React DevTools)</li>
              <li>Click the gear icon (⚙️) in the top right</li>
              <li>
                Check &quot;Highlight updates when components render&quot;
              </li>
            </ol>
          </div>

          <div>
            <strong>Step 3: Test the Optimization</strong>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>
                With highlighting enabled, click &quot;Force Parent
                Re-render&quot;
              </li>
              <li>You should see ONLY the parent component flash/highlight</li>
              <li>TaskItem and TaskStats components should NOT highlight</li>
              <li>
                Now toggle a task - only that specific TaskItem will highlight
              </li>
              <li>
                Add a new task - all components will highlight (expected
                behavior)
              </li>
            </ol>
          </div>

          <div className="p-3 bg-blue-100 rounded border border-blue-300">
            <strong>💡 What to Look For:</strong>
            <p>
              Components that re-render will be highlighted with a colored
              border. With useCallback working correctly, child components
              won&apos;t highlight when you force parent re-renders!
            </p>
          </div>
        </div>
      </div>

      {/* Console Testing */}
      <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h4 className="font-semibold text-black mb-2">
          🖥️ Console Testing (Alternative Method):
        </h4>
        <ol className="text-black text-sm space-y-1 list-decimal list-inside">
          <li>Open browser console to see render logs</li>
          <li>
            Click &quot;Force Parent Re-render&quot; - only parent log appears
          </li>
          <li>Toggle tasks - see specific TaskItem logs</li>
          <li>Notice how useCallback prevents unnecessary child re-renders</li>
        </ol>
      </div>
    </div>
  );
};

export default CallbackDemo;
