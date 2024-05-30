import { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoggedInUserContext, AllEventsContext, AllMembershipsContext, AllSessionsContext } from '../App'

import styles from './Home.module.css';
import WhatIsPeakSync from './WhatIsPeakSync';

const Home = () => {

    const { currentUser } = useContext(LoggedInUserContext);
    const { allEvents } = useContext(AllEventsContext);
    const { allMemberships } = useContext(AllMembershipsContext);
    const { allSessions } = useContext(AllSessionsContext);

    const [loadingText, setLoadingText] = useState('');

    const whatIsPeakSyncRef = useRef(null);
    const scrollToTarget = (clickedRef, block= 'start') => {
        if (clickedRef.current) {
          clickedRef.current.scrollIntoView({ behavior: 'smooth', block: block });
        }
      }
    // useEffect(() => {
    //     if (localStorage.getItem("user_id")) setLoadingText('Checking user privileges...')
    // }, [])

    // useEffect(() => {
    //     if (Object.keys(currentUser).length > 0 || !localStorage.getItem("user_id")) {
    //         if (allEvents.length <= 0) setLoadingText('Retrieving calendar items...');
    //         else if (allMemberships.length <= 0) setLoadingText('Retrieving membership offerings...');
    //         else if (allSessions.length <= 0) setLoadingText('Retrieving event signups...');
    //         else setLoadingText("You're ready to go!")
    //     }
    // }, [loadingText, currentUser, allEvents, allMemberships, allSessions])

    return (
        <div>
            <div className={styles.mainDiv}>
                {/* <br></br><br></br><br></br><br></br><br></br> */}
                <div className={styles.welcomeWrapperDiv}>
                    <h1 className={styles.welcomeH1}>Welcome to PeakSync{Object.keys(currentUser).length ? ' ' + currentUser.first_name : null}.</h1>
                    <h2 className={styles.welcomeH2}>Let's get you started.</h2>
                    <button className={styles.whatIsPeakSyncButton} onClick={() => scrollToTarget(whatIsPeakSyncRef)}>What is PeakSync?</button>
                    {Object.keys(currentUser).length ?
                        <button className={styles.accountButton}>Dashboard</button>
                        :
                        <button className={styles.accountButton}><Link to='/signup' exact='true' className={styles.accountButtonLink}>Sign Up</Link></button>
                    }
                    {/* {loadingText !== "You're ready to go!" && <h2 className={styles.loadedH2}>Please allow the web service to spin up.</h2>}    */}
                    {/* {loadingText !== "You're ready to go!" && <h2 className={styles.loadedH2}>This may take up to one minute.</h2>} */}
                    {/* <h2 className={loadingText === "You're ready to go!" ? styles.loadedH2 : styles.loadingH2}>{loadingText}</h2> */}
                {/* <img className={styles.homeBackgroundImage} src='https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img> */}
                {/* <img src='https://media.discordapp.net/attachments/1036342122191781889/1243377073230319637/korntoast_A_man_at_home_on_his_couch_happily_typing_on_his_lapt_fa700e4e-0390-4eef-8119-6e8ba1697bda.png?ex=665140a3&is=664fef23&hm=938c846b13a9dd2e05d788aec7c23025399e05e8af4ea6bdb5b585de40e26d92&=&format=webp&quality=lossless&width=820&height=546'></img> */}
                </div>
            </div>
            <WhatIsPeakSync whatIsPeakSyncRef={whatIsPeakSyncRef} />
        </div>
    )
}

export default Home;