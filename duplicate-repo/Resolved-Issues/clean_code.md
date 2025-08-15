📌 Understanding Clean Code Principles

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
- Function and variable names are descriptive.
- Added a docstring explaining the function.
- Logic is easier to read with proper formatting.
- Supports maintainability and clarity for future developers.



📌 Code Formatting & Style Guides

1. Research the importance of consistent code style.

- Readability: Developers can quickly understand the structure and logic of the code. Clear indentation, spacing, and naming conventions allow readers to scan code efficiently.
- Maintainability: Projects often last for years and involve multiple developers. Consistent code makes it easier to modify, extend, or debug without introducing errors.
- Error Detection: Consistent style makes anomalies (like an out-of-place bracket or inconsistent variable usage) more obvious.
- Team Collaboration: When every team member follows the same style guide, there’s less debate over formatting, letting the team focus on functionality.
- Tool Integration: Linters, formatters, and IDE features rely on predictable code formatting to analyze and correct code automatically.
 
2. Review the Airbnb javascript style guide.

- The Airbnb style guide is one of the most popular JavaScript conventions due to the following attributes:
  - Code Consistency: Enforces rules for indentation (2 spaces), semicolons, quotation marks, and spacing.
  - Modern JavaScript: Encourages the use of ES6+ features, arrow functions, const/let, and template literals.
  - Function & Variable Naming: Promotes descriptive names, camelCase for variables and functions, and PascalCase for classes.
  - Readability & Maintainability: Guidelines for consistent formatting of objects, arrays, and function parameters.
  - Error Prevention: Highlights common pitfalls, like unused variables, incorrect comparisons, and unsafe assignments.

3. Install and configure ESLint and Prettier in your development environment & the formatter and linter on your codebase and fix any issues.

- ESLint: Analyzes code for syntax errors, stylistic issues, and potential bugs. Customizable rules allow teams to enforce coding standards.
- Prettier: Automatically formats code, handling indentation, quotes, spacing, and line breaks. It reduces debates about “who formats code correctly.”

4. Why is code formatting important?

- Improves readability: Well-formatted code is easier to scan and debug.
- Reduces cognitive load: Consistent patterns make understanding code faster.
- Supports collaboration: Developers can work on the same codebase without confusion or formatting conflicts.
- Prevents errors: Formatting issues like missing brackets, extra spaces, or misaligned indentation can hide bugs or mislead the logic.
5. What issues did the linter detect?

Linter Currently Doesnt detect any issues as i've not entered the Version of React into its settings as i have not reached the stage where react is relevant.

6. Did formatting the code make it easier to read?

- I have seen the following improvements after formatting the code:

  - Improved Readability: Consistently formatted code is easier to read and understand, reducing the cognitive load for you and your teammates. Clear indentation, spacing, and alignment make it obvious where code blocks begin and end.
  - Easier Collaboration: When everyone follows the same style, developers can focus on logic rather than style disagreements. Pull requests and code reviews become smoother because formatting changes don’t get cluttered.
  - Reduced Errors: Consistent formatting can help prevent syntax mistakes or logic errors that might be hidden in messy code. For example, correctly indented blocks make it easier to spot missing braces or misplaced statements.
  - Faster Debugging and Maintenance: Cleanly formatted code allows you to quickly trace function calls, loops, and conditionals. Maintenance and updates are less error-prone and more efficient.
  - Professionalism and Consistency: Well-formatted code reflects professionalism and adherence to industry standards. It signals attention to detail and makes onboarding new team members easier.
  - Tool Integration: Many tools (linters, IDEs, CI/CD pipelines) rely on consistent formatting for automated checks. Proper formatting ensures these tools work effectively and reduces friction in automated workflows.

