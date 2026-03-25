import { Modal, Button } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";

function ModalAction({ show, setShow, title, description, saveText, cancelText, handleProceed, errorData, setErrorData }) {

  const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {description}
                <ErrorMessage
                    error={errorData}
                    setError={setErrorData}
                />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                {cancelText}
            </Button>
            <Button variant="primary" onClick={handleProceed}>
                {saveText}
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAction;