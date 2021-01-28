import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler'

export default function App() {
  const blocoTranslateY = new Animated.Value(0);
  const blocoTranslateX = new Animated.Value(0);
  const offset = {x: 0, y: 0};
  const st = {
    backgroundColor: 'red',
    transform:[
      {
        translateY: blocoTranslateY,

      },
      {
        translateX: blocoTranslateX,
      }
    ]
  }

  const onGestureHandler = Animated.event(
    [{nativeEvent: {
      translationY: blocoTranslateY,
      translationX : blocoTranslateX
    }}],
    {
      useNativeDriver: true,
      listener: (event) => console.log(event.nativeEvent)
    }

  )

  const stateChangeHandler = (event) => {
    console.log('state changed')
     if(event.nativeEvent.state === State.END)
    {
      offset.x += event.nativeEvent.translationX;
      offset.y += event.nativeEvent.translationY;
      blocoTranslateX.setOffset(offset.x);
      blocoTranslateX.setValue(0);
      blocoTranslateY.setOffset(offset.y);
      blocoTranslateY.setValue(0);
    }
  }

  /*function onGestureHandler(event)
  {
    console.log(event.nativeEvent);
  }*/

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureHandler}
        onHandlerStateChange={(event) => stateChangeHandler(event)}
        >
        <Animated.View style={[styles.bloco, st]}>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloco:{
    backgroundColor: 'red',
    width: 100,
    height: 100,
  }
});
