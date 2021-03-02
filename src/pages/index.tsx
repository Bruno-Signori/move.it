import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";


import styles from '../styles/pages/Home.module.css';
import { Countdown } from "../components/Countdown";
import Head from 'next/head'
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengesContext";


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props) {
  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
    
    <div className={styles.container}>
      <Head>
        <title>Inicio | Moveit</title>
      </Head>
    <ExperienceBar />

    <CountdownProvider>
      <section>
          <div>
            <Profile  />
              <CompletedChallenges />
                <Countdown />
          </div>
          <div>
              <ChallengeBox />
          </div>
      </section>
      </CountdownProvider>

    </div>
  </ChallengesProvider>
  )
}

// infos que queremos disponibilizar para motores de busca devemos colocar no getServer
// as infos do buscadas no bando ja estarao disponiveis ao renderizar a page;
// getServer roda direto Node e nao no browser em si;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // chamada api 
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  return {
      props: {
         level: Number(level), 
         currentExperience: Number(currentExperience),  
         challengesCompleted: Number(challengesCompleted)
    }}
  }
