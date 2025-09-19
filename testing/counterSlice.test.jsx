import { configureStore } from '@reduxjs/toolkit';
import reducer, { increment, decrement, incrementAsync } from './counterSlice';

describe('counter reducer', () => {
  const initialState = { value: 0 };

  it('should handle increment', () => {
    const nextState = reducer(initialState, increment());
    expect(nextState.value).toBe(1);
  });

  it('should handle decrement', () => {
    const nextState = reducer({ value: 1 }, decrement());
    expect(nextState.value).toBe(0);
  });
});

describe('async counter actions', () => {
  it('should handle incrementAsync', async () => {
    // Create a store using the counter reducer
    const store = configureStore({ reducer });

    // Dispatch the async action with a payload of 5
    await store.dispatch(incrementAsync(5));

    // Check the state after the async action resolves
    const state = store.getState();
    expect(state.value).toBe(5);
  });
});
