import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'


export function ChallengeBox() {
  const {activeChallenge, resetChallenge, completedChallenge} = useContext(ChallengesContext);
  const {resetCountdown} = useContext(CountdownContext)

  function handleChallengeSucceeded() {
    completedChallenge();
    resetCountdown();
    
  }
 function handleChallengeFaild() {
   resetChallenge();
   resetCountdown();
 }


  return(
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
       <div className={styles.challengeActive}>
         <header>ganhe {activeChallenge.amount}</header>
         <main>
           <img src={`icons/${activeChallenge.type}.svg`}/>
           <strong>Novo desafio</strong>
           <p>{activeChallenge.description}</p>
         </main>

         <footer>
           <button className={styles.challengeFailButton} onClick={handleChallengeFaild} type="button">Falhei</button>
           <button className={styles.challengeSuccesButton} onClick={handleChallengeSucceeded} type="button">Completei</button>

         </footer>
       </div>
     ) : (
        <div className={styles.challengeNotActive}>
        <strong>Finalize um ciclo para receber um desafio!</strong>
        <p>
          <img src="icons/level-up.svg" alt="level up"/>
          Avance de level completando desafios!
        </p>
        </div>
     )}

    </div>
  )
}