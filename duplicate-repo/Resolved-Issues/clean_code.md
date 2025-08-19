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
const x = "John Doe";
const y = true;
function fn(a) {
  console.log(a);
}
```

- Issues with the code:
  - Hard to know what x or y represents. fn doesn’t indicate its action.

3. Refactor the code by renaming variables/functions for better clarity.

```javascript
const userName = "John Doe";
const isLoggedIn = true;
function handleLogin(user) {
  console.log(user);
}
```

Fixed: Now variables and functions clearly indicate purpose and behavior.

4. What makes a good variable or function name?

Poor Naming Convention:

```javascript
function C1() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
```

Good Naming Convention:

```javascript
function ProfileCard() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
```

Improvement: The name ProfileCard immediately communicates what the component represents. 5. What issues can arise from poorly named variables?

- Poor naming can cause a variety of problems in React Native projects:
  - Confusing JSX/Props: If you pass props with ambiguous names, it’s unclear what they represent.

```javascript
<UserCard a={user} b={true} />
```

- It’s hard to know what a and b are doing.

- Debugging difficulty: Error messages referencing vague variable names like x or fn1 require more mental effort to trace.
- Misuse of variables/functions: Developers might use the wrong variable because its name doesn’t reflect its purpose.
- Increased onboarding time: New team members must spend extra time understanding the codebase.
- Async and state bugs: With hooks, ambiguous names can cause subtle issues:

```javascript
const [d, setD] = useState(null); // What is d? Data? Date?
```

6. How did refactoring improve code readability?

- Refactoring names makes the code self-documenting, reducing cognitive load:
  - Clear JSX props:

```javascript
<UserCard user={currentUser} isActive={true} />
```

- Meaningful state hooks:

```javascript
const [userProfile, setUserProfile] = useState(null);
```

- Easier debugging: Error logs like Cannot read property 'name' of userProfile are intuitive.
- Predictable behavior in functions:

```javascript
function handleLoginPress() { ... }
function fetchUserData(userId) { ... }
```

- You immediately understand what each function does without reading its full implementation.

7. How Refactoring Improves Maintainability & Collaboration

- Team collaboration: Developers can quickly understand and use your components/functions without constant clarification.
- Consistency across project: Consistent naming conventions reduce confusion when integrating multiple components or modules.
- Enhanced scalability: As projects grow, meaningful names prevent spaghetti code and make it easier to add features.
- Supports documentation & testing: Clear names improve automated test readability and documentation clarity.

```javascript
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

```javascript
function submitUserData(user, data, isAdmin, notify) {
  let processed = {};

  // Validate user
  if (!user || !user.id) {
    console.error("Invalid user");
    return;
  }

  // Process data
  Object.keys(data).forEach((key) => {
    processed[key] = data[key].trim();
  });

  // Admin extra action
  if (isAdmin) {
    processed.adminNote = "Processed by admin";
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

```javascript
function validateUser(user) {
  if (!user || !user.id) {
    console.error("Invalid user");
    return false;
  }
  return true;
}

function processData(data) {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, v.trim()]),
  );
}

