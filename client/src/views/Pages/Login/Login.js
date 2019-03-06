import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as validator from '../../../helpers/validator';
import * as actions from '../../../store/actions/index'
import ArkInput from '../../../components/ArkInput/ArkInput'

class Login extends Component {
    state = {
        formIsValid: false,
        loginValues: {
            username: "",
            password: ""
        },
        loginRules: {
            username: {
                required: true,
                isRegex: true,
                RegexPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                errorMessage: "Enter Valid Email!",
                isValid: false,
                isTouched: false
            },
            password: {
                required: true,
                errorMessage: "Password is Required!",
                isValid: false,
                isTouched: false
            }
        }
    }

    OnTextChangeHandler = (event) => {
        let updatedRules = { ...this.state.loginRules };
        let newValue = { ...this.state.loginValues };
        newValue[event.target.id] = event.target.value;

        if (updatedRules[event.target.id]) {
            let updatedRuleData = { ...updatedRules[event.target.id] };
            updatedRuleData.isTouched = true;
            updatedRuleData.isValid = validator.checkTextFieldValidity(event.target.value, updatedRuleData);
            updatedRules[event.target.id] = updatedRuleData;
        }
        this.setState({
            loginValues: newValue,
            loginRules: updatedRules
        })
    }

    validateAllFields = () => {
        let updatedRules = { ...this.state.loginRules };
        let newValue = { ...this.state.loginValues };

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
            loginValues: newValue,
            loginRules: updatedRules,
            formIsValid: formIsValid
        })
        return formIsValid;
    }

    submitClickHander = () => {
        let formIsValid = this.validateAllFields();
        if (formIsValid) {
            this.props.onAuth(this.state.loginValues);
        }
    }

    render() {
        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='.\Dashboard' />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error}</p>
            );
        }

        return (
            <div className="app flex-row align-items-center">
                {authRedirect}
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <ArkInput type="text" id="username"
                                                    placeholder="Email"
                                                    onChange={this.OnTextChangeHandler}
                                                    value={this.state.loginValues.username}
                                                    ruleObject={validator.getRuleFromObject(this.state.loginRules, "username")} />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <ArkInput type="password" id="password"
                                                    placeholder="Password"
                                                    onChange={this.OnTextChangeHandler}
                                                    value={this.state.loginValues.password}
                                                    ruleObject={validator.getRuleFromObject(this.state.loginRules, "password")} />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" onClick={this.submitClickHander}>Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                                {errorMessage}
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Havent tried Ark Accounts Yet? Why dont you register with us?</p>
                                            <Link to="/register">
                                                <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userId !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (loginValues) => dispatch(actions.auth(loginValues)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
