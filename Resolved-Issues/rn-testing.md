# RN Testing

- Research the difference between unit, integration, and end-to-end testing

- The difference between unit, integration, and end-to-end testing lies in their
  scope and purpose. Unit tests focus on the smallest building blocks of an
  application, such as a function, hook, or a single component, and check
  whether they behave as expected in isolation. For example, you might test that
  a date formatting utility always returns the correct string. Integration tests
  step up in complexity by verifying how different pieces of the application
  work together. In React Native, this could mean rendering a form that depends
  on validation logic and ensuring that when a user enters invalid data, the
  error messages appear correctly. End-to-end (E2E) tests, on the other hand,
  simulate the experience of a real user by testing the full flow of the app on
  a device or emulator. With tools like Detox, developers can automate actions
  such as logging in, navigating through screens, and checking whether data is
  correctly displayed. Together, these levels of testing build confidence at
  different layers of the application.

- Why is testing important in React Native development?

- Testing is especially important in React Native development because mobile
  apps are highly interactive and run on many different devices and operating
  systems. Without tests, small bugs can quickly grow into major issues for end
  users, leading to crashes, broken features, or poor performance. Testing also
  gives developers confidence to refactor code or add new features without
  worrying about breaking existing functionality. In collaborative teams, it
  ensures that everyone can work safely in the same codebase. Ultimately,
  thorough testing reduces manual testing effort, speeds up development, and
  improves the reliability of the final app.

- How do you mock API calls in tests?

- Mocking API calls in tests is a common practice because real network requests
  are slow, unpredictable, and make tests dependent on external services. In
  React Native, you can mock API calls using tools like Jest’s jest.mock or
  jest.spyOn to replace the actual function with a fake one. For example,
  instead of calling a live API to fetch users, you can mock the function to
  return a predefined array of user objects. This way, your component tests
  remain fast, reliable, and focused on whether the UI behaves correctly when
  data is available, missing, or when an error occurs. Mocking also allows you
  to simulate error states easily, which would be difficult to reproduce with a
  real API.

- What’s the difference between unit and integration tests?

- The difference between unit and integration tests lies mainly in scope and
  dependencies. A unit test isolates a single function or component and verifies
  that it works correctly without considering its connections to other parts of
  the system. It is fast, simple, and usually covers many small cases. An
  integration test, however, combines two or more units and checks that they
  interact correctly. For instance, you might test a list component that renders
  data from an API hook—this requires both the hook and the component to work
  together. Unit tests help pinpoint bugs quickly, while integration tests
  provide assurance that the system behaves as expected when parts are combined.
  Both are necessary to build a robust React Native app.
