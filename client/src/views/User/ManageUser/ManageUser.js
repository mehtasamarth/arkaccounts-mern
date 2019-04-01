import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as validator from '../../../helpers/validator';
import ArkInput from '../../../components/ArkInput/ArkInput'
import { AppSwitch } from '@coreui/react'
import {
  Alert,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Col,
  FormGroup,
  Label
} from 'reactstrap';
import axios from '../../../helpers/axios'

class ManageUser extends Component {
  state = {
    alert: {
      visible: false,
      alertmessage: null,
      alertType: null
    },
    userValues: {
      _id: null,
      username: "",
      companyId: this.props.companyId,
      password: "",
      phoneno: "",
      isActive: false,
      isAdmin: false
    },
    userRules: {
      username: {
        required: true,
        errorMessage: "Username is Required!",
        isValid: false,
        isTouched: false
      },
      password: {
        required: true,
        errorMessage: "Password is Required!",
        isValid: false,
        isTouched: false
      },
      phoneno: {
        isNumeric: true,
        maxLength: 10,
        minLength: 10,
        errorMessage: "Enter Valid Phone No!",
        isValid: false,
        isTouched: false
      },
      userToDelete: null,
      showDeleteModal: false
    }
  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.id) {
      this.getUser();
    }
  }

  getUser = () => {
    axios.post("user/get", {
      _id: this.props.location.state.id
    })
      .then(response => {
        let newUser = {};
        if (response.data && response.data.responseCode === "200") {
          let responseDataArray = response.data.responseData;
          if (responseDataArray.length > 0) {
            newUser = responseDataArray[0];
          }
          this.setState({
            userValues: { ...this.state.userValues, ...newUser }
          })
        }
      })
  }

  OnTextChangeHandler = (event) => {
    let updatedRules = { ...this.state.userRules };
    let newValue = { ...this.state.userValues };
    newValue[event.target.id] = event.target.value;

    if (updatedRules[event.target.id]) {
      let updatedRuleData = { ...updatedRules[event.target.id] };
      updatedRuleData.isTouched = true;
      updatedRuleData.isValid = validator.checkTextFieldValidity(event.target.value, updatedRuleData);
      updatedRules[event.target.id] = updatedRuleData;
    }
    this.setState({
      userValues: newValue,
      userRules: updatedRules
    })
  }

  isSwitchOnClick = (switchName) => {
    let newuserValues = { ...this.state.userValues };
    newuserValues[switchName] = !newuserValues[switchName];
    this.setState({
      userValues: newuserValues
    });
  }

  onDismiss = () => {
    let newAlert = { ...this.state.alert };
    newAlert.visible = false;
    this.setState({ alert: newAlert });
  }

  submitClickHandler = () => {
    let URL = "user/create"
    let alertMessage = "User Created Successfully"
    if (this.state.userValues._id) {
      alertMessage = "User Updated Successfully"
      URL = "user/updateById"
    }
    axios.post(URL, this.state.userValues)
      .then(response => {
        if (response.data && response.data.responseCode === "200") {
          let newUser = response.data.responseData;
          let alert = {
            visible: true,
            alertmessage: alertMessage,
            alertType: "success"
          }
          this.setState({
            userValues: { ...this.state.userValues, ...newUser },
            alert: alert
          })
          setTimeout(this.onDismiss, 3000);
        }
      }).catch(error => {
        let alert = {
          visible: true,
          alertmessage: "Oops..Something Went Wrong!",
          alertType: "danger"
        }
        this.setState({
          alert: alert
        })
        setTimeout(this.onDismiss, 3000);
      });

  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Manage User
          </CardHeader>
          <CardBody>
            <Alert color={this.state.alert.alertType}
              isOpen={this.state.alert.visible} toggle={this.onDismiss}>
              {this.state.alert.alertmessage}
            </Alert>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="username">Username</Label>
                <ArkInput type="text" id="username"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.userValues.username}
                  ruleObject={validator.getRuleFromObject(this.state.userRules, "username")} />
              </Col>
              <Col md="4">
                <Label htmlFor="password">Password</Label>
                <ArkInput type="password" id="password"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.userValues.password}
                  ruleObject={validator.getRuleFromObject(this.state.userRules, "password")} />
              </Col>
              <Col md="4">
                <Label htmlFor="phoneno">Phone No</Label>
                <ArkInput type="phoneno" id="phoneno"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.userValues.phoneno}
                  ruleObject={validator.getRuleFromObject(this.state.userRules, "phoneno")} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="isAdmin">Is Admin?</Label>
                <AppSwitch className={'mx-1'} color={'primary'}
                  checked={this.state.userValues.isAdmin} onClick={() => this.isSwitchOnClick("isAdmin")}
                />
              </Col>
              <Col md="4">
                <Label htmlFor="isActive">Is Active?</Label>
                <AppSwitch className={'mx-1'} color={'primary'}
                  checked={this.state.userValues.isActive} onClick={() => this.isSwitchOnClick("isActive")}
                />
              </Col>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button type="reset" size="m" color="danger"><i className="fa fa-ban"></i> Reset</Button>
            &nbsp;
            &nbsp;
            <Button onClick={this.submitClickHandler} size="m" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          </CardFooter>
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

export default connect(mapStateToProps, null)(ManageUser);
