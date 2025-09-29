# RN Key Libraries

- Research what each library does and how it fits into the app
  - Navigation & UI Libraries
    - Focus Bear uses several libraries to handle navigation and the overall
      user interface. @react-navigation/native, @react-navigation/stack, and
      @react-navigation/bottom-tabs provide the infrastructure for switching
      between screens and structuring the app’s flow. For example, Focus Bear
      likely has a home dashboard, focus timer screens, reports, and
      settings—all of which are connected through this navigation stack and tab
      system.
    - react-native-vector-icons allows the app to use consistent, scalable icons
      across buttons and menus. @rneui/themed provides prebuilt UI components
      like buttons, cards, sliders, and inputs that follow a cohesive design
      system.
    - Finally, react-native-gesture-handler improves touch interactions, letting
      the app respond more smoothly to swipes, drags, and taps, which are
      important for a productivity app with timers and blocking features.

  - State Management & Data Handling
    - For global state, Focus Bear relies on redux. This keeps the app’s data
      (like current focus session, user preferences, or routines) predictable
      and accessible across components. redux-thunk enables asynchronous logic
      inside Redux, so the app can fetch data or perform background logic before
      updating the state.
    - To ensure data persists between sessions, redux-persist saves parts of the
      Redux store to storage. Separately,
      @react-native-async-storage/async-storage provides a key–value storage
      system for persisting small amounts of user data locally—like settings,
      cached responses, or tokens.

  - Networking & Real-Time Communication
    - Focus Bear needs to talk to servers for syncing routines, fetching
      updates, and possibly sharing data across devices. For this, it uses
      axios, a popular HTTP client, along with axios-retry, which automatically
      retries failed requests (useful for flaky mobile networks).
    - For real-time features, Focus Bear integrates
      @pusher/pusher-websocket-react-native. This library maintains live
      WebSocket connections, allowing the app to instantly receive updates—for
      example, syncing focus sessions across devices or pushing new blocklist
      rules from a backend.

  - Authentication & Security
    - To handle user accounts, Focus Bear uses react-native-auth0. This library
      connects the app with Auth0’s authentication service, simplifying login
      flows (email, Google, etc.) and token management.
    - For iOS users, @invertase/react-native-apple-authentication provides the
      “Sign in with Apple” feature. This is required for compliance with Apple’s
      App Store rules and ensures iPhone and iPad users can authenticate using
      their Apple ID in a secure, native way.

  - Background Services & Performance
    - Because Focus Bear runs timers and needs to enforce focus sessions even
      when the app is in the background, it relies on
      react-native-background-fetch and react-native-background-timer. These
      libraries let the app perform scheduled background tasks—for example,
      checking whether to block distractions or send a notification at the end
      of a focus session.
    - react-native-reanimated improves animation performance by running
      animation logic on the UI thread. This makes interactions and transitions
      smooth, even if the JavaScript thread is busy.

  - Internationalisation & Accessibility
    - To support multiple languages and make the app usable worldwide, Focus
      Bear uses i18next and react-i18next. These libraries manage translations
      and make it easy to switch languages dynamically.
    - react-native-localize helps detect the device’s locale and region, so the
      app can automatically display the correct language and formatting.

  - Logging, Crash Reporting & Analytics
    - For reliability and monitoring, Focus Bear integrates
      @sentry/react-native. This captures runtime errors and crashes, giving
      developers visibility into problems users encounter.
    - It also uses posthog-react-native for analytics, which tracks user
      behavior and interactions. This helps the team improve the app by
      understanding how people actually use it.

- Pick three libraries and write a brief explanation of their purpose

- React Native Reanimated: This library powers smooth animations by offloading
  animation work to the UI thread. In Focus Bear, it likely animates transitions
  between focus/break screens, progress bars, and gestures without lag. It’s
  especially powerful when combined with gesture handling for interactive UI.

- React Native Background Fetch: This lets Focus Bear run tasks periodically in
  the background. For instance, the app can wake up every so often to check
  whether to enforce a focus block, sync routines with the backend, or refresh
  notifications—even if the user isn’t actively using the app.

