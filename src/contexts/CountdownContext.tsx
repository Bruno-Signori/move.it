import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountDownContextData {
  minutes: number;
  seconds: number;
  hasFinish: boolean;
  isActive: boolean;
  startCountdonw: () => void;
  resetCountdown: () => void;
}

interface CountDownProviderProps {
  children: ReactNode;
}


let countdownTimeout: NodeJS.Timeout;


export const CountdownContext = createContext({} as CountDownContextData)

export function CountdownProvider({children}: CountDownProviderProps ) {
  const {startNewChallenge} = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setAtive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);

  // Math.floor para arrendondar o numero
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;



  function startCountdonw() {
    setAtive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setAtive(false);
    setTime(0.1 * 60);
    setHasFinish(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time -1)
      }, 1000)
    } else if (isActive && time === 0 ){
     setHasFinish(true)
     setAtive(false);
     startNewChallenge();
    }
  },[isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinish,
      isActive,
      startCountdonw,
      resetCountdown


    }}>
      {children}
    </CountdownContext.Provider>
  )
}