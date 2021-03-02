import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json';
import Cookies from  'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}


interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChalengesProviderProps{
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChalengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrenteExperience] = useState(rest.currentExperience ?? 0 );
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  
  useEffect(() => {
    Notification.requestPermission();
  }, [])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true)
  }

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))

  }, [level, currentExperience, challengesCompleted])


  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();
    if(Notification.permission === 'granted') {
      new Notification('Novo desafio!!!', {
        body: `valendo ${challenge.amount}xp`
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }
    const {amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    // aqui estou vereficando se sobrou exp para o prox nivel.. ex: ele tem 40 + ganhou 90, faltava 60 apenas para proximos nivel, 
    //entao chamo a func levelup() paara ele subir de nivel e somamos o que sobrar para o prox nivel; 
    if(finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrenteExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  return (
    <ChallengesContext.Provider 
    value={{
    level, 
    currentExperience, 
    challengesCompleted, 
    startNewChallenge, 
    levelUp, 
    activeChallenge, 
    resetChallenge, 
    experienceToNextLevel,
    completedChallenge,
    closeLevelUpModal
    }}>
          {children}
          
          
          {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}