import { useContext, useState, useEffect } from 'react'
import { LoggedInUserContext, AllEventsContext, AllMembershipsContext, AllSessionsContext } from './App'

import styles from './Home.module.css';

const Home = () => {

    const { currentUser } = useContext(LoggedInUserContext);
    const { allEvents } = useContext(AllEventsContext);
    const { allMemberships } = useContext(AllMembershipsContext);
    const { allSessions } = useContext(AllSessionsContext);

    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        if (localStorage.getItem("user_id")) setLoadingText('Checking user privileges...')
    }, [])

    useEffect(() => {
        if (Object.keys(currentUser).length > 0 || !localStorage.getItem("user_id")) {
            if (allEvents.length <= 0) setLoadingText('Retrieving calendar items...');
            else if (allMemberships.length <= 0) setLoadingText('Retrieving membership offerings...');
            else if (allSessions.length <= 0) setLoadingText('Retrieving event signups...');
            else setLoadingText("You're ready to go!")
        }
    }, [loadingText, currentUser, allEvents, allMemberships, allSessions])

    return (
        <div className="mainDiv">
            <br></br><br></br><br></br><br></br><br></br>
            <h1 className={styles.welcomeH1}>Welcome to PeakSync {currentUser.first_name}!</h1>
            {loadingText !== "You're ready to go!" && <h2 className={styles.loadedH2}>Please allow the web service to spin up.</h2>}   
            {loadingText !== "You're ready to go!" && <h2 className={styles.loadedH2}>This may take up to one minute.</h2>}
            <h2 className={loadingText === "You're ready to go!" ? styles.loadedH2 : styles.loadingH2}>{loadingText}</h2>
            {/* <img src='https://media.discordapp.net/attachments/1036342122191781889/1243375755778457711/korntoast_A_fit_woman_who_is_an_employee_of_a_rock_climbing_gym_87c69515-9755-4906-a917-1ecc840d82a7.png?ex=66513f68&is=664fede8&hm=5be5315745cbe6fcfc14f77a9c87b6c9b434599f03decf91a490810d04d36776&=&format=webp&quality=lossless&width=820&height=546'></img> */}
            {/* <img src='https://media.discordapp.net/attachments/1036342122191781889/1243377073230319637/korntoast_A_man_at_home_on_his_couch_happily_typing_on_his_lapt_fa700e4e-0390-4eef-8119-6e8ba1697bda.png?ex=665140a3&is=664fef23&hm=938c846b13a9dd2e05d788aec7c23025399e05e8af4ea6bdb5b585de40e26d92&=&format=webp&quality=lossless&width=820&height=546'></img> */}
        </div>
    )
}

export default Home;