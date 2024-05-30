import styles from './Offerings.module.css'

import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AllMembershipsContext, LoggedInUserContext } from '../App'

import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const MembershipOfferings = () => {

    const history = useHistory()

    const { allMemberships } = useContext(AllMembershipsContext)
    const { currentUser } = useContext(LoggedInUserContext)

    const renderAllMemberships = allMemberships.map((membership) => {
        return (
            <Accordion.Item className={styles.accordionItem} eventKey={membership.id} key={membership.id}>
                <Accordion.Header>{membership.name}</Accordion.Header>
                <Accordion.Body>
                    Price: ${membership.price}
                    <br></br><br></br>
                    Description: {membership.description}
                    <br></br><br></br>
                    {membership.type === 'Guest' ? null 
                    : Object.keys(currentUser).length > 0 ?
                        <Button onClick={() => history.push({pathname:"/confirm-membership-order", state:membership})}>Sign Up Here!</Button> 
                        : <span style={{color:'rgba(0, 0, 0, 0.5)'}}>(Must be signed in to sign up)</span>
                    }
                </Accordion.Body>
            </Accordion.Item>
        )
    })
    return (
        <>
        <div className={styles.offeringsOverlayDiv}></div>
        <div className={styles.offeringsWrapperDiv}></div>
            <h1 className={styles.offeringsH1}>Memberships and More!</h1>
            <div className={styles.membershipOfferingsDiv}>
                <div className="offeringsDiv">
                    <Accordion className={styles.accordion}>
                        {renderAllMemberships}
                    </Accordion>
                </div>
            </div>
        </>
    )
}

export default MembershipOfferings