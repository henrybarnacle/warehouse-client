import react, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'reactstrap';


    const EditModal = (props) => {
console.log(props)

        return (
            <Modal show={props.showEdit} onHide={() => {props.editClose()}}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {props.editClose()}}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {props.editClose()}}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
          )
      }
export default EditModal;