import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: state => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

// Selector functions
export const selectCounterValue = state => state.counter.value;
export const selectIsPositive = state => state.counter.value > 0;
export const selectIsNegative = state => state.counter.value < 0;
export const selectIsZero = state => state.counter.value === 0;
export const selectAbsoluteValue = state => Math.abs(state.counter.value);
export const selectCounterCategory = state => {
  const value = state.counter.value;
  if (value === 0) return 'neutral';
  if (value > 0 && value <= 10) return 'low';
  if (value > 10 && value <= 50) return 'medium';
  if (value > 50) return 'high';
  if (value < 0 && value >= -10) return 'negative-low';
  if (value < -10) return 'negative-high';
};

export default counterSlice.reducer;
