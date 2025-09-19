# RN Performance

- Research common React Native performance bottlenecks

- In React Native, performance bottlenecks often stem from rendering
  inefficiencies, excessive re-renders, or heavy computations on the main
  thread. Components that update frequently without proper memoization can
  trigger unnecessary re-renders, slowing down the UI. Large lists or complex
  layouts without virtualization can also degrade performance, as rendering many
  elements at once consumes significant CPU and memory. Additionally,
  synchronous tasks that block the JavaScript thread, such as heavy calculations
  or long API calls, can cause the app to feel sluggish or unresponsive.
  Animations not optimized through the native driver can also contribute to
  performance lags.

- Understand how React Native handles memory and garbage collection

- React Native manages memory through JavaScript’s garbage collector, which
  automatically frees memory occupied by objects no longer referenced in the
  code. However, improper memory management—such as holding references to unused
  objects or creating closures in large loops—can lead to memory leaks. Memory
  pressure can cause the garbage collector to work harder, sometimes introducing
  pauses that affect UI responsiveness. Understanding the distinction between
  the JavaScript heap and the native memory used by components like images and
  lists is essential for efficient memory use.

- Investigate performance monitoring tools for React Native

- Performance monitoring in React Native can be approached using both built-in
  tools and third-party libraries. The React DevTools Profiler allows developers
  to analyze component render times and identify unnecessary re-renders. For
  more detailed performance insights, tools like Flipper provide real-time
  metrics on memory, CPU usage, and network requests. Libraries like
  react-native-performance and react-native-fps-monitor can track frame rates,
  JavaScript thread utilization, and memory usage over time. Profiling with
  Xcode Instruments or Android Studio Profiler can help detect native
  performance bottlenecks and memory leaks, particularly in bridges between
  JavaScript and native code.

- What are the most common performance issues in React Native?

- Common performance issues in React Native include excessive re-rendering of
  components, inefficient list rendering, memory leaks, and blocking operations
  on the JavaScript thread. Developers often encounter UI jank when animations
  or gestures are processed on the main thread instead of offloading to the
  native driver. Large images or poorly optimized assets can inflate memory
  usage, leading to app crashes on lower-end devices. Network latency and
  unbatched API calls can further slow down rendering, particularly when large
  datasets are involved.

- How do useMemo and useCallback improve performance?

- Hooks like useMemo and useCallback improve performance by memoizing values and
  functions so that they are only recalculated or recreated when dependencies
  change. useMemo prevents expensive computations from running on every render,
  while useCallback ensures that function references remain stable across
  renders, which is especially useful when passing callbacks to child components
  that rely on reference equality to avoid unnecessary re-renders. By
  strategically using these hooks, developers can reduce the number of component
  updates and avoid wasted computation.

- What tools can you use to measure and monitor app performance?

- To measure and monitor app performance, developers can use tools like the
  React Native Performance Monitor (built into the developer menu), Flipper,
  React DevTools Profiler, and third-party packages like
  react-native-performance or react-native-fps-monitor. Native profiling tools
  such as Xcode Instruments for iOS and Android Studio Profiler for Android
  offer deep insights into CPU usage, memory allocation, and GPU performance.
  Logging and analytics platforms like Sentry, Firebase Performance Monitoring,
  or New Relic can track app performance in production, helping identify slow
  screens, crashes, and memory issues across different devices.

- Optimize rendering using useMemo, useCallback, and React.memo in intern.jsx

- React.memo Usage

- Header Component: Prevents re-rendering when title and subtitle props haven't
  changed.

```javascript
const Header = React.memo(({ title, subtitle }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
));
Header.displayName = 'Header';
```

- ControlButton Component: Prevents re-rendering of individual buttons when
  other buttons' props change.

```javascript
const ControlButton = React.memo(
  ({
    onPress,
    disabled = false,
    backgroundColor,
    children,
    isProcessing = false,
  }) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, opacity: disabled ? 0.5 : 1 }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{isProcessing ? '⚙️' : children}</Text>
    </TouchableOpacity>
  )
);
ControlButton.displayName = 'ControlButton';
```

- ActivityLog Component: Prevents re-rendering when logs array reference hasn't
  changed + internal useMemo for slicing optimization.

```javascript
const ActivityLog = React.memo(({ logs }) => {
  const displayedLogs = useMemo(() => logs.slice(0, 4), [logs]);

  return (
    <View style={styles.logContainer}>
      <Text style={styles.logTitle}>Activity Log:</Text>
      {displayedLogs.map((log, index) => (
        <Text
          key={`log-${index}-${Date.now()}`}
          style={[styles.logText, { opacity: 1 - index * 0.2 }]}
        >
          {log}
        </Text>
      ))}
    </View>
  );
});
ActivityLog.displayName = 'ActivityLog';
```

- Instructions Component: Prevents re-rendering of static instructions content
  (no props, so never re-renders).

```javascript
const Instructions = React.memo(() => (
  <View style={styles.instructions}>
    <Text style={styles.instructionTitle}>Available Gestures:</Text>
    <Text style={styles.instruction}>🖱️ Drag to move with momentum</Text>
    <Text style={styles.instruction}>👆 Single tap for fade effect</Text>
    <Text style={styles.instruction}>👆👆 Double tap to reset position</Text>
    <Text style={styles.instruction}>⏰ Hold 1sec for long press</Text>
    <Text style={styles.instruction}>
      ⚙️ Heavy task demonstrates performance
    </Text>
  </View>
));
Instructions.displayName = 'Instructions';
```

- useMemo Usage

- Screen Constraints Calculation: Prevents recalculating screen boundaries on
  every render (expensive math operations).

```javascript
const screenConstraints = useMemo(
  () => ({
    maxTranslateX: SCREEN_WIDTH * 0.3,
    maxTranslateY: SCREEN_HEIGHT * 0.3,
    minTranslateX: -(SCREEN_WIDTH * 0.3),
    minTranslateY: -(SCREEN_HEIGHT * 0.3),
  }),
  []
);
```

- Animation Configurations: Prevents recreating animation config objects on
  every render.

```javascript
const animationConfigs = useMemo(
  () => ({
    spring: {
      damping: 15,
      stiffness: 150,
      mass: 1,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
    timing: { duration: 150 },
  }),
  []
);
```

- Button Configurations: Prevents recreating button configuration array on every
  render.

```javascript
const buttonConfigs = useMemo(
  () => [
    {
      key: 'reset',
      backgroundColor: '#e74c3c',
      text: 'Reset',
      action: 'reset',
    },
    {
      key: 'heavy',
      backgroundColor: '#f39c12',
      text: 'Heavy Task',
      action: 'heavy',
    },
    {
      key: 'shake',
      backgroundColor: '#9b59b6',
      text: 'Shake',
      action: 'shake',
    },
  ],
  []
);
```

- useCallback Usage

- Log Addition Function: Stable reference for logging function used in gesture
  handlers and other callbacks.

```javascript
const addLog = useCallback(message => {
  setGestureLog(prev => {
    const timestamp = new Date().toLocaleTimeString();
    return [`${timestamp}: ${message}`, ...prev.slice(0, 9)];
  });
}, []);
```

- Tap Handler: Prevents recreating tap handler on every render, stable reference
  for TouchableOpacity.

```javascript
const handleTapPress = useCallback(() => {
  addLog('👆 Tap detected');

  Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 0.3,
      duration: animationConfigs.timing.duration,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: animationConfigs.timing.duration,
      useNativeDriver: true,
    }),
  ]).start();
}, [addLog, fadeAnim, animationConfigs.timing.duration]);
```
