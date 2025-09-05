# RN Components

- Research core React Native components (View, Text, Image, ScrollView,
  FlatList)

- View: The foundational container component in React Native. It supports layout
  using Flexbox, styling, some touch handling, and accessibility features. A
  View maps directly to the equivalent native container on each platform (e.g.,
  UIView on iOS, '< div >' on web, android.view on Android) and can be nested
  with zero or more children of any type.

- Ky Features:
  - Layout & Styling: Uses Flexbox for layout and accepts style props.
  - Touch & Accessibility: Can handle basic touch events and has accessibility
    props for assistive technologies.

- Text: Used for displaying text. It supports nesting, styling, and touch
  handling. For example, nested Text components inherit styles from parent, but
  can also override them.

- Use Cases & Notes:
  - Ideal for content with inline styling or nested formatting.
  - Supports onPress for handling touch interactions within text.
  - You can control layout via props like numberOfLines.

- Image: Displays images from a variety of sources such as, network URLs, static
  resources, local files, or data URI.

- Key Details:
  - Static Resources: Bundler resolves images via require('./my-icon.png'),
    supports @2x, @3x variants for screen densities—only the needed images get
    packaged.
  - Dynamic Sources: For network or data URIs, the image dimensions must be
    specified manually.
- Styling Modes: contain, cover, stretch, repeat, center are available for
  resizing and alignment behaviors.

- ScrollView: A general-purpose scrolling container that integrates with the
  native touch “responder” system.

- Functional Highlights:
  - Can scroll vertically or horizontally using the horizontal prop.
  - Supports pagination (pagingEnabled), pinch-to-zoom on iOS via
    maximumZoomScale and minimumZoomScale.
  - All children (even off-screen ones) are rendered, which may affect
    performance in long lists.

- Layout Tip: ScrollView needs a bounded height (or parents with bounded height)
  to function properly.

- FlatList: A high-performance component for rendering long, flat lists of
  similarly structured data. It renders only items currently visible on screen,
  conserving memory and enhancing responsiveness.

- Core Props:
  - data: your data array.
  - renderItem: function that returns a component for each item.
  - Additional props for layout control: ListHeaderComponent,
    ListFooterComponent, ListEmptyComponent, ItemSeparatorComponent, numColumns,
    and styling options like columnWrapperStyle.
  - extraData: like a marker to force re-render when data changes because
    FlatList is a PureComponent.

- Performance & Optimization:
  - Built upon VirtualizedList, which provides virtualization benefits such as
    windowing and incremental rendering.
  - Helps reduce memory usage and avoid blank areas during scrolling.

- References:
  - https://reactnative.dev/docs/view
  - https://reactnative.dev/docs/text
  - https://reactnative.dev/docs/image
  - https://reactnative.dev/docs/scrollview
  - https://reactnative.dev/docs/flatlist

- Refactor an existing React component to use React Native components

- Here is the React Component example that displays a greeting message and a
  button to toggle between "Hello" and "Goodbye" that we'll be refractoring:

```javascript
import React, { useState } from 'react';

const Greeting = () => {
  const [message, setMessage] = useState('Hello');

  const toggleMessage = () => {
    setMessage(prevMessage => (prevMessage === 'Hello' ? 'Goodbye' : 'Hello'));
  };

  return (
    <div style={styles.container}>
      <h1>{message}, welcome to my React app!</h1>
      <button onClick={toggleMessage} style={styles.button}>
        Toggle Greeting
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Greeting;
```

- Here is the refrctored component:

```javascript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Greeting = () => {
  const [message, setMessage] = useState('Hello');

  const toggleMessage = () => {
    setMessage(prevMessage => (prevMessage === 'Hello' ? 'Goodbye' : 'Hello'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {message}, welcome to my React Native app!
      </Text>
      <TouchableOpacity onPress={toggleMessage} style={styles.button}>
        <Text style={styles.buttonText}>Toggle Greeting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Greeting;
```

- Differneces:
  - View replaces div.
  - Text replaces h1 or text nodes.
  - TouchableOpacity replaces button and handles press events.
  - StyleSheet.create is used instead of inline styles for better performance
    and organization.

- Style the component using both inline styles and StyleSheet.create()

Refractored the component to use both inline styles & StyleSheet.create():

