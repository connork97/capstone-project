import styles from './Offerings.module.css'

import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AllEventsContext } from '../App'

import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const ClassOfferings = () => {

    const history = useHistory()

    const { allEvents } = useContext(AllEventsContext)

    const renderAllEvents = allEvents.map((event) => {
        return (
            <Accordion.Item className={styles.accordionItem} eventKey={event.id} key={event.id}>
                <Accordion.Header className={styles.accordionHeader}>{event.name}</Accordion.Header>
                <Accordion.Body className={styles.accordionBody}>
                    Price: ${event.price}
                    <br></br><br></br>
                    Description: {event.description}
                </Accordion.Body>
            </Accordion.Item>
        )
    })

    return (
        <>
        <div className={styles.classOfferingsBackground}></div>
        <div className={styles.classOfferingsOverlayDiv}></div>
        <div className={styles.classOfferingsWrapper}>
            <h1 className={styles.offeringsH1}>Classes</h1>
            <div className={styles.classOfferingsDiv}>
                <Accordion className={styles.accordion}>
                    {renderAllEvents}
                </Accordion>
                <Button className={styles.calendarRedirectButton} onClick={() => history.push({pathname:'/calendar'})}>Go to Calendar</Button>
            </div>
        </div>
        </>
    );
};

export default ClassOfferings;