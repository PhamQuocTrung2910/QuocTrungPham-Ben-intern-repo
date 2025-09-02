import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCounterValue,
  selectIsPositive,
  selectIsNegative,
  selectIsZero,
  selectAbsoluteValue,
  selectCounterCategory,
} from './counterSlice';

export function CounterDisplay() {
  const count = useSelector(selectCounterValue);
  const isPositive = useSelector(selectIsPositive);
  const isNegative = useSelector(selectIsNegative);
  const isZero = useSelector(selectIsZero);
  const absoluteValue = useSelector(selectAbsoluteValue);
  const category = useSelector(selectCounterCategory);

  const getMessage = () => {
    if (isZero) return "🎯 Perfect balance! You're at zero.";
    if (isPositive && count <= 5) return '🌱 Just getting started! Keep going!';
    if (isPositive && count <= 15)
      return "📈 Nice progress! You're building momentum.";
    if (isPositive && count <= 30)
      return "🚀 Great work! You're really climbing!";
    if (isPositive && count <= 50)
      return "⭐ Excellent! You're in the high zone!";
    if (isPositive && count > 50)
      return "🏆 LEGENDARY! You've reached the stratosphere!";
    if (isNegative && count >= -5)
      return '🤔 Going negative, but not too deep.';
    if (isNegative && count >= -15)
      return '📉 Heading downward... time to reverse?';
    if (isNegative && count < -15)
      return '⚠️ Deep in negative territory! Recovery mode?';
    return '🤷 Something unusual is happening...';
  };

  const getStatusColor = () => {
    if (isZero) return '#6B7280';
    if (isPositive && count <= 10) return '#10B981';
    if (isPositive && count <= 30) return '#F59E0B';
    if (isPositive) return '#EF4444';
    return '#3B82F6';
  };

  return (
    <div
      style={{
        padding: '25px',
        border: '2px solid #E5E7EB',
        margin: '20px auto',
        borderRadius: '12px',
        backgroundColor: '#F8FAFC',
        maxWidth: '500px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <h3
        style={{
          margin: '0 0 20px 0',
          fontSize: '20px',
          fontWeight: '600',
          color: '#1F2937',
          textAlign: 'center',
        }}
      >
        📊 Counter Status Display
      </h3>

      <div
        style={{
          fontSize: '28px',
          fontWeight: '700',
          color: getStatusColor(),
          marginBottom: '20px',
          textAlign: 'center',
          padding: '15px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: `2px solid ${getStatusColor()}20`,
        }}
      >
        Current Value: {count}
      </div>

      <div
        style={{
          fontSize: '18px',
          marginBottom: '20px',
          fontStyle: 'italic',
          textAlign: 'center',
          color: '#4B5563',
          padding: '15px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
        }}
      >
        {getMessage()}
      </div>

      <div
        style={{
          fontSize: '14px',
          color: '#6B7280',
          backgroundColor: '#FFFFFF',
          padding: '15px',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            fontWeight: '600',
            marginBottom: '10px',
            fontSize: '16px',
            color: '#374151',
          }}
        >
          📈 Statistics:
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
          }}
        >
          <div>
            • Absolute Value: <strong>{absoluteValue}</strong>
          </div>
          <div>
            • Category:{' '}
            <strong style={{ color: getStatusColor() }}>{category}</strong>
          </div>
          <div>
            • Sign:{' '}
            <strong>
              {isPositive
                ? 'Positive ➕'
                : isNegative
                  ? 'Negative ➖'
                  : 'Zero 0️⃣'}
            </strong>
          </div>
          <div>
            • Range:{' '}
            <strong>
              {absoluteValue < 10
                ? 'Small'
                : absoluteValue < 50
                  ? 'Medium'
                  : 'Large'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
