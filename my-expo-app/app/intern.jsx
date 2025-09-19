import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Fixed import
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
  Extrapolate, // Fixed: was Extrapolation
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 1. MEMOIZED SUB-COMPONENTS
const Header = React.memo(({ title, subtitle }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
));
Header.displayName = 'Header';

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

const ActivityLog = React.memo(({ logs }) => {
  const displayedLogs = useMemo(() => logs.slice(0, 4), [logs]);

  return (
    <View style={styles.logContainer}>
      <Text style={styles.logTitle}>Activity Log:</Text>
      {displayedLogs.map((log, index) => (
        <Text
          key={`log-${index}-${Date.now()}`} // More stable key
          style={[styles.logText, { opacity: 1 - index * 0.2 }]}
        >
          {log}
        </Text>
      ))}
    </View>
  );
});
ActivityLog.displayName = 'ActivityLog';

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

const GesturePlayground = () => {
  const [gestureLog, setGestureLog] = useState([
    'Welcome! Start interacting...',
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Traditional Animated values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Reanimated shared values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  // 2. MEMOIZED VALUES - Fixed calculations
  const screenConstraints = useMemo(
    () => ({
      maxTranslateX: SCREEN_WIDTH * 0.3, // Reduced for safety
      maxTranslateY: SCREEN_HEIGHT * 0.3,
      minTranslateX: -(SCREEN_WIDTH * 0.3),
      minTranslateY: -(SCREEN_HEIGHT * 0.3),
    }),
    []
  );

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

  // 3. STABLE CALLBACKS
  const addLog = useCallback(message => {
    setGestureLog(prev => {
      const timestamp = new Date().toLocaleTimeString();
      return [`${timestamp}: ${message}`, ...prev.slice(0, 9)];
    });
  }, []);

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

  const handleLongPress = useCallback(() => {
    addLog('⏰ Long press detected');
    Alert.alert('Long Press', 'Long press detected!', [
      {
        text: 'OK',
        onPress: () => addLog('✅ Alert dismissed'),
      },
    ]);
  }, [addLog]);

  const handlePressIn = useCallback(() => {
    'worklet';
    scale.value = withSpring(0.95, animationConfigs.spring);
  }, [scale, animationConfigs.spring]);

  const handlePressOut = useCallback(() => {
    'worklet';
    scale.value = withSpring(1, animationConfigs.spring);
  }, [scale, animationConfigs.spring]);

  const resetAnimations = useCallback(() => {
    // Reset Reanimated values with proper spring config
    translateX.value = withSpring(0, animationConfigs.spring);
    translateY.value = withSpring(0, animationConfigs.spring);
    scale.value = withSpring(1, animationConfigs.spring);
    rotation.value = withSpring(0, animationConfigs.spring);
    opacity.value = withSpring(1, animationConfigs.spring);

    // Reset traditional Animated values
    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start();

    addLog('🔄 Reset complete');
  }, [
    translateX,
    translateY,
    scale,
    rotation,
    opacity,
    fadeAnim,
    scaleAnim,
    addLog,
    animationConfigs.spring,
  ]);

  const performHeavyTask = useCallback(() => {
    if (isProcessing) return;

    setIsProcessing(true);
    addLog('🔥 Starting heavy task...');

    // Use setTimeout instead of requestAnimationFrame for RN compatibility
    setTimeout(() => {
      const startTime = Date.now();
      let result = 0;

      // Reduced iterations for mobile performance
      for (let i = 0; i < 100000; i++) {
        result += Math.random();
      }

      const duration = Date.now() - startTime;
      setIsProcessing(false);
      addLog(`⚡ Completed in ${duration}ms`);

      Alert.alert(
        'Task Complete',
        `Result: ${result.toFixed(2)}\nTime: ${duration}ms`
      );
    }, 10);
  }, [isProcessing, addLog]);

  const shakeAnimation = useCallback(() => {
    const shakeSequence = () => {
      'worklet';
      translateX.value = withTiming(-10, { duration: 50 }, () => {
        translateX.value = withTiming(10, { duration: 50 }, () => {
          translateX.value = withTiming(-5, { duration: 50 }, () => {
            translateX.value = withTiming(0, { duration: 50 });
          });
        });
      });
    };

    shakeSequence();
    addLog('📳 Shake animation');
  }, [translateX, addLog]);

  const handleButtonPress = useCallback(
    action => {
      switch (action) {
        case 'reset':
          resetAnimations();
          break;
        case 'heavy':
          performHeavyTask();
          break;
        case 'shake':
          shakeAnimation();
          break;
        default:
          console.warn('Unknown action:', action);
          break;
      }
    },
    [resetAnimations, performHeavyTask, shakeAnimation]
  );

  // 4. MEMOIZED GESTURE - Fixed Extrapolate import
  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .onBegin(() => {
        'worklet';
        scale.value = withSpring(1.1, animationConfigs.spring);
        runOnJS(addLog)('🖱️ Pan started');
      })
      .onUpdate(event => {
        'worklet';
        translateX.value = event.translationX;
        translateY.value = event.translationY;

        const distance = Math.sqrt(
          event.translationX ** 2 + event.translationY ** 2
        );
        rotation.value = interpolate(
          distance,
          [0, 200],
          [0, 360],
          Extrapolate.CLAMP // Fixed: now using correct import
        );
      })
      .onEnd(event => {
        'worklet';
        scale.value = withSpring(1, animationConfigs.spring);

        // Safe velocity values
        const velocityX = event.velocityX || 0;
        const velocityY = event.velocityY || 0;

        translateX.value = withDecay({
          velocity: velocityX,
          clamp: [
            screenConstraints.minTranslateX,
            screenConstraints.maxTranslateX,
          ],
          deceleration: 0.998,
        });

        translateY.value = withDecay({
          velocity: velocityY,
          clamp: [
            screenConstraints.minTranslateY,
            screenConstraints.maxTranslateY,
          ],
          deceleration: 0.998,
        });

        rotation.value = withSpring(0, animationConfigs.spring);
        runOnJS(addLog)('🖱️ Pan ended');
      });
  }, [
    scale,
    translateX,
    translateY,
    rotation,
    addLog,
    animationConfigs,
    screenConstraints,
  ]);

  // 5. MEMOIZED ANIMATED STYLES
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
  }, []);

  const innerBoxAnimatedStyle = useMemo(
    () => ({
      opacity: fadeAnim,
      transform: [{ scale: scaleAnim }],
    }),
    [fadeAnim, scaleAnim]
  );

  // Proper cleanup
  useEffect(() => {
    return () => {
      try {
        fadeAnim.removeAllListeners?.();
        scaleAnim.removeAllListeners?.();
      } catch (error) {
        console.warn('Cleanup error:', error);
      }
    };
  }, [fadeAnim, scaleAnim]);

  // 6. MEMOIZED RENDER ELEMENTS
  const renderButtons = useMemo(
    () =>
      buttonConfigs.map(config => (
        <ControlButton
          key={config.key}
          onPress={() => handleButtonPress(config.action)}
          disabled={config.action === 'heavy' ? isProcessing : false}
          backgroundColor={config.backgroundColor}
          isProcessing={config.action === 'heavy' ? isProcessing : false}
        >
          {config.text}
        </ControlButton>
      )),
    [buttonConfigs, handleButtonPress, isProcessing]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <GestureHandlerRootView style={styles.container}>
        <Header
          title="Gesture & Animation Playground"
          subtitle="Optimized & Expo Compatible"
        />

        {/* MAIN GESTURE TARGET */}
        <View style={styles.playground}>
          <GestureDetector gesture={panGesture}>
            <Reanimated.View style={[styles.gestureBox, animatedBoxStyle]}>
              <TouchableOpacity
                style={styles.touchArea}
                onPress={handleTapPress}
                onLongPress={handleLongPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                delayLongPress={1000}
                activeOpacity={1}
              >
                <Animated.View style={[styles.innerBox, innerBoxAnimatedStyle]}>
                  <Text style={styles.boxText}>
                    {isProcessing ? '⚙️' : '🎯'}
                  </Text>
                  <Text style={styles.boxSubtext}>
                    {isProcessing ? 'Processing...' : 'Touch me!'}
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </Reanimated.View>
          </GestureDetector>
        </View>

        {/* CONTROL BUTTONS */}
        <View style={styles.controls}>{renderButtons}</View>

        {/* GESTURE LOG */}
        <ActivityLog logs={gestureLog} />

        {/* INSTRUCTIONS */}
        <Instructions />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
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
    maxHeight: 120,
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
