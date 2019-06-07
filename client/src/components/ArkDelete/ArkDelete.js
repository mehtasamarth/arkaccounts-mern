import React, { Component } from 'react';
import { Button } from 'reactstrap';
import ArkAlert from '../ArkAlert/ArkAlert'
import axios from '../../helpers/axios'


class ArkDelete extends Component {
    state = {
        showDeleteModal: false
    }
    render() {

        let modal = null;
        if (this.state.showDeleteModal) {
            modal = <ArkAlert showModal={this.state.showDeleteModal}
                toggle={this.toggleDeleteModal} className="success"
                header="Delete User?"
                body={"Are you sure you want to delete " + this.props.objectToDelete + "?"}
                submitClicked={this.deleteSubmitClicked} />
        }

        let deleteButton = 
        <Button color="primary"
            onClick={() => this.deleteClickHandler()}>
            <i className="cui-trash icons font-xl mt-4"></i>
        </Button >;

        return deleteButton;
    }

    deleteSubmitClicked = () => {
        axios.post(this.props.deleteURL, {
          _id: this.props.objectToDelete
        })
          .then(response => {
            if (response.data && response.data.responseCode === "200") {
              let alert = {
                visible: true,
                alertmessage: "Delete Successfully",
                alertType: "success"
              }
              this.setState({
                userToDelete: null,
                showDeleteModal: false,
                alert: alert
              });
              this.updateUsers();
              setTimeout(this.onDismiss, 3000);
            }
          }).catch(error => {
            let alert = {
              visible: true,
              alertmessage: "Oops..Something Went Wrong! Try again later!",
              alertType: "danger"
            }
            this.setState({
              alert: alert
            })
            setTimeout(this.onDismiss, 3000);
          });
      }    

    deleteClickHandler = () => {
        this.setState({
            showDeleteModal: true
        });
    }

}

export default ArkDelete;