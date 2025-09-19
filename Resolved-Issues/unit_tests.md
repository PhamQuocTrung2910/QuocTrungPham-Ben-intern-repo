# Unit Testing

📌 Introduction to Unit Testing with Jest

- Research what Jest is and why unit tests are important

- Jest is a JavaScript testing framework created by Meta that provides tools for
  writing and running tests, especially for React applications but also for
  general JavaScript and Node.js projects. It is popular because it includes
  features like test runners, mocking, and code coverage out of the box, making
  it easy to set up and use. Unit tests are important because they check
  individual parts of a program in isolation, ensuring that each function or
  component works correctly. This improves reliability, helps prevent bugs when
  making changes, and makes the codebase easier to maintain.

- I have completed setting up Jest in my React project, ensuring it was properly
  configured. I then wrote a simple test for a utility function, and ran the
  test to confirm that it passed successfully. After verifying the results, I
  pushed the test to GitHub to keep it version-controlled and available for
  collaboration.

![Jest Dependencies Installation](JestDependenciesInstallation.png)
![Successfully Tested the function](JestTestSuccess.png)

- Why is automated testing important in software development?

- Automated testing is important because it reduces manual effort and human
  error by running tests quickly and consistently. It enables developers to
  validate code frequently, which is crucial for continuous integration and
  delivery pipelines. Automated tests improve development speed, maintain
  software quality at scale, and provide confidence when adding new features or
  refactoring existing code.

- What did you find challenging when writing your first Jest test?

- The main challenge when writing a first Jest test is shifting from writing
  functional code to thinking about how to test that code. It can be difficult
  to decide what parts of the program to test and how to structure the tests.
  Learning Jest’s matchers, handling mocks, and setting up the testing
  environment can also feel unfamiliar at first.

📌 Testing React Components with Jest & React Testing Library

![Code for the Message Component](MessageReactComponent.png)
![Code for the Test](MessageReactTestingComponent.png)
![Testing Output](MessageReactTestingComponentSuccess.png)

- Research how React Testing Library works with Jest.

- React Testing Library is designed to work hand-in-hand with Jest, which
  provides the test runner, assertion utilities, and mocking capabilities. While
  Jest sets up the test environment and runs test files, React Testing Library
  focuses on rendering React components in a simulated DOM provided by jsdom.
  This allows tests to run as if they were in a browser, without needing a real
  one. Together, Jest handles the testing framework aspects (e.g., describe, it,
  expect), while React Testing Library provides utilities (render, screen,
  fireEvent, and userEvent) to interact with components in a way that mirrors
  actual user behavior.

- What are the benefits of using React Testing Library instead of testing
  implementation details?

- The key advantage of React Testing Library is that it encourages testing from
  the user’s perspective rather than the developer’s. Instead of asserting
  internal state or component methods, tests interact with the DOM elements the
  same way a user would by looking for text, labels, roles, or placeholders.
  This leads to more resilient and meaningful tests that are less likely to
  break during refactoring, since they don’t rely on the inner workings of a
  component. The result is tests that validate actual behavior and user
  experience, ensuring confidence that the application works as intended.

- What challenges did you encounter when simulating user interaction?

- One common challenge when simulating user interactions is ensuring that the
  test environment behaves like a browser. For example, without configuring
  jsdom, operations such as clicking a button or typing into an input will fail
  because there is no document object. Another difficulty is dealing with
  asynchronous updates, such as state changes or API calls triggered by user
  events, which may require await and utilities like waitFor to avoid false
  negatives. Additionally, matchers like toHaveTextContent require extra setup
  with @testing-library/jest-dom. These challenges highlight the importance of
  correctly setting up the testing environment and learning the proper utilities
  for simulating realistic user behavior.

📌 Mocking API Calls in Jest

![Code for the User List Component](UserListComponent.png)
![Code for the Test](UserListTestComponent.png)
![Output](UserListTestComponentSuccess.png)

- Research how to mock API calls in Jest using jest.fn() and jest.mock().

- Mocking API calls in Jest can be done using either jest.fn() or jest.mock().
  With jest.fn(), you can replace functions like fetch with a mocked version
  that returns a predefined response. For example, you can use
  jest.fn().mockResolvedValueOnce() to simulate a successful API response or
  mockRejectedValueOnce() to simulate a failed request. On the other hand,
  jest.mock() allows you to replace an entire module with a mock implementation.
  This is particularly useful when you want to mock a library such as axios or a
  custom API utility module. By mocking the API calls, you can control the data
  returned, test edge cases, and avoid making real network requests, which makes
  tests faster and more reliable.

- Why is it important to mock API calls in tests?

- Mocking API calls in tests is important for several reasons. First, it ensures
  consistency: real APIs can change, have downtime, or return unexpected data,
  which could make tests flaky. Second, it allows tests to run faster because
  they don’t need to wait for network requests. Third, it helps maintain
  isolation in unit tests, allowing you to focus on the behavior of the
  component or function without depending on external systems. Additionally,
  mocking enables testing of error handling and edge cases that might be
  difficult or unsafe to reproduce with real API calls, such as network failures
  or specific response formats.

- What are some common pitfalls when testing asynchronous code?

- When testing asynchronous code, there are several common pitfalls to watch out
  for. One frequent issue is not waiting for promises to resolve, which can lead
  to tests passing or failing incorrectly. Tools like async/await, waitFor, and
  findBy in React Testing Library help handle these timing issues. Another
  pitfall is side effects from previous tests, such as leftover mocked responses
  or modified global objects like fetch, which can interfere with subsequent
  tests. It’s also easy to forget error handling paths, resulting in untested
  failure scenarios. Finally, overly complex async logic can make tests flaky if
  timing assumptions are implicit, so explicit synchronization and careful
  cleanup are essential.
