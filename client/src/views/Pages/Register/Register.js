import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card, CardBody, Col, Container,
  Form,
  InputGroup, InputGroupAddon, InputGroupText,
  Row
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import * as validator from '../../../helpers/validator';
import * as actions from '../../../store/actions/index'
import ArkInput from '../../../components/ArkInput/ArkInput'
import axios from '../../../helpers/axios'

class Register extends Component {
  state = {
    redirect: false,
    errorMessage: "",
    formIsValid: false,
    registerValues: {
      companyName: "",
      username: "",
      phoneno: "",
      password: "",
      retypePassword: ""
    },
    registerRules: {
      companyName: {
        required: true,
        errorMessage: "Company Name is Required!",
        isValid: false,
        isTouched: false
      },
      username: {
        isRegex: true,
        RegexPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        errorMessage: "Enter a valid Email!",
        isValid: false,
        isTouched: false
      },
      phoneno: {
        required: true,
        isNumeric: true,
        errorMessage: "Enter a valid Phone No!",
        isValid: false,
        isTouched: false
      },
      password: {
        required: true,
        errorMessage: "Password is Required!",
        isValid: false,
        isTouched: false
      },
      retypePassword: {
        required: true,
        errorMessage: "Password is Required!",
        isValid: false,
        isTouched: false
      }
    }
  }

  validateAllFields = () => {
    let updatedRules = { ...this.state.registerRules };
    let newValue = { ...this.state.registerValues };

    let formIsValid = true;
    for (const key of Object.keys(newValue)) {
      if (updatedRules[key]) {
        let updatedRuleData = { ...updatedRules[key] };
        if (!updatedRuleData.isTouched || !updatedRuleData.isValid) {
          updatedRuleData.isTouched = true;
          updatedRuleData.isValid = validator.checkTextFieldValidity(newValue[key], updatedRuleData);
          updatedRules[key] = updatedRuleData;
          formIsValid = formIsValid && updatedRuleData.isValid;
        }
      }
    }
    this.setState({
      registerValues: newValue,
      registerRules: updatedRules,
      formIsValid: formIsValid
    })
    return formIsValid;
  }

  submitClickHandler = (event) => {
    let formIsValid = this.validateAllFields()
    if (formIsValid) {
      axios.post("user/create", this.state.registerValues)
        .then(response => {
          if (response.data && response.data.responseCode === "200") {
            let newUser = response.data.responseData;
            this.props.onRegister(newUser._id,newUser.companyId);
            this.setState({
              redirect: true
            });
          }
          else {
            this.setState({
              errorMessage: "User already exists! Please try again with new Email!"
            });
          }
        }).catch(error => {
          this.setState({
            errorMessage: "Something Went Wrong! Please try again!"
          })
        });
    }
    else{
      this.setState({
        errorMessage: "Complete the form to create account!"
      });
    }
  }

  OnTextChangeHandler = (event) => {
    let updatedRules = { ...this.state.registerRules };
    let newValue = { ...this.state.registerValues };
    newValue[event.target.id] = event.target.value;

    if (updatedRules[event.target.id]) {
      let updatedRuleData = { ...updatedRules[event.target.id] };
      updatedRuleData.isTouched = true;
      updatedRuleData.isValid = validator.checkTextFieldValidity(event.target.value, updatedRuleData);
      updatedRules[event.target.id] = updatedRuleData;
    }
    this.setState({
      registerValues: newValue,
      registerRules: updatedRules
    })
  }

  render() {
    let errorMessage = null;
    if (this.state.errorMessage) {
      errorMessage = (
        <p>{this.state.errorMessage}</p>
      );
    }

    let redirect = null;
    if (this.state.redirect) {
      redirect = <Redirect to='.\Dashboard' />
    }
    return (
      <div className="app flex-row align-items-center">
        {redirect}
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your comapny</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <ArkInput type="text" id="companyName"
                        placeholder="Company Name"
                        onChange={this.OnTextChangeHandler}
                        value={this.state.registerValues.companyName}
                        ruleObject={validator.getRuleFromObject(this.state.registerRules, "companyName")} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <ArkInput type="text" id="username"
                        placeholder="Email"
                        onChange={this.OnTextChangeHandler}
                        value={this.state.registerValues.userName}
                        ruleObject={validator.getRuleFromObject(this.state.registerRules, "username")} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <ArkInput type="text" id="phoneno"
                        placeholder="Phone No"
                        onChange={this.OnTextChangeHandler}
                        value={this.state.registerValues.phoneno}
                        ruleObject={validator.getRuleFromObject(this.state.registerRules, "phoneno")} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <ArkInput type="password" id="password"
                        placeholder="Password"
                        onChange={this.OnTextChangeHandler}
                        value={this.state.registerValues.password}
                        ruleObject={validator.getRuleFromObject(this.state.registerRules, "password")} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <ArkInput type="password" id="retypePassword"
                        placeholder="Retype Password"
                        onChange={this.OnTextChangeHandler}
                        value={this.state.registerValues.retypePassword}
                        ruleObject={validator.getRuleFromObject(this.state.registerRules, "retypePassword")} />
                    </InputGroup>
                    {errorMessage}
                    <Button onClick={this.submitClickHandler} color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (userId, companyId) => dispatch(actions.authSuccess(userId, companyId)),
  };
}

export default connect(null, mapDispatchToProps)(Register);
