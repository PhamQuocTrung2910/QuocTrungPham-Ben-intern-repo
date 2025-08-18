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


📌 Naming Variables & Functions

1. Research best practices for naming variables and functions. 

- Be descriptive: Names should reflect the data or component purpose.
- Use camelCase for variables/functions and PascalCase for components:
  - userName, fetchData()
  - UserProfile, LoginScreen
- Avoid ambiguous abbreviations: Only use widely recognized ones (id, url, btn).
- Use verbs for functions, nouns for variables/components:
  - Function: handleButtonPress()
  - Variable: userList
  - Component: ProfileCard
- Be consistent: Stick to naming conventions across your project.

2. Find examples of unclear variable names in an existing codebase (or write your own).

```javascript
const x = 'John Doe';
const y = true;
function fn(a) {
  console.log(a);
}
```
- Issues with the code:
  - Hard to know what x or y represents. fn doesn’t indicate its action.

3. Refactor the code by renaming variables/functions for better clarity.

```javascript
const userName = 'John Doe';
const isLoggedIn = true;
function handleLogin(user) {
  console.log(user);
}
```

Fixed: Now variables and functions clearly indicate purpose and behavior.

4. What makes a good variable or function name?

Poor Naming Convention:

``` javascript
function C1() {
  return <View><Text>Profile</Text></View>
}
```

Good Naming Convention:

``` javascript
function ProfileCard() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
```
Improvement: The name ProfileCard immediately communicates what the component represents.
5. What issues can arise from poorly named variables?

- Poor naming can cause a variety of problems in React Native projects:
  - Confusing JSX/Props: If you pass props with ambiguous names, it’s unclear what they represent.

``` javascript
<UserCard a={user} b={true} />
```
  - It’s hard to know what a and b are doing.

- Debugging difficulty: Error messages referencing vague variable names like x or fn1 require more mental effort to trace.
- Misuse of variables/functions: Developers might use the wrong variable because its name doesn’t reflect its purpose.
- Increased onboarding time: New team members must spend extra time understanding the codebase.
- Async and state bugs: With hooks, ambiguous names can cause subtle issues:
``` javascript
const [d, setD] = useState(null); // What is d? Data? Date?
```
6. How did refactoring improve code readability?

- Refactoring names makes the code self-documenting, reducing cognitive load:

  - Clear JSX props:
``` javascript
<UserCard user={currentUser} isActive={true} />
```
  - Meaningful state hooks:
``` javascript
const [userProfile, setUserProfile] = useState(null);   
```
  - Easier debugging: Error logs like Cannot read property 'name' of userProfile are intuitive.
  - Predictable behavior in functions:
``` javascript
function handleLoginPress() { ... }
function fetchUserData(userId) { ... }
```
  - You immediately understand what each function does without reading its full implementation.

7. How Refactoring Improves Maintainability & Collaboration

- Team collaboration: Developers can quickly understand and use your components/functions without constant clarification.
- Consistency across project: Consistent naming conventions reduce confusion when integrating multiple components or modules.
- Enhanced scalability: As projects grow, meaningful names prevent spaghetti code and make it easier to add features.
- Supports documentation & testing: Clear names improve automated test readability and documentation clarity.
``` javascript
test('handleLoginPress sets isLoggedIn to true', () => { ... })
```
- Reduces bugs: Developers are less likely to accidentally misuse variables, props, or functions.

📌 Writing Small, Focused Functions

1. Best Practices for Writing Small, Single-Purpose Functions

- Single Responsibility Principle (SRP): Each function should focus on one task and do it to the best of its ability.
- Keep it small: Limit functions to roughly 4–25 lines to maintain clarity and focus.
- Avoid side effects: Functions should not alter external state or perform unrelated tasks.
- Limit parameters: Prefer 3 or fewer parameters, if more are needed then consider packaging them in an object.
- Use descriptive names: Function names should clearly reflect their purpose.
- Improve testability and reusability: Small, focused functions are easier to unit test and reuse.

2. Find an example of a long, complex function in an existing codebase (or write your own).

- Here is a React Native snippet that violates these principles:
``` javascript
function submitUserData(user, data, isAdmin, notify) {
  let processed = {};

  // Validate user
  if (!user || !user.id) {
    console.error('Invalid user');
    return;
  }

  // Process data
  Object.keys(data).forEach(key => {
    processed[key] = data[key].trim();
  });

  // Admin extra action
  if (isAdmin) {
    processed.adminNote = 'Processed by admin';
  }

  // Optional notification
  if (notify) {
    sendNotification(user.id, processed);
  }

  // Save to API
  api.saveUserData(user.id, processed);
}

```
- Issues:
  - Mixes data validation, processing, optional notifications, and API calls into one function.
  - Difficult to test, maintain, or reuse individual behaviors.

