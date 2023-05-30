import "../index.css";

import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from "./NavBar.js";
import Home from "./Home.js";
import EventsCalendar from "./Calendar/EventsCalendar.js"
import Login from "./Account/Login.js"
import SignUp from "./Account/SignUp.js"
import UserDatabase from "./AdminDashboard/UserDatabase.js"
import UserProfile from "./UserProfile/UserProfile.js";
import AdminDashboard from "./AdminDashboard/AdminDashboard.js";
import MembershipOfferings from "./Offerings/MembershipOfferings.js";
import ClassOfferings from "./Offerings/ClassOfferings.js";
import ConfirmMembershipOrderDetails from "./Offerings/ConfirmMembershipOrderDetails.js";
import ConfirmClassSignupDetails from "./Offerings/ConfirmClassSignupDetails.js";
import CancelledSignup from "./Stripe/CancelledSignup.js";
import SuccessfulSignup from "./Stripe/SuccessfulSignup.js";
import EditSignup from './AdminDashboard/Edit/EditSignup.js'
import SuccessfulMembershipPurchase from "./Stripe/SuccessfulMembershipPurchase";
import CancelledMembershipPurchase from "./Stripe/CancelledMembershipPurchase";

export const AllUsersContext = React.createContext()
export const AllEventsContext = React.createContext()
export const AllSessionsContext = React.createContext()
export const AllSignupsContext = React.createContext()
export const AllMembershipsContext = React.createContext()
export const GeneralToggleContext = React.createContext()
export const LoggedInUserContext = React.createContext()
export const CurrentTransactionContext = React.createContext()

function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [allSessions, setAllSessions] = useState([])
  const [allSignups, setAllSignups] = useState([])
  const [allMemberships, setAllMemberships] = useState([])
  const [generalToggle, setGeneralToggle] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState({})

  const allUsersContextObject = {
    allUsers,
    setAllUsers
  }

  const allEventsContextObject = {
    allEvents,
    setAllEvents
  }

  const allSessionsContextObject = {
    allSessions,
    setAllSessions
  }

  const allSignupsContextObject = {
    allSignups,
    setAllSignups
  }

  const allMembershipsContextObject = {
    allMemberships,
    setAllMemberships
  }

  const generalToggleContextObject = {
    generalToggle,
    setGeneralToggle
  }

  const loggedInUserContextObject = {
    currentUser,
    setCurrentUser
  }

  const currentTransactionContextObject = {
    currentTransaction,
    setCurrentTransaction
  }

  // useEffect(() => {
  //   setGeneralToggle(!generalToggle)
  // }, [])
        
  const fetchLoggedInUser = (sessionData) => {
    fetch(`/users/${sessionData}`)
    .then((response) => response.json())
    .then((userData) => {
        setCurrentUser(userData)
    })
  }

  useEffect(() => {
    fetch('/check-session')
    .then((response) => response.json())
    .then((sessionData) => {
      console.log(sessionData)
      fetchLoggedInUser(sessionData)
    })
  }, [generalToggle])

  useEffect(() => {
    fetch("/events")
    .then((response) => response.json())
    .then((eventData) => {
      setAllEvents(eventData)
    })
  }, [generalToggle])
  
  useEffect(() => {
    fetch("/memberships")
    .then((response) => response.json())
    .then((membershipData) => {
      setAllMemberships(membershipData)
    })
  }, [generalToggle])

  useEffect(() => {
    fetch('/sessions')
    .then((response) => response.json())
    .then((allSessionsData) => {
      setAllSessions(allSessionsData)
    })
  }, [allEvents, generalToggle])

  useEffect(() => {
    if (currentUser.admin === true) {
      fetch("/users")
      .then((response) => response.json())
      .then((userData) => {
        setAllUsers(userData)
      })
    } else {
      console.log("No admin priveledges")
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser.admin === true) {
      fetch('/signups')
      .then((response) => response.json())
      .then((signupData) => setAllSignups(signupData))
    }
  }, [currentUser])



  return (
    <>
    <AllUsersContext.Provider value={allUsersContextObject}>
      <AllEventsContext.Provider value={allEventsContextObject}>
        <AllSessionsContext.Provider value={allSessionsContextObject}>
          <AllMembershipsContext.Provider value={allMembershipsContextObject}>
            <AllSignupsContext.Provider value={allSignupsContextObject}>
              <GeneralToggleContext.Provider value={generalToggleContextObject}>
                <LoggedInUserContext.Provider value={loggedInUserContextObject}>
                  <CurrentTransactionContext.Provider value={currentTransactionContextObject}>
                    <NavBar/>
                    <Switch>
                      <Route exact path='/'>
                        <Home currentUser={currentUser} />
                      </Route>
                      <Route exact path='/calendar'>
                        <EventsCalendar />
                      </Route>
                      <Route exact path='/login'>
                        <Login />
                      </Route>
                      <Route exact path='/signup'>
                        <SignUp />
                      </Route>
                      <Route exact path='/admin-dashboard'>
                        {currentUser.admin ? 
                        <AdminDashboard />
                        : <Home />}
                      </Route>
                      <Route exact path='/database'>
                        <UserDatabase />
                      </Route>
                      <Route exact path='/profile'>
                        <UserProfile />
                      </Route>
                      <Route exact path='/offerings/memberships'>
                        <MembershipOfferings />
                      </Route>
                      <Route exact path='/offerings/classes'>
                        <ClassOfferings />
                      </Route>
                      <Route exact path='/edit/signup'>
                        <EditSignup />
                      </Route>
                      <Route exact path='/confirm-membership-order'>
                        <ConfirmMembershipOrderDetails />
                      </Route>
                      <Route exact path='/confirm-event-order'>
                        <ConfirmClassSignupDetails />
                      </Route>
                      <Route exact path='/signup/cancelled'>
                        <CancelledSignup />
                      </Route>
                      <Route exact path='/signup/success'>
                        <SuccessfulSignup />
                      </Route>
                      <Route exact path='/purchase/membership/success'>
                        <SuccessfulMembershipPurchase />
                      </Route>
                      <Route exact path='/purchase/membership/cancelled'>
                        <CancelledMembershipPurchase />
                      </Route>
                    </Switch>
                  </CurrentTransactionContext.Provider>
                </LoggedInUserContext.Provider>
              </GeneralToggleContext.Provider>
            </AllSignupsContext.Provider>
          </AllMembershipsContext.Provider>
        </AllSessionsContext.Provider>
      </AllEventsContext.Provider>
    </AllUsersContext.Provider>
    </>
  )
}

export default App;
