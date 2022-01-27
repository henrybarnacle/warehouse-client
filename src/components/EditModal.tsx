import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'reactstrap';

import { Warehouse } from '../model/Warehouse';


    const EditModal = (props: any) => {

    const [validated, setValidated] = useState(false);
    
    const createUpdate = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            setValidated(true);
            const formValues = event.target.elements;
            const editWarehouseObject: Warehouse = {
                    id: props.selectedItem.id,
                    warehouseName: formValues.warehouseName.value,
                    warehouseDescription: formValues.warehouseDescription.value,
                    warehouseAddress: {
                        buildingName: formValues.buildingName.value,
                        streetLine1: formValues.streetLine1.value,
                        streetLine2: formValues.streetLine2.value,
                        city: formValues.city.value, 
                        stateProvince: formValues.stateProvince.value,
                        zipPostalCode: formValues.zipPostalCode.value,
                        country: formValues.country.value
                    }
            }
            props.editItem(editWarehouseObject).then((response: Warehouse) => props.getItems());
            props.showEdit(false)
        }
    }
        return (
            <Modal show={props.editVisible} onHide={() => {props.showEdit(false)}}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={createUpdate}>
                        <Form.Group className="mb-3" controlId="warehouseName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedItem?.warehouseName}/>
                            <Form.Control.Feedback type="invalid">Please provide a warehouse name.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="warehouseDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedItem?.warehouseDescription}/>
                            <Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="buildingName">
                            <Form.Label>Building Name</Form.Label>
                            <Form.Control type="text" defaultValue={props?.selectedItem?.warehouseAddress.buildingName}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="streetLine1">
                            <Form.Label>Street Address 1</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedItem?.warehouseAddress.streetLine1}/>
                            <Form.Control.Feedback type="invalid">Please provide a street address.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="streetLine2">
                            <Form.Label>Street Address 2</Form.Label>
                            <Form.Control type="text" defaultValue={props?.selectedItem?.warehouseAddress.streetLine2}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedItem?.warehouseAddress.city}/>
                            <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="stateProvince">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedItem?.warehouseAddress.stateProvince}/>
                            <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="zipPostalCode">
                            <Form.Label>Zip / Postal Code</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedItem?.warehouseAddress.zipPostalCode}/>
                            <Form.Control.Feedback type="invalid">Please provide a zip / postal code.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedItem?.warehouseAddress.country}/>
                            <Form.Control.Feedback type="invalid">Please provide a valid country.</Form.Control.Feedback>
                        </Form.Group>
                        <div className="update-buttons">
                            <Button variant="secondary" className="action-button" onClick={() => {props.showEdit(false)}}>Cancel</Button>
                            <Button type="submit" color="success" variant="primary" className="action-button">Save Changes</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
          )
      }
export default EditModal;