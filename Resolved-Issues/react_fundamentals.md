# React Fundamentals

📌 Setting Up the Environment

- I successfully completed the setup of a React project with Tailwind CSS,
  verified that the styling was applied correctly by running the project, and
  documented the process in a README.md file. The main challenge I faced during
  this task was finding the most recent and accurate guide for configuring
  Tailwind with the latest version of React and Vite. Once I located an
  up-to-date resource, the installation and configuration steps were
  straightforward. This experience helped me better understand how to integrate
  Tailwind into a React project and reinforced the importance of relying on
  current documentation when setting up new environments.

Screenshots:
![Checking whether the right prerequisites were installed](Checking-React-App-Prerequisites.png)
![Creation of Basic React App](CreatingReactApp.png)
![Installed Tailwind CSS and ran npm run dev](InstalledTailwindCSS-V4+RunDev.png)
![Alter vite.config.js](Add-the-tailwindcss+vite-plugin-to-your-Vite-configuration.png)
![Test Code Changes - Before](TailwindCSS-Before.png)
![Test Code Changes - After](TailwindCSS-After.png)
![Test App Changes - Before](TestingTailwindCSS-Before.png)
![Test App Changes - After](TestingTailwindCSS-After.png)

📌 Understanding Components & Props

- I successfully completed the task by creating a functional React component
  called HelloWorld.jsx that displays the message "Hello, Focus Bear!". I
  enhanced the component to accept a prop called name, allowing it to display
  the value dynamically, which makes the component reusable with different
  names. After implementing and testing the component locally to ensure it
  renders correctly, I committed the changes and pushed the component to GitHub,
  ensuring the project repository is updated with the latest work.
  ![Hello, Focus Bear](hellofocusbear.png)

- Why are components important in React?
  - Components are essential in React because they allow developers to break the
    user interface into small, reusable, and manageable pieces. Each component
    can encapsulate its own structure, styling, and behavior, enabling a clear
    separation of concerns and making the code easier to maintain and debug.
    Components can be composed together to build complex UIs, reused across
    different parts of an application, and maintain their own state to create
    dynamic, interactive experiences. This modular approach improves
    readability, scalability, and testability, making applications more
    efficient to develop and maintain over time.

📌 Handling State & User Input

- I successfully completed the task by creating a new component called
  Counter.js, which features a button that increments a number each time it is
  clicked. I utilized the useState hook to manage the count value, ensuring that
  the state updates correctly with each interaction. The component dynamically
  displays the updated count, providing real-time feedback as the button is
  pressed. After implementing and testing the functionality, I pushed the
  completed component to GitHub for version control and project integration.

![Counter in React](counter.png)

- What happens if we modify state directly instead of using setState?

- If we modify state directly instead of using setState, React will not
  recognize that the state has changed, so it won’t trigger a re-render of the
  component. This means that even though the value in memory is updated, the UI
  will not reflect the change, leading to inconsistencies between the data and
  what the user sees. React enforces the use of setState (or the updater
  function from useState) because it ensures state updates are tracked,
  re-renders are scheduled properly, and the virtual DOM can efficiently update
  the UI. Directly mutating state can break React’s update cycle and cause
  unpredictable behavior in the application.

📌 Working with Lists & User Input

- I completed the task by creating a simple form component that includes an
  input field and a button. The input field allows users to type text, and when
  the button is clicked, the entered text is added to a list that is managed
  using React’s useState hook. The list is then displayed dynamically by
  iterating over the state array with the .map() method, ensuring that each new
  entry is rendered immediately in the UI. After testing the functionality to
  confirm that items are added and displayed correctly, I pushed the form
  component to GitHub for version control and integration into the project.

![Empty Simple Form](SimpleFormInitial.png)
![Filled Simple Form](SimpleFormFilled.png)

- What are some common issues when working with lists in React?

