// sum.test.js
import { sum } from './sum';

describe('sum function', () => {
  test('adds two positive numbers correctly', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('adds a positive and negative number correctly', () => {
    expect(sum(5, -2)).toBe(3);
  });

  test('adds two negative numbers correctly', () => {
    expect(sum(-3, -7)).toBe(-10);
  });

  test('throws an error when arguments are not numbers', () => {
    expect(() => sum('2', 3)).toThrow('Both arguments must be numbers');
    expect(() => sum(2, undefined)).toThrow('Both arguments must be numbers');
  });
});
