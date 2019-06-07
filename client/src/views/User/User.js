import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ArkAlert from '../../components/ArkAlert/ArkAlert'
import ArkTable from '../../components/ArkTable/ArkTable'
import * as actions from '../../store/actions/index'
import {
  Alert,
  Button,
  Card, CardHeader, CardBody
} from 'reactstrap';
import axios from '../../helpers/axios'

class User extends Component {
  state = {
    tableConfiguration: [
      {
        header: "Username",
        dataField: "username",
        type: "data"
      },
      {
        header: "Status",
        dataField: "isActive",
        type: "badge",
        badgeConfig: {
          true: "success",
          false: "warning"
        },
        valueConfig: {
          true: "Yes",
          false: "No"
        }
      },
      {
        header: "IsAdmin?",
        dataField: "isAdmin",
        type: "badge",
        badgeConfig: {
          true: "success",
          false: "warning"
        },
        valueConfig: {
          true: "Yes",
          false: "No"
        }
      },
      {
        header: "Edit",
        type: "link",
        linkConfig: {
          linkPath: "./user/manage",
          dataField: "_id",
          btnColor: "primary",
          iconClass: "cui-pencil icons font-xl mt-4"
        }
      },
      {
        header: "Delete",
        type: "delete",
        linkConfig: {
          linkPath: "./user/manage",
          dataField: "_id",
          btnColor: "primary",
          iconClass: "cui-trash icons font-xl mt-4"
        }
      }
    ],
    alert: {
      visible: false,
      alertmessage: null,
      alertType: null
    },
    user: [],
    userToDelete: null,
    showDeleteModal: false
  };

  componentDidMount() {
    this.updateUsers();
  }

  updateUsers = () => {
    axios.post("user/get", {
      companyId: this.props.companyId
    })
      .then(response => {
        if (response.data && response.data.responseCode === "200") {
          let responseDataArray = response.data.responseData;
          this.setState({
            user: responseDataArray
          })
        }
      })
  }

  onDismiss = () => {
    let newAlert = { ...this.state.alert };
    newAlert.visible = false;
    this.setState({ alert: newAlert });
  }

  toggleDeleteModal = () => {
    this.setState({
      showDeleteModal: false
    })
  }

  deleteClickHandler = (userToDelete) => {
    this.setState({
      userToDelete: userToDelete,
      showDeleteModal: true
    });
  }

  deleteSubmitClicked = () => {
    if (this.props.loggedInUserId !== this.state.userToDelete._id) {
      axios.post("user/delete", {
        _id: this.state.userToDelete._id
      })
        .then(response => {
          if (response.data && response.data.responseCode === "200") {
            let alert = {
              visible: true,
              alertmessage: "User Deleted Successfully",
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
    else {
      let alert = {
        visible: true,
        alertmessage: "Cannot Delete the Master User!",
        alertType: "danger"
      }
      this.setState({
        userToDelete: null,
        showDeleteModal: false,
        alert: alert
      })
      setTimeout(this.onDismiss, 3000);
    }
  }

  render() {
    let modal = null;
    if (this.state.showDeleteModal) {
      modal = <ArkAlert showModal={this.state.showDeleteModal}
        toggle={this.toggleDeleteModal} className="success"
        header="Delete User?"
        body={"Are you sure you want to delete " + this.state.userToDelete.username + "?"}
        submitClicked={this.deleteSubmitClicked} />
    }

    return (
      <div className="animated fadeIn">
        <Card>
          {modal}
          <CardHeader>
            Users
            <Link to="./user/manage">
              <Button className="float-right" color="primary" onClick={() => this.props.onEditClick(null)}>
                Add User
              </Button>
            </Link>
          </CardHeader>
          <CardBody>
            <Alert color={this.state.alert.alertType}
              isOpen={this.state.alert.visible} toggle={this.onDismiss}>
              {this.state.alert.alertmessage}
            </Alert>
            <ArkTable
              tableConfiguration={this.state.tableConfiguration}
              data={this.state.user}
              delete={this.deleteClickHandler}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    companyId: state.auth.companyId,
    loggedInUserId: state.auth.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditClick: (editingUserId) => dispatch(actions.setUserEditing(editingUserId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
