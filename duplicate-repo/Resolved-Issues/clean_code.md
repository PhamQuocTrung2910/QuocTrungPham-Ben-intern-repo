1. Research and summarize the following clean code principles in clean_code.md:

- Simplicity: Keep code as simple as possible. Avoid unnecessary complexity or features that aren’t required. Simple code is easier to debug, test, and maintain.

- Readability: Code should be easy to understand for yourself and others. Use descriptive variable and function names, proper indentation, and meaningful comments where needed.

- Maintainability: Ensure that future developers can easily work with the code. Structure code modularly, avoid duplication, and document assumptions or tricky logic.

- Consistency: Follow style guides, naming conventions, and patterns throughout the project. Consistent code reduces cognitive load and avoids errors.

- Efficiency: Write performant code without premature optimization. Avoid unnecessary loops, redundant calculations, or memory-intensive operations, but don’t overcomplicate for micro-optimizations early.

2. Find an example of messy code online (or write one yourself) and describe why it's difficult to read.

```python
def c(l):
    r=0
    for i in l:
        if i%2==0:r+=i
    return r
print(c([1,2,3,4,5,6]))
```

- Why it’s difficult to read:
  - Single-letter variable names (c, l, r) provide no context.
  - Inline if statement makes the logic hard to scan.
  - No comments or explanation of the function’s purpose.

3. Rewrite the code in a cleaner, more structured way.

```python
def sum_even_numbers(numbers):
    """
    Returns the sum of all even numbers in the provided list.

    Parameters:
        numbers (list of int): List of integers to evaluate.

    Returns:
        int: Sum of even numbers.
    """
    total = 0
    for number in numbers:
        if number % 2 == 0:
            total += number
    return total

# Example usage
sample_numbers = [1, 2, 3, 4, 5, 6]
print(sum_even_numbers(sample_numbers))

```

Improvements:

Function and variable names are descriptive.

Added a docstring explaining the function.

Logic is easier to read with proper formatting.

Supports maintainability and clarity for future developers.