function addAdminNote(processed, isAdmin) {
  if (isAdmin) {
    processed.adminNote = "Processed by admin";
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

```javascript
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

```javascript
function formatTimestamp() {
  return new Date().toLocaleString();
}

function logUserEvent(user, event) {
  console.log(`User ${user.name} ${event} at ${formatTimestamp()}`);
}

// Usage:
logUserEvent(user, "logged in");
logUserEvent(user, "checked out");
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

📌 Refactoring Code for Simplicity

1. Research common refactoring techniques.

- Based on sources like GeeksforGeeks, MarutiTech, and Refactoring.Guru, here are widely used refactoring techniques:
  - Red–Green–Refactor (TDD-style):
    - Red: Write a test that fails.
    - Green: Write minimal code to make the test pass.
    - Refactor: Clean up the implementation without breaking tests.

  - Extract Method: Identify and extract repetitive or complex code into its own function, improving reuse and clarity.

  - Refactoring by Abstraction / Extract Class: Encapsulate shared logic or data into new components or classes to reduce duplication and better organize code.
  - Simplify Conditionals / Guard Clauses: Replace nested or complex if-else logic with early returns or clearer constructs.

  - Inline Variable / Extract Variable: Simplify complex expressions by replacing or extracting into well-named variables.

2. Find an example of overly complicated code in an existing project (or write your own).

- Here is a JavaScript snippet simulating React Native data handling:

```javascript
function handleUserFormSubmission(formData, userId, isEdit) {
  let name = formData.userName.trim();
  let email = formData.userEmail.toLowerCase();

  if (!isEdit) {
    api.createUser({ name, email, userId });
  } else {
    api.updateUser(userId, { name, email });
  }

  analytics.track("UserFormSubmitted", {
    userId,
    isNew: !isEdit,
    timestamp: new Date().toISOString(),
  });
}

function handleUserFormSubmission(formData, userId, isEdit) {
  let name = formData.userName.trim();
  let email = formData.userEmail.toLowerCase();

  if (!isEdit) {
    api.createUser({ name, email, userId });
  } else {
    api.updateUser(userId, { name, email });
  }

  analytics.track("UserFormSubmitted", {
    userId,
    isNew: !isEdit,
    timestamp: new Date().toISOString(),
  });
}
```

- Why it’s complex:
  - Performs multiple responsibilities: data formatting, API logic, and analytics, severely violating single responsibility principles.
  - Hard to read and harder to test when each task is mixed in one function.

3. Refactor it to make it simpler and more readable.

- Here is how i would break it down into clear, single-purpose functions:

```javascript
function formatUserData({ userName, userEmail }) {
  return {
    name: userName.trim(),
    email: userEmail.toLowerCase(),
  };
}

function submitUserData(userData, userId, isEdit) {
  if (isEdit) {
    return api.updateUser(userId, userData);
  } else {
    return api.createUser({ ...userData, userId });
  }
}

function trackFormSubmission(userId, isNew) {
  analytics.track("UserFormSubmitted", {
    userId,
    isNew,
    timestamp: new Date().toISOString(),
  });
}

function handleUserFormSubmission(formData, userId, isEdit) {
  const userData = formatUserData(formData);
  submitUserData(userData, userId, isEdit);
  trackFormSubmission(userId, !isEdit);
}
```

4. What made the original code complex?

- Mixed responsibilities: Due to the code having multiple responsibilities such as handling formatting, API communication, and event tracking in one function.
- Low readability: Multiple actions inline makes it harder to follow and understand what the code is trying to do.
- Testing difficulty: You can’t easily do unit test formatting logic independently do to all the responbilities being in the same function.

5. How did refactoring improve it?

- Readability: Each function has a clear, focused responsibility making it easier for future developers to understand where to continue.
- Maintainability: Isolated behavior lets you update formatting or analytics separately for any future scaling.
- Reusability: Formatting logic (formatUserData) can be reused elsewhere decreasing code repetition.
- Testability: Each component function (format, submit, track) can be unit tested in isolation preventing flase positive test results.
- Scalability: New features (e.g., validation middleware) can be inserted cleanly without disrupting flow.

References for this issue:

- https://marutitech.com/code-refactoring-best-practices/?utm_source=chatgpt.com
- https://algocademy.com/blog/the-comprehensive-guide-to-refactoring-and-improving-existing-code/?utm_source=chatgpt.com
- https://codelucky.com/code-refactoring-improving-quality/?utm_source=chatgpt.com
- https://www.geeksforgeeks.org/software-engineering/code-refactoring-techniques-in-software-engineering/?utm_source=chatgpt.com
- https://newdigitalstreet.com/code-refactoring/?utm_source=chatgpt.com
- https://howik.com/refactoring-techniques?utm_source=chatgpt.com
- https://victoronsoftware.com/posts/common-refactorings/?utm_source=chatgpt.com

📌 Commenting & Documentation

1. Research best practices for writing comments and documentation.

- Explain why, not what: Comments should clarify the reasoning behind code, not restate what the code does. Clear code should minimize the need for comments.
- Avoid duplication: Do not write comments that simply repeat the code logic—it’s redundant and adds maintenance overhead.
- Self-documenting code: Use descriptive naming and structure so the code is easier to understand without relying heavily on comments.
- Be concise, consistent, and grammatically correct: Well-written comments enhance clarity; use consistent style and avoid jargon or informal language.
- Use comments selectively: Add comments when code is complex, counterintuitive, or justified by external factors; otherwise, focus on improving code readability.

2. Find an example of poorly commented code and rewrite the comments to be more useful.

- Original (Poor Comments):

```javascript
// loop through array
for (let i = 0; i < items.length; i++) {
  // print item
  console.log(items[i]);
}
```

- Issues: The comments merely restate what is obvious from the code.

- Refactored with meaningful commentary:

```javascript
// Log each item for debugging when item list is unexpectedly empty
for (const item of items) {
  console.log(item);
}
```

Improvement: The code is clearer, and the comment adds valuable context about when this logging is useful.

3. When should you add comments?

- When the code’s reasoning or intent isn’t obvious (e.g., complex algorithms, business logic, or workarounds for bugs).
- To document assumptions, edge cases, or external dependencies.
- To describe the purpose of functions or classes (e.g., with JSDoc or docstrings).
- For documentation needed by external consumers (e.g., APIs or modules)

4. When should you avoid comments and instead improve the code?

- If the comment simply repeats the code’s functionality.
- When the code structure or naming can be improved to make the intent clear without comments.
- Avoid over-commenting every line—it can clutter the code and reduce readability.
- Never leave outdated comments—they create confusion and technical debt.

References:

- Swimm.io – Comments in Code: Best Practices and Mistakes to Avoid
  https://swimm.io/learn/code-collaboration/comments-in-code-best-practices-and-mistakes-to-avoid
- Wired – Commenting Your Code: What’s Too Much? Too Little?
  https://www.wired.com/2008/07/commenting-your-code-what-s-too-much-too-little
- Codingem – How to Comment Code? (The Right Way)
  https://www.codingem.com/how-to-comment-code
- Stack Overflow Blog – Best Practices for Writing Code Comments
  https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments
- PullChecklist – Code Documentation Best Practices
  https://www.pullchecklist.com/posts/code-documentation-best-practices
- Wikipedia – Self-documenting Code
  https://en.wikipedia.org/wiki/Self-documenting_code
- MIT Communication Lab – Coding and Comment Style
  https://mitcommlab.mit.edu/broad/commkit/coding-and-comment-style
- AlgoCademy – How to Effectively Use Comments in Your Code
  https://algocademy.com/blog/how-to-effectively-use-comments-in-your-code-a-comprehensive-guide
- Boot.dev – Clean Code: Code Comments
  https://blog.boot.dev/clean-code/code-comments
- Wired – The Best Way to Comment Your Code
  https://www.wired.com/2012/09/the-best-way-to-comment-your-code

📌 Handling Errors & Edge Cases

1. Research strategies for handling errors and edge cases in code (include Guard Clauses).

- Understand Edge Cases: Code must handle extreme inputs or behaviors like invalid or null inputs, empty arrays, or unexpected data types to avoid crashes or undefined behavior.

- Use Guard Clauses: Immediately validate inputs and exit early if conditions aren’t met. This simplifies logic and reduces nesting. For example, instead of deeply nested otherwise check for invalid cases first and return early.

- Apply Defensive Programming: Anticipate and guard against invalid inputs and unexpected behaviors. Design code to fail quickly and predictably.

- Handle Errors Thoughtfully: Avoid silent failures (error swallowing). Errors should be surfaced through meaningful messages, logs, or exceptions to aid debugging.

2. Find an existing function that doesn’t properly handle errors or invalid inputs.

- As prviously stated in this .md file, i've not done any code extensive task therefore i'll be providing a personal example for the purpose of this question.

- A JavaScript function that processes a user’s profile:

```javascript
function getInitials(user) {
  const names = user.name.split(" ");
  return (
    names[0][0].toUpperCase() + (names[1] ? names[1][0].toUpperCase() : "")
  );
}
```

- Issue: This code assumes user and user.name always exist and that name includes at least one space. It will break if user is null, name is missing, or it's a single-word name.

3. Refactor the function to improve error handling.

```javascript
function getInitials(user) {
  if (!user || typeof user.name !== "string") {
    console.error("Invalid user or name property");
    return "";
  }

  const parts = user.name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) {
    return "";
  }

  const initials = parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return initials;
}
```

- Improvements:
  - Guard clauses handle invalid inputs early with logging.
  - Input validation ensures user.name is a non-empty string.
  - Edge-case handling addresses single-word names via .slice(0, 2).

4. What was the issue with the original code?

- No error checks: Didn’t validate inputs—would throw errors if user or name were missing.
- Assumed format: Expected name to once contain a space.
- Fragile logic: Broke easily on edge cases, increasing risk of runtime errors.

5. How does handling errors improve reliability?

- Graceful failure: Instead of crashing, function returns an empty string and logs an error.
- Clear intent: Guard clauses make invalid conditions explicit.
- Resilience: Handles unanticipated cases (like missing data) without breaking.
- Easier debugging: Logs pinpoint where invalid input occurs, making bug resolution faster.

References:

- Guard Clauses & Early Exits: Dev.to on guard clauses and flattening control flow
- Reducing Nested Conditionals: Boot.dev on restructuring complex conditionals
- JavaScript Guard Clauses: GeeksforGeeks example and explanation
- Defensive Programming: Wikipedia overview of defensive coding techniques
- Error Swallowing Issues: Wikipedia on anti-patterns in error handling

📌 Writing Unit Tests for Clean Code

1. Research the importance of unit testing in software development.

Unit testing is critical in software development because it verifies that individual functions or modules work correctly before integrating them into the larger system/code base. It helps detect bugs early, reducing the cost and effort of fixing issues later. Unit tests also provide a safety net for developers when refactoring code, ensuring that changes do not introduce regressions. They promote better design practices, maintainability, and team collaboration by making code behavior explicit and predictable. Additionally, unit tests improve confidence in code quality, making deployments safer and more reliable.

2. Choose a testing framework (e.g., Jest for JavaScript, PyTest for Python).

I'll Choose Jest as its more relevant to Focus Bear.

3. Write a few unit tests for a function in your test repo.

I have written a couple of test in the file sum.test.js for the simple addition function in sum.js.

4. How do unit tests help keep code clean?

Unit testing encourages writing small, focused functions that are easier to test and understand. If a function is too large or complex, it becomes difficult to write effective tests, highlighting areas that need refactoring. Tests also enforce handling of edge cases, proper input validation, and consistent outputs. Over time, this results in code that is more modular, readable, and maintainable.

5. What issues did you find while testing?

During testing, common issues include functions failing with unexpected inputs or edge cases, inconsistent return values, or missing input validation. Dependencies between modules can make it difficult to isolate and test functions properly. Sometimes tests reveal overly complex or poorly structured code that is hard to maintain, emphasizing the need for refactoring. Unit tests thus not only catch bugs but also drive improvements in overall code quality.

- Issues Found While Testing sum(a, b):
  - Non-numeric inputs are not tested
    - What happens if someone calls sum('2', 3) or sum(null, 5)?
    - Currently, the function will likely coerce or throw an unexpected result. Adding tests for invalid inputs will prevent suh bugs from occuring.
  - Edge cases like Infinity or NaN are not tested
    - E.g., sum(Infinity, 1) or sum(NaN, 5) could produce results that might break dependent code.
  - Floating point precision handled only with toBeCloseTo
    - Currently i've used toBeCloseTo, but other floating point cases could still fail, e.g., sum(0.1, 0.7).
  - No test for missing arguments
    - Calling sum(5) or sum() could result in NaN because undefined + number in JavaScript is NaN.
  - No test for very large negative numbers or mixed extreme values
    - Extreme positive + extreme negative combinations could be tested to ensure consistency.
