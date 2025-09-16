import { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDecay,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const GesturePlayground = () => {
  const [gestureLog, setGestureLog] = useState([
    'Welcome! Start interacting...',
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Traditional Animated values for specific effects
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Reanimated shared values - these run on UI thread
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      try {
        fadeAnim.removeAllListeners();
        scaleAnim.removeAllListeners();
      } catch (error) {
        console.log('Cleanup error:', error);
      }
    };
  }, [fadeAnim, scaleAnim]);

  const addLog = message => {
    setGestureLog(prev => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...prev.slice(0, 9),
    ]);
  };

  // Simple pan gesture with error handling
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.1);
      runOnJS(addLog)('🖱️ Pan started');
    })
    .onUpdate(event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      // Add rotation based on movement distance
      const distance = Math.sqrt(
        event.translationX ** 2 + event.translationY ** 2
      );
      rotation.value = interpolate(
        distance,
        [0, 200],
        [0, 360],
        Extrapolation.CLAMP
      );
    })
    .onEnd(event => {
      scale.value = withSpring(1);

      // Simple decay animation
      translateX.value = withDecay({
        velocity: event.velocityX || 0,
        clamp: [-(SCREEN_WIDTH / 2), SCREEN_WIDTH / 2],
      });

      translateY.value = withDecay({
        velocity: event.velocityY || 0,
        clamp: [-(SCREEN_HEIGHT / 2), SCREEN_HEIGHT / 2],
      });

      rotation.value = withSpring(0);
      runOnJS(addLog)('🖱️ Pan ended');
    });

  // Handle tap events
  const handleTapPress = () => {
    addLog('👆 Tap detected');

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Handle long press events
  const handleLongPress = () => {
    addLog('⏰ Long press detected');
    Alert.alert('Long Press', 'Long press detected!', [
      {
        text: 'OK',
        onPress: () => addLog('✅ Alert dismissed'),
      },
    ]);
  };

  // Use only pan gesture to avoid conflicts
  const combinedGesture = panGesture;

  // Heavy task with better error handling
  const performHeavyTask = () => {
    if (isProcessing) return;

    setIsProcessing(true);
    addLog('🔄 Starting heavy task...');

    // Use requestAnimationFrame for smooth execution
    requestAnimationFrame(() => {
      const startTime = Date.now();

      // Simulate heavy computation
      let result = 0;
      for (let i = 0; i < 500000; i++) {
        result += Math.random();
      }

      const duration = Date.now() - startTime;

      setIsProcessing(false);
      addLog(`⚡ Completed in ${duration}ms`);

      Alert.alert(
        'Task Complete',
        `Result: ${result.toFixed(2)}\nTime: ${duration}ms`
      );
    });
  };

  // Animated styles using Reanimated
  const animatedBoxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const resetAnimations = () => {
    // Reset Reanimated values
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
    rotation.value = withSpring(0);
    opacity.value = withSpring(1);

    // Reset traditional Animated values
    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    addLog('🔄 Reset complete');
  };

  // Shake animation
  const shakeAnimation = () => {
    const shake = withTiming(-10, { duration: 50 }, () => {
      translateX.value = withTiming(10, { duration: 50 }, () => {
        translateX.value = withTiming(-5, { duration: 50 }, () => {
          translateX.value = withTiming(0, { duration: 50 });
        });
      });
    });

    translateX.value = shake;
    addLog('📳 Shake animation');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gesture & Animation Playground</Text>
        <Text style={styles.subtitle}>
          Fixed version - should work without crashes
        </Text>
      </View>

      {/* MAIN GESTURE TARGET */}
      <View style={styles.playground}>
        <GestureDetector gesture={combinedGesture}>
          <Reanimated.View style={[styles.gestureBox, animatedBoxStyle]}>
            <TouchableOpacity
              style={styles.touchArea}
              onPress={handleTapPress}
              onLongPress={handleLongPress}
              onPressIn={() => {
                // Simple press feedback
                scale.value = withSpring(0.95);
              }}
              onPressOut={() => {
                scale.value = withSpring(1);
              }}
              delayLongPress={1000}
              activeOpacity={1}
            >
              <Animated.View
                style={[
                  styles.innerBox,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <Text style={styles.boxText}>{isProcessing ? '⚙️' : '🎯'}</Text>
                <Text style={styles.boxSubtext}>
                  {isProcessing ? 'Processing...' : 'Touch me!'}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </Reanimated.View>
        </GestureDetector>
      </View>

      {/* CONTROL BUTTONS */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#e74c3c' }]}
          onPress={resetAnimations}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#f39c12' }]}
          onPress={performHeavyTask}
          disabled={isProcessing}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isProcessing ? '⚙️' : 'Heavy Task'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#9b59b6' }]}
          onPress={shakeAnimation}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Shake</Text>
        </TouchableOpacity>
      </View>

      {/* GESTURE LOG */}
      <View style={styles.logContainer}>
        <Text style={styles.logTitle}>Activity Log:</Text>
        {gestureLog.slice(0, 4).map((log, index) => (
          <Text
            key={`${index}-${log.slice(0, 10)}`}
            style={[styles.logText, { opacity: 1 - index * 0.2 }]}
          >
            {log}
          </Text>
        ))}
      </View>

      {/* INSTRUCTIONS */}
      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>Available Gestures:</Text>
        <Text style={styles.instruction}>🖱️ Drag to move with momentum</Text>
        <Text style={styles.instruction}>👆 Single tap for fade effect</Text>
        <Text style={styles.instruction}>
          👆👆 Double tap to reset position
        </Text>
        <Text style={styles.instruction}>⏰ Hold 1sec for long press</Text>
        <Text style={styles.instruction}>
          ⚙️ Heavy task demonstrates performance
        </Text>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
  },
  playground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  gestureBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  touchArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  innerBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    fontSize: 32,
    marginBottom: 2,
  },
  boxSubtext: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  logContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 15,
    padding: 12,
    borderRadius: 8,
  },
  logTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
  },
  logText: {
    color: '#ccc',
    fontSize: 11,
    marginVertical: 1,
  },
  instructions: {
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    margin: 15,
    padding: 12,
    borderRadius: 8,
    borderColor: '#3498db',
    borderWidth: 1,
  },
  instructionTitle: {
    color: '#3498db',
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 14,
  },
  instruction: {
    color: '#ccc',
    fontSize: 11,
    marginVertical: 1,
  },
});

export default GesturePlayground;
