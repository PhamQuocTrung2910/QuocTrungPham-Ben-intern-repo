# RN Native Modules

- Research how native modules work in React Native

- Native modules in React Native provide a way to extend the capabilities of a
  React Native app by using platform-specific code that cannot be achieved using
  JavaScript alone. They act as a bridge between JavaScript and the native
  platform APIs, allowing developers to execute functionality written in
  Java/Kotlin for Android or Objective-C/Swift for iOS. When a native module is
  created, it exposes methods to JavaScript through the React Native bridge.
  This means that JavaScript can call native functions as if they were regular
  JS functions, and the bridge handles sending messages asynchronously between
  the JS runtime and the native environment. Native modules are particularly
  useful for accessing hardware features, third-party SDKs, or system services
  that are not yet supported in the React Native ecosystem.

- Explore existing React Native libraries that use native modules

- Several widely-used React Native libraries rely on native modules to deliver
  functionality that cannot be implemented purely in JavaScript. For example,
  react-native-camera allows access to the device camera and leverages native
  code for camera preview and photo/video capture.
  react-native-geolocation-service provides precise location tracking by
  interacting directly with Android and iOS location APIs. Another example is
  react-native-fs, which handles file system operations using native code. These
  libraries demonstrate how native modules enable React Native apps to achieve
  high-performance and platform-specific functionality that would otherwise be
  difficult or inefficient to implement in JS alone.

- Understand how to bridge Java/Kotlin (Android) and Objective-C/Swift (iOS)
  with JavaScript

- To create a bridge in React Native, you need to write a module in the native
  language of the target platform and expose its functions to JavaScript. For
  Android, this involves creating a Java or Kotlin class that extends
  ReactContextBaseJavaModule and annotates the functions with @ReactMethod so
  they can be called from JS. The module must also be registered with a
  ReactPackage so React Native knows it exists. On iOS, you define a class that
  inherits from NSObject and implements the RCTBridgeModule protocol. Functions
  exposed to JS use the RCT_EXPORT_METHOD macro. Once these native methods are
  registered, JavaScript can call them using the NativeModules API provided by
  React Native. Data passed between JS and native code is serialized as JSON,
  allowing for asynchronous communication across the bridge.

- Look into react-native-config for handling environment variables

- react-native-config is a library that simplifies handling environment-specific
  configuration in React Native apps. Instead of hardcoding API keys, URLs, or
  feature flags, developers can define these variables in .env files and access
  them at runtime through the Config object. The library uses native modules
  under the hood to make these variables available in both Android and iOS
  builds. This approach ensures that sensitive data is not exposed in the
  JavaScript bundle, supports multiple environments (development, staging,
  production), and avoids the need for conditional logic or repeated rebuilds to
  change configurations.

- Why would you need to use native modules in a React Native app?

- Native modules are necessary whenever JavaScript alone cannot achieve the
  desired functionality efficiently or at all. This includes accessing device
  hardware such as cameras, Bluetooth, sensors, or geolocation services;
  integrating with third-party native SDKs; improving performance for
  CPU-intensive tasks; or using platform-specific UI components. Native modules
  also enable React Native apps to maintain feature parity with fully native
  apps, ensuring that critical platform-specific capabilities are available
  without compromising on cross-platform code sharing.

- How does React Native communicate with native code?

- React Native communicates with native code through the bridge, an
  asynchronous, serialized messaging layer. JavaScript sends JSON messages over
  the bridge to invoke native methods, and the native side returns results or
  events in the same way. This architecture allows for decoupling between JS and
  native threads, preventing blocking of the main UI thread while native
  operations execute. React Native also supports event emitters, allowing native
  modules to push updates to JavaScript without a direct request, which is
  useful for real-time events like sensor readings or location updates.

- What are some challenges of maintaining native bridges?

- Maintaining native bridges in a React Native app introduces several
  challenges. Each platform (iOS and Android) requires separate codebases,
  meaning changes must often be implemented twice. Versioning and updates can
  break compatibility, especially if native APIs evolve or if the React Native
  core is upgraded. Debugging native modules can be more complex than pure JS,
  as it involves understanding the platform’s native development environment.
  Performance is another concern, since excessive communication over the bridge
  can lead to bottlenecks, particularly when transferring large datasets or
  frequent events. Finally, hiring or training developers who are proficient in
  both JavaScript and native languages is often necessary, adding to the
  project’s complexity.

[Using expo-constants and expo-device to display App Details and Device Details](<Expo native modules.png>)
