
import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import {CountdownContext} from '../contexts/CountdownContext';


export function Countdown() {
  const {minutes, seconds, hasFinish, isActive, startCountdonw, resetCountdown } = useContext(CountdownContext)  

  const [minuteLeft, minuterigth] = String(minutes).padStart(2, '0').split('');
  const [secondleft, secondright] = String(seconds).padStart(2, '0').split('');



  return (
    <div>
    <div className={styles.CountdownContainer}>
      <div>
        <span>{minuteLeft}</span>
        <span>{minuterigth}</span>
      </div>
      <span>:</span>

      <div>
        <span>{secondleft}</span>
        <span>{secondright}</span>
      </div>

    </div>

    { hasFinish ? (
     <button disabled type="button" className={styles.countdownButton}>
          
     Ciclo encerrado</button>
    ) : (
      <>
        { isActive ? (
          <button type="button" onClick={resetCountdown} className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
            
          Abandonar Ciclo</button>
      ) : ( 
          <button type="button" onClick={startCountdonw} className={styles.countdownButton}>
            
          Iniciar Ciclo</button>
      )}
    </>
   
     )}
  
    </div>
  )
}