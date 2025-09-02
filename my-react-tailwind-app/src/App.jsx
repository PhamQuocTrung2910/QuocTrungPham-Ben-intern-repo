import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import HelloWorld from './components/HelloWorld.jsx';
import CounterDemo from './components/CounterDemo.jsx';
import SimpleForm from './components/SimpleForm.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import LifecycleDemo from './components/LifecycleDemo.jsx';
import PerformanceDemo from './components/PerformanceDemo.jsx';
import CallbackDemo from './components/CallbackDemo.jsx';
import AxiosDemo from './components/AxiosDemo.jsx';
import { Counter } from './components/Counter.jsx';
import { CounterDisplay } from './components/CounterDisplay.jsx';
import { CounterSummary } from './components/CounterSummary.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div
        style={{
          border: '3px solid #10B981',
          padding: '30px',
          margin: '20px auto',
          borderRadius: '16px',
          backgroundColor: '#F0FDF4',
          maxWidth: '600px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            color: '#065F46',
            margin: '0 0 30px 0',
            fontSize: '32px',
            fontWeight: '800',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          🔄 Redux State Management Demo
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Counter />
          <CounterDisplay />
          <CounterSummary />
        </div>
      </div>
      <AxiosDemo />
      <CallbackDemo />
      <PerformanceDemo />
      <LifecycleDemo />
      <HelloWorld />
      <SimpleForm />
      <CounterDemo />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 className="text-blue-500">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