- Some common issues when working with lists in React include forgetting to
  provide a unique key prop when rendering list items with .map(), which can
  cause inefficient re-rendering or unexpected UI behavior. Another issue is
  using the array index as the key, which can lead to problems if the list
  changes dynamically, since React may not correctly track which items were
  added, removed, or updated. Developers may also run into state mutation issues
  if they modify the array directly instead of creating a new copy before
  updating state, which prevents React from recognizing changes. Additionally,
  handling empty input values or duplicate entries can cause unintended results
  if proper validation isn’t implemented. Finally, performance issues can arise
  when rendering very large lists without optimizations like virtualization.

📌 Navigation with React Router

- I installed React Router and set up a basic routing system to enable
  navigation within the app. I created two separate pages, Home.jsx and
  Profile.jsx, each serving as a distinct component with its own content. Using
  React Router’s Routes and Route components, I defined paths for / to render
  the Home page and /profile to render the Profile page. For navigation, I added
  links using the Link component so users can easily switch between Home and
  Profile, and also tested navigation using useNavigate for programmatic
  routing. After confirming that the routes worked correctly and navigation
  functioned as expected, I pushed the completed routing setup to GitHub.
  ![Home Page](HomePage.png) ![Profile Page](ProfilePage.png)

- What are the advantages of client-side routing?

- Client-side routing offers several advantages over traditional server-side
  routing. Since navigation happens within the browser without requiring a full
  page reload, it provides a faster and smoother user experience, making
  applications feel more like native apps. It also reduces unnecessary network
  requests because only the necessary data is fetched, not an entire new HTML
  page. With client-side routing, developers can build single-page applications
  (SPAs) where state and layout persist across pages, avoiding re-rendering of
  shared components like headers or sidebars. Additionally, it allows for more
  flexible and dynamic navigation, such as programmatic redirects and protected
  routes, while enabling better separation of concerns between frontend and
  backend.

📌 Understanding React Hooks: useEffect

- Research how useEffect works and when to use it.

- The useEffect hook in React is used to handle side effects inside functional
  components. A side effect means anything that happens outside the normal
  process of rendering the UI. Rendering is considered a "pure" operation — it
  should take the component’s props and state, and return JSX without changing
  things elsewhere. Side effects break that purity, for example:
  - Data fetching (calling an API).
  - Subscriptions (listening to events like window resizing or WebSocket
    messages).
  - Timers (using setTimeout or setInterval).
  - Direct DOM manipulation (changing elements outside React’s control).

- How it works: useEffect takes a callback function that React runs after the
  component renders. This ensures side effects don’t block the initial paint of
  the UI.

- It also takes an optional dependency array as the second argument:
  - [] → Runs only once after the first render (mount).
  - [value1, value2] → Runs again whenever one of these dependencies changes.
  - No array → Runs after every render.

- Cleanup: The function passed to useEffect can return another function called a
  cleanup function. React will call this cleanup before the effect runs again or
  when the component is removed from the DOM. Cleanup is important to prevent
  memory leaks (when resources like event listeners or intervals are left
  hanging around).

Important Terminology:

- Render: The process where React calls your component and generates the UI (JSX
  → DOM).
- Side effect: Any action outside of rendering that interacts with external
  systems or changes state beyond simple rendering.
- Dependency array: A list of values React watches to decide when to re-run the
  effect.
- Cleanup function: A function returned inside useEffect to undo or stop the
  side effect when needed.
- Mount: When a component is first added to the DOM.
- Unmount: When a component is removed from the DOM.

- I created a React component that demonstrates lifecycle behavior, data
  fetching, and cleanup. When the component mounts, it logs a message to the
  console, and when it unmounts, it logs a different message to indicate it was
  removed. The component includes a button that, when clicked, triggers a fetch
  request to an API in this case, a placeholder JSON API and displays the
  retrieved data. I used the useEffect hook with a cleanup function to cancel
  any ongoing requests or clear resources when the component unmounts, ensuring
  no memory leaks occur. After testing the functionality, confirming that
  messages appear on mount/unmount, data fetch works on button click, and
  cleanup runs properly I pushed the completed component to GitHub.
  ![Fetch API ran](API-Data-Fetched.png)
  ![Checking the whether the Component is Mounted](Mounted.png)

