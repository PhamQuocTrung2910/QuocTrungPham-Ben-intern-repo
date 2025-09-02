import React from 'react';
import { useSelector } from 'react-redux';
import { selectCounterValue, selectCounterCategory } from './counterSlice';

export function CounterSummary() {
  const count = useSelector(selectCounterValue);
  const category = useSelector(selectCounterCategory);

  const getSummaryIcon = () => {
    switch (category) {
      case 'neutral':
        return '⚖️';
      case 'low':
        return '🌿';
      case 'medium':
        return '🔥';
      case 'high':
        return '💫';
      case 'negative-low':
        return '❄️';
      case 'negative-high':
        return '🌀';
      default:
        return '❓';
    }
  };

  const getSummaryMessage = () => {
    switch (category) {
      case 'neutral':
        return 'All balanced and ready to go!';
      case 'low':
        return 'Gentle growth in progress.';
      case 'medium':
        return 'Things are heating up!';
      case 'high':
        return 'Sky-high performance!';
      case 'negative-low':
        return 'Cool and collected in negative space.';
      case 'negative-high':
        return 'Deep dive into negative numbers!';
      default:
        return 'Status unknown.';
    }
  };

  const getCategoryColor = () => {
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

  return (
    <div
      style={{
        padding: '25px',
        border: '2px solid #E5E7EB',
        margin: '20px auto',
        borderRadius: '12px',
        backgroundColor: '#FFFBEB',
        textAlign: 'center',
        maxWidth: '500px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <h4
        style={{
          margin: '0 0 20px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#1F2937',
        }}
      >
        🎪 Quick Summary
      </h4>

      <div
        style={{
          fontSize: '48px',
          margin: '20px 0',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        }}
      >
        {getSummaryIcon()}
      </div>

      <div
        style={{
          fontSize: '20px',
          fontWeight: '700',
          marginBottom: '10px',
          color: getCategoryColor(),
        }}
      >
        Value: {count}
      </div>

      <div
        style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '15px',
          color: '#374151',
          padding: '8px 16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          display: 'inline-block',
          border: `2px solid ${getCategoryColor()}30`,
        }}
      >
        Category: {category}
      </div>

      <div
        style={{
          fontSize: '14px',
          color: '#6B7280',
          fontStyle: 'italic',
          lineHeight: '1.5',
        }}
      >
        {getSummaryMessage()}
      </div>
    </div>
  );
}
