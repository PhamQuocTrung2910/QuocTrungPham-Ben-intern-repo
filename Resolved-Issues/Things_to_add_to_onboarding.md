# Things to add to onboarding

- Pull Requests Should Come Earlier in the Onboarding Process
  - Purpose: Early pull requests (PRs) help new contributors learn the workflow
    faster and reduce the risk of last-minute, hard-to-review merges.
  - Expectation:
    - New developers should open their first PR within the first week of
      onboarding.
    - PRs can be small (e.g., fixing typos, updating README, or adding
      comments).
    - Use draft PRs for work-in-progress code to encourage feedback before
      completion.
  - Benefits:
    - Builds familiarity with GitHub workflow, branching strategy, and review
      process.
    - Ensures early visibility into coding style, conventions, and CI/CD checks.
    - Promotes collaboration instead of siloed development.
  - Outcome: A smoother onboarding process where contributors get hands-on
    experience early, while maintainers can guide them in real time.

- Guide on How to Use the Emulator
  - Purpose: Many contributors may not have physical devices available, so an
    emulator (Android Emulator, iOS Simulator, or platform-specific tools like
    Expo Go) is critical.
  - Expectation: Provide a step-by-step guide covering:
    - Installation of emulator tools (Android Studio, Xcode, or Expo).
    - How to configure system images (API level, device type, OS version).
    - Starting the emulator/simulator and connecting it to the dev environment.
    - Running the app on the emulator, including handling common issues (e.g.,
      build errors, slow performance).
    - Using debug tools (inspector, hot reload, logging).
  - Benefits:
    - New developers can test features immediately without needing specific
      hardware.
    - Standardized emulator setup reduces "it works on my machine" problems.
  - Outcome: Consistent development environment for all contributors, leading to
    easier debugging and reliable feature testing.

- Onboarding to the Codebase at the End Should Explain How the Project is
  Structured
  - Purpose: Once developers are comfortable with tools and workflows, they need
    a deeper understanding of the architecture and file structure of the
    project.
  - Expectation: Create an Onboarding Guide / Developer Handbook with:
    - Directory structure (where UI, business logic, assets, configs, and tests
      are located).
    - Architecture overview (e.g., MVC, MVVM, Redux, or Clean Architecture).
    - Key dependencies (state management library, navigation system, backend API
      clients, etc.).
    - Coding standards (linting rules, naming conventions, commit message
      guidelines).
    - Testing framework (unit, widget, integration tests).
  - Benefits:
    - Reduces the learning curve for new contributors.
    - Prevents misplacement of code and inconsistency.
    - Ensures maintainability and scalability.
  - Outcome: Developers can confidently navigate the project, add features, and
    debug issues without guesswork.

- A Video Demonstration of the Features of the Focus Bear App, Especially on
  Mobile
  - Purpose: A video demo provides a clear, engaging showcase of the app’s core
    functionality and user experience.
  - Expectation: Record a 3–5 minute guided walkthrough that includes:
    - Introduction: Purpose of Focus Bear and its role in productivity.
    - Core Features (especially on mobile):
      - Starting and stopping focus sessions.
      - Managing tasks and goals.
      - Blocking distractions.
      - Reviewing progress analytics.
    - User Journey: Show how a typical user would interact with the app from
      start to finish.
    - Narration or subtitles for accessibility.
  - Benefits:
    - Provides stakeholders, testers, and new users with a quick understanding
      of the app.
    - Helps developers visualize how their contributions fit into the end-user
      experience.
    - Can be reused for marketing, onboarding, or training.
  - Outcome: A polished, shareable video resource that clearly communicates the
    value and functionality of the Focus Bear app.
