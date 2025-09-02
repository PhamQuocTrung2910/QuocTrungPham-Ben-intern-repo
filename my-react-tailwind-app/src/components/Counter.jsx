import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  selectCounterValue,
  selectCounterCategory,
} from './counterSlice';

export function Counter() {
  const count = useSelector(selectCounterValue);
  const category = useSelector(selectCounterCategory);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  const getCategoryColor = category => {
    switch (category) {
      case 'neutral':
        return '#6B7280';
      case 'low':
        return '#10B981';
      case 'medium':
        return '#F59E0B';
      case 'high':
        return '#EF4444';
      case 'negative-low':
        return '#3B82F6';
      case 'negative-high':
        return '#8B5CF6';
      default:
        return '#6B7280';
    }
  };

  const buttonStyle = {
    margin: '0 8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: '#3B82F6',
    color: 'white',
  };

  const inputStyle = {
    margin: '0 8px',
    padding: '8px 12px',
    fontSize: '16px',
    border: '2px solid #E5E7EB',
    borderRadius: '6px',
    width: '120px',
    textAlign: 'center',
    backgroundColor: '#000000',
  };

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '30px',
        border: '2px solid #E5E7EB',
        margin: '20px auto',
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
      }}
    >
      <h2
        style={{
          margin: '0 0 30px 0',
          fontSize: '24px',
          fontWeight: '700',
          color: '#1F2937',
        }}
      >
        Redux Counter Control
      </h2>

      <div
        style={{
          fontSize: '72px',
          margin: '30px 0',
          color: getCategoryColor(category),
          fontWeight: '800',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {count}
      </div>

      <div style={{ marginBottom: '25px' }}>
        <button
          onClick={() => dispatch(increment())}
          style={{
            ...buttonStyle,
            backgroundColor: '#10B981',
            fontSize: '20px',
            width: '65px',
            height: '55px',
            borderRadius: '50%',
          }}
        >
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          style={{
            ...buttonStyle,
            backgroundColor: '#EF4444',
            fontSize: '20px',
            width: '65px',
            height: '55px',
            borderRadius: '50%',
            marginRight: '20px',
          }}
        >
          −
        </button>
      </div>

      <div
        style={{
          marginBottom: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <input
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
          style={inputStyle}
          placeholder="Amount"
        />
        <button
          onClick={() => dispatch(incrementByAmount(incrementValue))}
          style={{
            ...buttonStyle,
            backgroundColor: '#8B5CF6',
          }}
        >
          Add Amount
        </button>
      </div>

      <div>
        <button
          onClick={() => dispatch(reset())}
          style={{
            ...buttonStyle,
            backgroundColor: '#6B7280',
            padding: '12px 32px',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
