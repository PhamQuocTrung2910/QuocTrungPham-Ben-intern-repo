# Redux Fundamentals

📌 Introduction to Redux Toolkit (State Management)

- I successfully set up state management in my project using Redux Toolkit and
  React Redux. I began by installing the necessary libraries and then created a
  Redux store along with a dedicated slice to manage the counter state. To
  integrate the store with my React components, I used the useSelector hook to
  read the counter value and the useDispatch hook to trigger state updates
  within the Counter.js component. Finally, I pushed the completed Redux setup
  to GitHub, ensuring my progress is version-controlled and accessible for
  future development.
  ![Installation of Redux Toolkit and React Redux](InstalledReduxToolkitandReactRedux.png)
  ![Redux Counter Interface](ReduxCounter.png)

- When should you use Redux instead of useState?

- You should use Redux instead of useState when your application requires
  managing global state that needs to be shared across multiple components, or
  when the state logic becomes too complex for local management. While useState
  is great for simple, component-level state, Redux provides a centralized
  store, making it easier to handle cross-component communication, ensure
  predictable updates, and scale as your app grows.
