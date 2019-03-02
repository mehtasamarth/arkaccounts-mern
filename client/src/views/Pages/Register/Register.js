import React, { Component } from 'react';
import {
  Button,
  Card, CardBody, CardFooter, Col, Container,
  Form,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Row
} from 'reactstrap';

class Register extends Component {
  state = {
    registerValues: {
      companyName: "",
      username: "",
      firstName: "",
      lastName: "",
      phoneno: "",
      password: "",
      retypePassword: ""
    },
    registerRules: {
      companyName: {
        required: true,
        errorMessage: "Company is Required!",
        isValid: false,
        isTouched: false
      },
      username: {
        required: true,
        errorMessage: "Username is Required!",
        isValid: false,
        isTouched: false
      },
      firstName: {
        required: true,
        errorMessage: "FirstName is Required!",
        isValid: false,
        isTouched: false
      },
      lastName: {
        required: true,
        errorMessage: "LastName is Required!",
        isValid: false,
        isTouched: false
      },
      phoneno: {
        required: true,
        errorMessage: "Phone # is Required!",
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
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Email" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
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

export default Register;
