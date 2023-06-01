import { useState, useContext } from 'react'
import { AllMembershipsContext } from '../../App'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateMembership = () => {

    const { allMemberships, setAllMemberships } = useContext(AllMembershipsContext)

    const [newMembership, setNewMembership] = useState({
        "name": "",
        "price": "",
        "type": "",
        "subtype": "",
        "description": ""
    })

    const handleDiscardMembership = () => {
        setNewMembership({
            "name": "",
            "price": "",
            "type": "",
            "subtype": "",
            "description": ""
        })
    }

    const handleNewMembershipChange = (event) => {
        const {name, value} = event.target
        setNewMembership((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleMembershipSubmit = (event) => {
        event.preventDefault()
        fetch('/memberships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMembership)
        })
        .then((response) => response.json())
        .then((newMembershipData) => {
            console.log(newMembershipData)
            const updatedAllMemberships = [...allMemberships, newMembershipData]
            setAllMemberships(updatedAllMemberships)
        })
        console.log(allMemberships)
    }

    return (
        <Form id="createMembershipForm" onSubmit={handleMembershipSubmit} style={{marginTop:'2rem', width:'50%', marginLeft:'auto', marginRight:'auto'}}>
            <Form.Label><b>Name:</b></Form.Label>
                <Form.Control name="name" type="text" value={newMembership.name} onChange={handleNewMembershipChange}></Form.Control>
            <br></br>
            <Form.Label><b>Price:</b></Form.Label>
                <Form.Control name="price" type="text" value={newMembership.price} onChange={handleNewMembershipChange}></Form.Control>
            <br></br>
            <Form.Label><b>Type:</b></Form.Label>
                <Form.Control name="type" type="text" value={newMembership.type} onChange={handleNewMembershipChange}></Form.Control>
                <Form.Text>Examples: "Guest", "Punch Card", "Member", etc...</Form.Text>
            <br></br>
            <Form.Label><b>Subtype:</b></Form.Label>
                <Form.Control name="subtype" type="text" value={newMembership.subtype} onChange={handleNewMembershipChange}></Form.Control>
                <Form.Text>Examples: "Guest", "Monthly", "Prepaid", "Punch Card", etc...</Form.Text>
            <br></br>
            <Form.Label><b>Description:</b></Form.Label>
                <Form.Control name="description" type="text" value={newMembership.description} onChange={handleNewMembershipChange}></Form.Control>
            <br></br>
            <Button type="submit" style={{marginRight:'1.5rem', width:'12.5rem'}}>Create Membership</Button>
            <Button onClick={handleDiscardMembership} style={{marginLeft:'1.5rem', width:'12.5rem', background:'grey'}}>Discard Membership</Button>
            <br></br><br></br>
        </Form>
    )
}

export default CreateMembership