- When should you use useEffect instead of handling logic inside event handlers?

- You should use useEffect when the logic needs to run as a side effect of
  rendering or state/prop changes, not just in response to a user action. For
  example:
  - Fetching data when the component mounts.
  - Subscribing to events like window resize or WebSocket updates.
  - Updating the document title based on state.
- Event handlers are only triggered by direct user actions (clicks, typing,
  etc.), whereas useEffect handles tasks that need to run automatically after
  rendering or when certain dependencies change.

- What happens if you don’t provide a dependency array?

- If you omit the dependency array, React will run the effect after every
  render, including re-renders caused by state or prop changes. This can lead
  to:
  - Repeated API calls or computations on every render.
  - Unnecessary re-renders or side effects that degrade performance.
  - Providing the dependency array controls when the effect runs, making it
    predictable and efficient.

- How can improper use of useEffect cause performance issues?

- Running expensive computations or API calls on every render by forgetting the
  dependency array.
- Creating memory leaks by not including cleanup functions (e.g., intervals,
  subscriptions).
- Causing infinite loops if the effect updates a state that is also listed in
  its dependency array incorrectly.
- Re-rendering large components unnecessarily, which can make the UI sluggish.

📌 Optimizing Performance with useMemo

- Research how useMemo works and why it’s useful.
  - What it is:
    - React Hook for memoizing (caching) computed values.
    - Syntax: const value = useMemo(() => compute(a, b), [a, b]).

  - How it works:
    - Runs the function on the first render.
    - On re-render, recomputes only if dependencies change.
    - Otherwise, returns the cached value.

  - Why it’s useful:
    - Optimizes expensive calculations (e.g., filtering, sorting, heavy math).
    - Prevents unnecessary child re-renders by stabilizing object/array
      references.
    - Works together with useCallback (for functions).

  - When to use:
    - Only for costly computations or when prop references matter.
    - Avoid overuse — caching itself has overhead.

  - Key difference:
    - useMemo memoizes values.
    - React.memo memoizes components.

  - In short: useMemo boosts React performance by caching results of expensive
    operations and keeping stable references, but it should be used selectively
    for best results.

  - I developed a performance demo showcasing the benefits of React’s useMemo
    hook. The component generates a large list of numbers and runs multiple
    expensive calculations, such as filtering, sum, average, max, min, and prime
    count. Thanks to useMemo, these computations are only re-executed when the
    list size or filter changes, avoiding unnecessary recalculations on
    re-renders. The interface includes live performance logs to highlight when
    expensive operations occur, along with clear visual feedback in the number
    grid (colored by even, odd, and prime status). This project demonstrates how
    useMemo can significantly improve rendering efficiency in React applications
    by caching results intelligently.

  ![Performance using useMemo](PerformanceDemo.png)

- How does useMemo improve performance?
  - useMemo caches the result of an expensive calculation.
  - On re-renders, React skips recomputing unless dependencies change.
  - This reduces unnecessary CPU work (e.g., sorting, filtering, math).
  - It also stabilizes object/array references, preventing unnecessary child
    component re-renders.

- When should you avoid using useMemo?
  - If the calculation is cheap/lightweight, useMemo adds unnecessary overhead.
  - If your component doesn’t re-render frequently, memoization provides little
    benefit.
  - Overuse can make code harder to read and debug.
  - Rule of thumb: use it only for expensive computations or stable references
    for props.

- What happens if you remove useMemo from your implementation?
- The expensive calculation runs on every render, even if inputs didn’t change.
- This can cause performance degradation, especially with large lists or heavy
  math.
