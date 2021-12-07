import react, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';
import { updateService } from '../service/updateService';


const DeleteModal = (props) => {

    const deleteEntry = () => {
        updateService.delete(`./warehouses/${props.selectedDelete.id}`)
        .then(res => setTimeout(() => {
            props.modalClose()
           }, 1000)
        )
        .catch( err => alert(err))
    }
    return (
        <Modal show={props.showDelete} onHide={() => {props.modalClose()}}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Warehouse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>Are you sure you want to delete {props?.selectedDelete?.warehouseName}?</h4>
            </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {props.modalClose()}}>
                    Cancel
                </Button>
                <Button color="danger" variant="primary" onClick={() => {deleteEntry()}}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
          )
}
export default DeleteModal;