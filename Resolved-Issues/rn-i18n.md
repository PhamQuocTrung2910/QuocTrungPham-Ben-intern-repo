# RN i18n

- Research how i18n works in React Native

- In React Native, internationalization (i18n) is the process of adapting an app
  to support multiple languages and regional formats, including text, numbers,
  dates, and currencies. Unlike web apps, React Native apps must handle these
  adaptations in a mobile context, which involves device-specific considerations
  such as locale settings, font support, and text layout. Libraries like
  react-i18next provide a structured way to manage translations by maintaining
  language resource files (typically JSON) and offering hooks or components to
  retrieve translated strings dynamically based on the user’s selected or
  device-default language. This approach ensures that the UI can reactively
  update whenever the language changes, without requiring full reloads of the
  app.

- How does react-i18next handle translations?

- react-i18next handles translations by maintaining a central translation store
  that maps keys to translated strings for each supported language. Developers
  define keys for each piece of text in the app, and these keys are associated
  with translations in different JSON files. The library exposes hooks like
  useTranslation and components like < Trans > to access these translations in
  functional components or JSX. It also supports features such as nested
  translations, interpolation of dynamic values, pluralization, and
  context-specific variants, which are crucial for making translations accurate
  and natural. Additionally, it can detect the user’s device language
  automatically or allow users to manually select a preferred language, updating
  the app’s text in real time.

- What challenges arise when localising a React Native app?

- Localising a React Native app comes with several challenges. One major issue
  is handling text expansion or contraction, as some languages take
  significantly more or fewer characters to convey the same meaning, which can
  break UI layouts if not properly designed. Right-to-left (RTL) languages like
  Arabic or Hebrew require flipping the entire UI, which can complicate styling
  and component positioning. Another challenge is ensuring that all content,
  including error messages, alerts, and dynamically loaded text, is translated.
  External dependencies or native modules may not always support localization,
  requiring additional wrappers or custom implementations. Cultural
  considerations, such as date formats, number separators, and pluralization
  rules, also vary widely and must be handled correctly to avoid confusing
  users.

- How would you test localisation support in an app?

- Testing localisation support in an app involves both functional and visual
  verification. Functionally, developers need to ensure that every string in the
  app is correctly translated and that switching languages dynamically updates
  the UI as expected. Tools like jest can be used for unit tests to check that
  keys are present in translation files and correctly mapped. Visual testing is
  also important, using devices or emulators set to different locales to verify
  that text fits appropriately, layouts remain consistent, and RTL/UIs behave
  correctly. Automated end-to-end tests can simulate user interactions in
  different languages, while manual testing may be required for subtle
  linguistic or cultural nuances that automated tests cannot capture. Ensuring
  proper localisation coverage requires a combination of these approaches to
  catch both technical and user-experience issues.

![Default English](ENG.png) ![Vietnamese Translation](VIET.png)