3. Refactor it into multiple smaller functions with clear responsibilities.

``` javascript
function validateUser(user) {
  if (!user || !user.id) {
    console.error('Invalid user');
    return false;
  }
  return true;
}

function processData(data) {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, v.trim()])
  );
}

function addAdminNote(processed, isAdmin) {
  if (isAdmin) {
    processed.adminNote = 'Processed by admin';
  }
  return processed;
}

function notifyUser(userId, processedData, notify) {
  if (notify) {
    sendNotification(userId, processedData);
  }
}

function saveData(userId, processedData) {
  api.saveUserData(userId, processedData);
}

function submitUserData(user, data, isAdmin, notify) {
  if (!validateUser(user)) return;

  let processed = processData(data);
  processed = addAdminNote(processed, isAdmin);
  notifyUser(user.id, processed, notify);
  saveData(user.id, processed);
}
```
- Here is the code refractored with proper indentation for better readability. 

4. Why is breaking down functions beneficial?

- Readability: Each function is concise and clearly titled.
- Maintainability: Isolated behavior lets you change one part without breaking others.
- Testability: You can write unit tests for each function independently.
- Reusability: Functions like processData or saveData can be reused in other parts of the app.
- Debugging: Easier to trace where an issue started because each piece is isolated.

5. How did refactoring improve the structure of the code?

- Readability: Each function is concise and clearly titled.
- Maintainability: Isolated behavior lets you change one part without breaking others.
- Testability: You can write unit tests for each function independently.
- Reusability: Functions like processData or saveData can be reused in other parts of the app.
- Debugging: Easier to trace where an issue started because each piece is isolate.

📌 Avoiding Code Duplication

1. Research the "Don't Repeat Yourself" (DRY) principle.

- The DRY principle emphasizes that “every piece of knowledge must have a single, unambiguous representation within a system”, a principle originating from The Pragmatic Programmer by Andy Hunt and Dave Thomas.

- By avoiding redundant code or information, DRY helps ensure consistency and maintainability even when changes are needed, they only occur in one place rather than across multiple duplicated segments. 

- Duplication is about more than mere code—it’s about logic and knowledge. A duplicated business rule in different forms still violates DRY, making updates error-prone and harder to track. 

- While DRY is powerful, it must be applied judiciously: premature abstraction can create unnecessary complexity and tight coupling, especially when duplications might be incidental.

2. Find a section of code in your test repo with unnecessary repetition.

- As i've not done any issues that require extensive coding i'm unable to locate a code snippet showcasing repetition therefore i'll be making up an example for the purpose of this question.

``` javascript
function logLoginTime(user) {
  const now = new Date().toLocaleString();
  console.log(`User ${user.name} logged in at ${now}`);
}

function logCheckoutTime(user) {
  const now = new Date().toLocaleString();
  console.log(`User ${user.name} checked out at ${now}`);
}
```
- Both functions use similar logic: getting the current timestamp and logging a message. That’s DRY violation.

3. Refactor the code to eliminate duplication.

- Here’s a cleaner version by extracting the shared logic:

``` javascript
function formatTimestamp() {
  return new Date().toLocaleString();
}

function logUserEvent(user, event) {
  console.log(`User ${user.name} ${event} at ${formatTimestamp()}`);
}

// Usage:
logUserEvent(user, 'logged in');
logUserEvent(user, 'checked out');
```
4. What were the issues with duplicated code?

- Maintenance overhead: Updating timestamp logic in two places doubles the effort and increases risk of inconsistency. 

- Higher error rate: If one function is updated but the other is forgotten, behavior diverges. 

- Increased cognitive load: Repetition forces developers to understand and maintain similar code in multiple spots.

5. How did refactoring improve maintainability?

- Single source of truth: Timestamp formatting logic is centralized in formatTimestamp().
- Simpler updates: Any required formatting changes are applied once and propagate everywhere.
- Enhanced readability: logUserEvent(user, 'checked out') is expressive and self-documenting.
- Reduced errors: Less duplication means fewer paths for bugs to hide.
- Easier extension: If event logging grows (e.g. logging to a server), you only update one function, not multiple.




















































































































