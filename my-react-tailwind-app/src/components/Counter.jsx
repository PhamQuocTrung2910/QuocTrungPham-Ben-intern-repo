import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from './counterSlice';

export function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        margin: '20px',
      }}
    >
      <h2>Redux Counter</h2>
      <div style={{ fontSize: '48px', margin: '20px 0' }}>
        <span>{count}</span>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => dispatch(increment())}
          style={{ margin: '0 5px', padding: '10px 20px' }}
        >
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          style={{ margin: '0 5px', padding: '10px 20px' }}
        >
          -
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
          style={{ margin: '0 5px', padding: '5px' }}
        />
        <button
          onClick={() => dispatch(incrementByAmount(incrementValue))}
          style={{ margin: '0 5px', padding: '10px 20px' }}
        >
          Add Amount
        </button>
      </div>

      <div>
        <button
          onClick={() => dispatch(reset())}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
