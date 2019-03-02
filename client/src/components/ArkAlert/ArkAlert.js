import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const arkModal = (props) => {

    let normalAlert = <Modal isOpen={props.showModal} toggle={props.toggle} className={props.className}>
        <ModalHeader toggle={props.toggle}>{props.header}</ModalHeader>
        <ModalBody>
            {props.body}
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={props.submitClicked}>Yes</Button>
            &nbsp;
            &nbsp;
            <Button color="secondary" onClick={props.toggle}>No</Button>
        </ModalFooter>
    </Modal>;

    return normalAlert;
}

export default arkModal;
