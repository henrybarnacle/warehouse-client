import react, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'reactstrap';

import { updateService } from '../service/updateService';
import { Warehouse } from '../model/Warehouse';


    const EditModal = (props) => {

    const [validated, setValidated] = useState(false);
    
    const [warehouseId, updateWarehouseId] = useState('');
    const [warehouseName, updateWarehouseName] = useState('');
    const [warehouseDescription, updateWarehouseDescription] = useState('');
    const [buildingName, updateBuildingName] = useState('');
    const [streetLine1, updateStreetLine1] = useState('');
    const [streetLine2, updateStreetLine2] = useState('');
    const [city, updateCity] = useState('');
    const [stateProvince, updateStateProvince] = useState('');
    const [zipPostalCode, updateZipPostalCode] = useState('');
    const [country, updateCountry] = useState('');

    useEffect(() => {
        if (props.selectedEdit) {
            updateWarehouseId(props.selectedEdit.id);
            updateWarehouseName(props.selectedEdit.warehouseName);
            updateWarehouseDescription(props.selectedEdit.warehouseDescription);
            updateBuildingName(props.selectedEdit.warehouseAddress.buildingName);
            updateStreetLine1(props.selectedEdit.warehouseAddress.streetLine1);
            updateStreetLine2(props.selectedEdit.warehouseAddress.streetLine2);
            updateCity(props.selectedEdit.warehouseAddress.city);
            updateStateProvince(props.selectedEdit.warehouseAddress.stateProvince);
            updateZipPostalCode(props.selectedEdit.warehouseAddress.zipPostalCode);
            updateCountry(props.selectedEdit.warehouseAddress.country);
        }
    }, [props.selectedEdit]);

    const createUpdate = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        
        setValidated(true);
    } else {
        const formValues: Warehouse = {
            id: warehouseId,
            warehouseName: warehouseName,
            warehouseDescription: warehouseDescription,
            warehouseAddress: {
                buildingName: buildingName,
                streetLine1: streetLine1,
                streetLine2: streetLine2,
                city: city, 
                stateProvince: stateProvince,
                zipPostalCode: zipPostalCode, 
                country: country
            }  
        }
        updateService.put(`./warehouses/${warehouseId}`, formValues)
         .then(res => setTimeout(() => {
             props.modalClose()
            }, 1000)
        )
        .catch( err => alert(err));
        };
    }
        return (
            <Modal show={props.showEdit} onHide={() => {props.modalClose()}}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={createUpdate}>
                        <Form.Group className="mb-3" controlId="warehouseName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedEdit?.warehouseName} onChange={(e) => {updateWarehouseName(e.target.value)}}/>
                            <Form.Control.Feedback type="invalid">Please provide a warehouse name.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="warehouseDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedEdit?.warehouseDescription} onChange={(e) => {updateWarehouseDescription(e.target.value)}}/>
                            <Form.Control.Feedback type="invalid">Please provide a description.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="buildingName">
                            <Form.Label>Building Name</Form.Label>
                            <Form.Control type="text" defaultValue={props?.selectedEdit?.warehouseAddress.buildingName} onChange={(e) => {updateBuildingName(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="streetLine1">
                            <Form.Label>Street Address 1</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedEdit?.warehouseAddress.streetLine1} onChange={(e) => {updateStreetLine1(e.target.value)}}/>
                            <Form.Control.Feedback type="invalid">Please provide a street address.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="streetLine2">
                            <Form.Label>Street Address 2</Form.Label>
                            <Form.Control type="text" defaultValue={props?.selectedEdit?.warehouseAddress.streetLine2} onChange={(e) => {updateStreetLine2(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedEdit?.warehouseAddress.city} onChange={(e) => {updateCity(e.target.value)}}/>
                            <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="stateProvince">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedEdit?.warehouseAddress.stateProvince} onChange={(e) => {updateStateProvince(e.target.value)}}/>
                            <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="zipPostalCode">
                            <Form.Label>Zip / Postal Code</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedEdit?.warehouseAddress.zipPostalCode} onChange={(e) => {updateZipPostalCode(e.target.value)}}/>
                            <Form.Control.Feedback type="invalid">Please provide a zip / postal code.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" required defaultValue={props?.selectedEdit?.warehouseAddress.country} onChange={(e) => {updateCountry(e.target.value)}}/>
                            <Form.Control.Feedback type="invalid">Please provide a valid country.</Form.Control.Feedback>
                        </Form.Group>
                        <div className="update-buttons">
                            <Button variant="secondary" className="action-button" onClick={() => {props.modalClose()}}>Cancel</Button>
                            <Button type="submit" color="success" variant="primary" className="action-button">Save Changes</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
          )
      }
export default EditModal;