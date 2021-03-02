import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChellenges.module.css'

export function CompletedChallenges() {
  const {challengesCompleted} = useContext(ChallengesContext)

  return (
    <div className={styles.completedChellengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>

    </div>
  )
}