- Child components relying on stable references may re-render unnecessarily.
- In my demo: clicking “Re-render” would repeatedly trigger expensive
  calculations, making the UI slower and logs show longer processing times.

📌 Preventing Unnecessary Renders with useCallback

- In React, useCallback is a hook that memoizes a function, returning the same
  function reference across renders unless its dependencies change. This
  prevents unnecessary re-renders of memoized child components (React.memo) that
  would otherwise receive a “new” function on every render, even if its logic is
  unchanged. It is also useful when functions are dependencies in hooks like
  useEffect or useMemo, avoiding repeated executions caused by changing
  references. However, useCallback should not be overused, as it introduces
  memory and complexity overhead. It is best applied when passing functions to
  children or managing expensive side effects.

- I successfully completed the CallbackDemo component, which demonstrates
  optimized rendering in React using useCallback and React.memo. In this
  component, I created a task list where each task can be toggled or deleted,
  passing the handler functions as props to the child TaskItem components. By
  wrapping these functions with useCallback, I ensured that child components do
  not re-render unnecessarily when the parent component updates unrelated state,
  improving performance. I also included a TaskStats child component to show
  aggregated statistics, which is memoized to prevent unnecessary re-renders.
  Console logs and React DevTools highlighting were used to verify that
  re-renders occur only when expected. After thoroughly testing all
  interactions—including adding tasks, toggling, deleting, and forcing parent
  re-renders, I committed the fully functional component to GitHub, ensuring it
  is version-controlled and ready for integration into the project.

![CallBackDemo Interface](CallBackDemo-Interface.png)
![CallBackDemo Console Logs](CallBackDemo-ConsoleLogs.png)

- What problem does useCallback solve?

- useCallback solves the problem of unnecessary re-renders in React components
  caused by changing function references. In React, functions defined inside a
  component are recreated on every render. If these functions are passed as
  props to child components, even if the logic hasn’t changed, React sees the
  prop as “new” and triggers a re-render of the child. useCallback memoizes the
  function reference, so it stays the same between renders unless its
  dependencies change, preventing unnecessary child re-renders and improving
  performance.

- How does useCallback work differently from useMemo?

- While both useCallback and useMemo are React hooks used for memoization, they
  serve slightly different purposes:
  - useCallback is specifically for functions. When you define a function inside
    a React component, it gets recreated on every render. If that function is
    passed to a child component as a prop, the child may unnecessarily re-render
    because React sees the function reference as “new.” useCallback prevents
    this by returning the same function reference across renders, unless the
    specified dependencies change. This is particularly useful with React.memo
    or when passing callbacks to optimized child components.
  - useMemo, on the other hand, is for values or computations. If you have an
    expensive calculation (e.g., filtering a large array, calculating a
    factorial), placing it directly in the component body would run it on every
    render. useMemo stores the result of the computation and only recalculates
    it when its dependencies change.
- In short, useCallback is about preserving functions, while useMemo is about
  preserving computed values. Conceptually, useCallback(fn, deps) is equivalent
  to useMemo(() => fn, deps), but useCallback makes the intent of memoizing a
  function explicit, which improves code readability.

- When would useCallback not be useful?
  - Cheap functions: If the function does very little, creating a new reference
    on each render has negligible performance cost. Using useCallback adds extra
    overhead for storing the memoized reference.
  - Shallow component trees: In small or simple components where child
    re-renders are inexpensive, memoizing functions is overkill and adds
    unnecessary complexity.
  - Frequently changing dependencies: If the function depends on state or props
    that change often, useCallback will recreate the function each time anyway.
    In such cases, the hook provides no performance benefit and just increases
    cognitive overhead.
  - Non-memoized children: If the child component receiving the function is not
    wrapped with React.memo (or otherwise does not rely on reference equality),
    memoizing the function has no effect on re-rendering.
- Key takeaway: useCallback is most effective in performance-sensitive
  situations, especially with large component trees or memoized child
  components. Otherwise, it may complicate code without noticeable benefits.