```javascript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Greeting = () => {
  const [message, setMessage] = useState('Hello');

  const toggleMessage = () => {
    setMessage(prevMessage => (prevMessage === 'Hello' ? 'Goodbye' : 'Hello'));
  };

  return (
    <View style={styles.container}>
      {/* Text uses StyleSheet style and inline style */}
      <Text
        style={[
          styles.greeting,
          { color: message === 'Hello' ? 'green' : 'red' },
        ]}
      >
        {message}, welcome to my React Native app!
      </Text>

      {/* Button uses only inline style for demonstration */}
      <TouchableOpacity
        onPress={toggleMessage}
        style={{
          backgroundColor: '#007AFF',
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Toggle Greeting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20,
    backgroundColor: '#f0f0f0', // Light grey background
  },
  greeting: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Greeting;
```

- Compare the differences in rendering and styling between web and React Native
  - Core Components and Rendering
    - Web React:
      - Uses standard HTML elements (div, p, h1, img, button).
      - Browser handles rendering, layout, and event systems.
    - DOM tree allows rich CSS selectors, pseudo-classes, and media queries.
    - Supports dynamic content updates efficiently via React’s virtual DOM.
    - Example Web React:

```javascript
<div style={{ textAlign: 'center' }}>
  <h1>Hello, Web!</h1>
  <button onClick={() => alert('Clicked!')}>Click Me</button>
</div>
```

- React Native:
  - Uses native UI primitives (View, Text, Image, TouchableOpacity).
  - Rendered components are converted to native UI elements via the React Native
    bridge.
  - No DOM or CSS; everything is controlled through JS objects and Flexbox.
  - Performance relies on minimizing bridge traffic between JS and native
    threads.
- Equivalent React Native Example:

```javascript
import { View, Text, TouchableOpacity } from 'react-native';

<View style={{ alignItems: 'center' }}>
  <Text>Hello, Native!</Text>
  <TouchableOpacity onPress={() => alert('Clicked!')}>
    <Text>Click Me</Text>
  </TouchableOpacity>
</View>;
```

- Key Difference: In React Native, there is no cascading styling or
  pseudo-classes. All styles must be explicitly applied.

- Styling Differences
  - Web React:
    - CSS is full-featured: supports cascading, media queries, pseudo-classes,
      and animations.
    - Units: px, em, rem, %.
    - Shorthand properties are fully supported: margin: 10px 5px.

  - React Native
    - Styling uses JavaScript objects, optionally centralized with
      StyleSheet.create().
    - Units are unitless numbers (interpreted as density-independent pixels).
    - Flexbox is the primary layout system.
    - Limited shorthand support; often need separate properties: marginTop,
      marginBottom.
    - Animations handled with Animated or Reanimated, not CSS transitions.
  - Example of conditional styling in React Native:

```javascript
<Text style={[styles.greeting, { color: isHello ? 'green' : 'red' }]}>
  {isHello ? 'Hello' : 'Goodbye'}
</Text>
```

- Observation: React Native styles are more explicit and require thinking in
  terms of layout rules and Flexbox, while web React can rely on cascading and
  responsive CSS.

- Reflections:
  - What are the key differences between < View > and < div >?
    - In React Native, < View > is the fundamental container component used to
      layout and style elements, similar in purpose to < div > in React web.
      However, < view > is optimized for mobile platforms and supports React
      Native-specific features like touch handling, accessibility, and native
      layout optimizations. Unlike < div >, < view > relies on Flexbox by
      default for layout, and it does not render HTML elements instead it maps
      to platform native UI elements (like UIView on iOS and View on Android).
      This makes it inherently different from < div >, which is part of the HTML
      DOM and can inherit styles from CSS.

  - How does StyleSheet.create() improve performance compared to inline styles?
    - StyleSheet.create() in React Native improves performance by pre-processing
      and freezing the style objects, assigning them unique IDs that are
      referenced internally rather than repeatedly creating new objects. Inline
      styles, by contrast, create new JavaScript objects on every render, which
      can lead to unnecessary re-renders and memory overhead. Using
      StyleSheet.create() allows the framework to optimize rendering and send
      only style IDs across the bridge to the native layer, reducing the
      workload on the JavaScript thread and improving rendering performance on
      mobile devices.

  - Why doesn’t React Native use className like React web?
    - React Native doesn’t use className like React web because it doesn’t rely
      on the DOM or CSS for styling. Instead, React Native uses a
      JavaScript-based styling approach that resembles CSS but is implemented as
      objects in JavaScript. Since there is no CSS file or stylesheet system
      that maps classes to DOM elements, className wouldn’t have any meaning.
      The styling approach in React Native is declarative, component-scoped, and
      works directly with native components, which is why style props and
      StyleSheet.create() are the preferred methods.
