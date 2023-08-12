import { useContext } from 'react'
import { LoggedInUserContext } from './App'


const Home = () => {

    const { currentUser } = useContext(LoggedInUserContext)

    return (
        <div className="mainDiv">
            <br></br><br></br><br></br><br></br><br></br>
            <h1>Welcome to PeakSync {currentUser.first_name}!</h1>
        </div>
    )
}

export default Home