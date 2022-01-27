import { Button } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';

const DeleteModal = (props: any) => {
    const deleteEntry = () => {
        props.removeItem(props.selectedItem.id);
        props.showDelete(false);
    }
    return (
        <Modal show={props.deleteVisible} onHide={() => {props.showDelete(false)}}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Warehouse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>Are you sure you want to delete {props?.selectedItem?.warehouseName}?</h4>
            </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => {props.showDelete(false)}}>
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