- @pusher/pusher-websocket-react-native: This library provides real-time
  communication via WebSockets. Focus Bear may use it to keep data synced
  instantly across devices or to push live updates from the server, like changes
  to a schedule or group accountability sessions.

- Identify a library that you’re unfamiliar with and summarize how it works

- @invertase/react-native-apple-authentication: This library enables “Sign in
  with Apple” in React Native apps. It wraps Apple’s native authentication APIs,
  presenting the Apple login sheet and returning identity tokens and user info.
  Focus Bear likely uses this to allow iOS users to log in securely with their
  Apple ID, fulfilling Apple’s requirements while integrating smoothly with its
  Auth0-based authentication system. I am unfamiliar with this one as i have
  always used an Android phone and windows computer hence the lack of knowledge
  on Apple/IOS devices.

- What is the purpose of Redux-Persist, and why is it useful?

- In React Native, the Redux store is reset every time the app reloads or
  restarts. redux-persist solves this by saving parts of the store into device
  storage (usually AsyncStorage). This way, app state can survive restarts.
- In Focus Bear, that means things like the user’s login session, current
  focus/break timer, or routine settings won’t be lost when the app is closed.
  It gives the user continuity instead of starting from scratch.

- How does react-native-background-fetch differ from a normal timer?

- A normal JavaScript timer (setInterval, setTimeout) only runs while the app is
  active. Once the app is backgrounded or killed, those timers stop.
- react-native-background-fetch hooks into the native background task systems of
  iOS and Android. Even if the user swipes the app away or locks the phone, the
  OS can wake it up periodically so it can run tasks.
- For Focus Bear, this is how the app can still enforce focus sessions, send
  reminders, or sync data even when the user isn’t actively looking at the app.
- Why does Focus Bear use Auth0 instead of handling authentication manually?

- In React Native, handling authentication manually would mean building secure
  login, token storage, OAuth flows, and identity management from scratch.
  That’s risky and time-consuming.
- Auth0 provides a secure, battle-tested system for authentication that
  integrates well with React Native. It supports multiple providers (Google,
  Apple, email/password, etc.) without Focus Bear needing to implement each one
  individually. It also reduces liability by outsourcing complex security tasks
  to a dedicated service.

- How does PostHog help improve the user experience in Focus Bear?

- PostHog tracks how users interact with the app. It collects data like which
  screens are most visited, where people drop out of flows, or how often certain
  features are used.
- For Focus Bear, this helps the team identify pain points—like if users often
  abandon the onboarding flow or rarely use a particular feature. With that
  insight, the app can be improved based on real usage data, not just
  assumptions.

- What’s the difference between Sentry and PostHog, and when would you use each?

- Sentry is for catching and diagnosing errors and crashes. In React Native, it
  reports stack traces and device info when something goes wrong. This helps
  developers fix bugs.

- PostHog is for analytics and product insights. It tracks how people use the
  app, not when it crashes.
  - In Focus Bear:
    - Use Sentry to figure out why a focus session might crash on some devices.
    - Use PostHog to see if the focus timer feature is actually being used as
      intended.

- How does react-native-localize work, and how does it interact with i18next?

- react-native-localize checks the device settings for things like language,
  region, and time format. It tells the app what the user prefers.
- i18next then takes that info and loads the correct translation files so the
  app’s text shows up in the right language.
- In Focus Bear, this means a French user will see the interface in French
  automatically, without having to change any settings in the app.

- If you had to remove one library and replace it with an alternative, which one
  would you choose and why?

- I would remove Axios (and axios-retry) and replace it with the native fetch
  API that already comes with React Native.
- Fetch is built-in, standards-based, and reliable. Retry logic could be added
  with a small wrapper, so the extra dependency isn’t really necessary.
- Other libraries in Focus Bear (like redux-persist, background-fetch, or Auth0)
  solve problems that don’t have simple built-in alternatives. Axios is more of
  a convenience layer, so it’s the easiest one to swap out without losing
  critical functionality.
