const sum = require("./sum");

describe("sum function", () => {
  test("adds two positive numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("adds a positive and a negative number", () => {
    expect(sum(5, -3)).toBe(2);
  });

  test("adds two negative numbers", () => {
    expect(sum(-4, -6)).toBe(-10);
  });

  test("adds zero correctly", () => {
    expect(sum(0, 7)).toBe(7);
    expect(sum(0, 0)).toBe(0);
  });

  test("handles floating point numbers", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3); // floating point precision issue
  });

  test("handles large numbers", () => {
    expect(sum(1000000, 2000000)).toBe(3000000);
  });
});
