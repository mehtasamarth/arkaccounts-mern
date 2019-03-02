import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as validator from '../../helpers/validator';
import ArkInput from '../../components/ArkInput/ArkInput'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Col,
  Label,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import logo from '../../assets/img/brand/logo1.png'
import axios from '../../helpers/axios'

class Company extends Component {
  state = {
    activeTab: new Array(4).fill('1'),
    companyValues: {
      companyName: "",
      contactName: "",
      companyEmail: "",
      companyPhoneNo: "",
      addressLine1: "",
      pincode: "",
      state: "",
      gtin: "",
      pan: "",
      purchaseDue: "",
      salesDue: "",
      companyPolicy: "",
      bankAccountNumber: "",
      bankAccountName: "",
      bankName: "",
      bankBranch: "",
      bankIfscCode: "",
    },
    companyRules: {
      companyName: {
        required: true,
        errorMessage: "Company Name is Required!",
        isValid: false,
        isTouched: false
      },
      companyEmail: {
        isEmail: true,
        errorMessage: "Company Email is Required!",
        isValid: false,
        isTouched: false
      },
      companyPhoneNo: {
        isNumeric: true,
        maxLength: 10,
        minLength: 10,
        errorMessage: "Enter Valid Phone No!",
        isValid: false,
        isTouched: false
      },
      addressLine1: {
        required: true,
        errorMessage: "Address is Required!",
        isValid: false,
        isTouched: false
      },
      pincode: {
        required: true,
        errorMessage: "Pincode is Required!",
        isValid: false,
        isTouched: false
      },
      state: {
        required: true,
        errorMessage: "State is Required!",
        isValid: false,
        isTouched: false
      },
      gtin: {
        required: false,
        isRegex: true,
        RegexPattern: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}/,
        errorMessage: "Invalid GTIN! Example: 24ABJFA6515A1ZZ",
        isValid: false,
        isTouched: false
      },
      pan: {
        required: true,
        isRegex: true,
        RegexPattern: /[A-Za-z]{5}\d{4}[A-Za-z]{1}/,
        errorMessage: "Invalid PAN! Example: ABJFA6515A",
        isValid: false,
        isTouched: false
      },
      purchaseDue: {
        required: true,
        errorMessage: "Company Name is Required!",
        isValid: false,
        isTouched: false
      },
      salesDue: {
        required: true,
        errorMessage: "Company Name is Required!",
        isValid: false,
        isTouched: false
      },
      companyPolicy: {
        required: true,
        errorMessage: "Company Name is Required!",
        isValid: false,
        isTouched: false
      },
      bankAccountNumber: {
        isNumeric: true,
        errorMessage: "Account Number should be Numeric!",
        isValid: false,
        isTouched: false
      },
      bankAccountName: {
        required: true,
        errorMessage: "Company Name is Required!",
        isValid: false,
        isTouched: false
      },
      bankName: {
        required: true,
        errorMessage: "Company Name is Required!",
        isValid: false,
        isTouched: false
      },
      bankBranch: {
        required: true,
        errorMessage: "Company Name is Required!",
        isValid: false,
        isTouched: false
      },
      bankIfscCode: {
        isRegex: true,
        RegexPattern: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
        errorMessage: "Invalid IFSC Code! Example: SBIN0000488",
        isValid: false,
        isTouched: false
      },
    },
    alert: {
      visible: false,
      alertmessage: "",
      alertType: ""
    }
  };

  onDismiss = () => {
    let newAlert = { ...this.state.alert };
    newAlert.visible = false;
    this.setState({ alert: newAlert });
  }

  componentDidMount() {
    axios.post("company/get", {
      _id: this.props.companyId
    })
      .then(response => {
        let newCompany = {};
        if (response.data && response.data.responseCode === "200") {
          let responseDataArray = response.data.responseData;
          if (responseDataArray.length > 0) {
            newCompany = responseDataArray[0];
          }
          this.setState({
            companyValues: { ...this.state.companyValues, ...newCompany }
          })
        }
      })
  }

  toggle = (tabPane, tab) => {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  submitClickHandler = (event) => {

    axios.post("company/UpdateById", this.state.companyValues)
      .then(response => {
        if (response.data && response.data.responseCode === "200") {
          let newCompany = response.data.responseData;
          let alert = {
            visible: true,
            alertmessage: "Company Updated Successfully",
            alertType: "success"
          }
          this.setState({
            companyValues: { ...this.state.companyValues, ...newCompany },
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

  OnTextChangeHandler = (event) => {
    let updatedCompanyRules = { ...this.state.companyRules };
    let newCompany = { ...this.state.companyValues };
    newCompany[event.target.id] = event.target.value;

    if (updatedCompanyRules[event.target.id]) {
      let updatedCompanyRuleData = { ...updatedCompanyRules[event.target.id] };
      updatedCompanyRuleData.isTouched = true;
      updatedCompanyRuleData.isValid = validator.checkTextFieldValidity(event.target.value, updatedCompanyRuleData);
      updatedCompanyRules[event.target.id] = updatedCompanyRuleData;
    }
    this.setState({
      companyValues: newCompany,
      companyRules: updatedCompanyRules
    })
  }


  basicTabContent = () => {
    return (
      <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="companyName">Company Name</Label>
            <ArkInput type="text" id="companyName"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.companyName}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "companyName")} />
          </Col>
          <Col>
            <div height="108px" width="108px">
              <img src={logo} style={{ objectFit: "contain", maxHeight: "108px", maxWidth: "108px" }} alt="Logo" />
            </div>
          </Col>
          <Col md="6">
            <Label htmlFor="logo">Logo</Label>
            <ArkInput type="file" id="logo" name="file-input" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="contactName">Contact Name</Label>
            <ArkInput type="text" id="contactName"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.contactName}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "contactName")} />
          </Col>
          <Col md="4">
            <Label htmlFor="companyEmail">Email</Label>
            <ArkInput type="email" id="companyEmail"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.companyEmail}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "companyEmail")} />
          </Col>
          <Col md="4">
            <Label htmlFor="companyPhoneNo">Phone No</Label>
            <ArkInput type="text" id="companyPhoneNo"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.companyPhoneNo}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "companyPhoneNo")} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="addressLine1">Address</Label>
            <ArkInput type="textarea" id="addressLine1"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.addressLine1}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "addressLine1")} />

          </Col>
          <Col md="4">
            <Label htmlFor="state">State</Label>
            <ArkInput type="text" id="state"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.state}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "state")} />

          </Col>
          <Col md="4">
            <Label htmlFor="pincode">Pin Code</Label>
            <ArkInput type="text" id="pincode"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.pincode}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "pincode")} />

          </Col>
        </FormGroup>
      </Form>
    )
  }

  invoiceTabContent = () => {
    return (
      <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="gtin">GTIN</Label>
            <ArkInput type="text" id="gtin"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.gtin}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "gtin")} />
          </Col>
          <Col md="4">
            <Label htmlFor="pan">PAN</Label>
            <ArkInput type="text" id="pan"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.pan}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "pan")} />

          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="2">
            <Label htmlFor="purchaseDue">Purchase Due</Label>
            <ArkInput type="text" id="purchaseDue"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.purchaseDue}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "purchaseDue")} />

          </Col>
          <Col md="2">
            <Label htmlFor="salesDue">Sales Due</Label>
            <ArkInput type="text" id="salesDue"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.salesDue}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "salesDue")} />

          </Col>
          <Col md="8">
            <Label htmlFor="companyPolicy">Company Policy</Label>
            <ArkInput type="textarea" id="companyPolicy"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.companyPolicy}
              ruleObject={validator.getRuleFromObject(this.state.companyRules, "companyPolicy")} />
          </Col>
        </FormGroup>
      </Form>
    )
  }

  bankTabContent = () => {
    return (
      <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="bankAccountNumber">Account No</Label>
            <ArkInput type="text" id="bankAccountNumber"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.bankAccountNumber}
              isTouched={this.state.companyRules["bankAccountNumber"].isTouched}
              isValid={this.state.companyRules["bankAccountNumber"].isValid}
              errorMessage={this.state.companyRules["bankAccountNumber"].errorMessage} />
          </Col>
          <Col md="4">
            <Label htmlFor="bankAccountName">Account Name</Label>
            <ArkInput type="text" id="bankAccountName"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.bankAccountName}
              isTouched={this.state.companyRules["bankAccountName"].isTouched}
              isValid={this.state.companyRules["bankAccountName"].isValid}
              errorMessage={this.state.companyRules["bankAccountName"].errorMessage} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="bankName">Bank Name</Label>
            <ArkInput type="text" id="bankName"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.bankName}
              isTouched={this.state.companyRules["bankName"].isTouched}
              isValid={this.state.companyRules["bankName"].isValid}
              errorMessage={this.state.companyRules["bankName"].errorMessage} />
          </Col>

          <Col md="4">
            <Label htmlFor="bankBranch">Branch</Label>
            <ArkInput type="text" id="bankBranch"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.bankBranch}
              isTouched={this.state.companyRules["bankBranch"].isTouched}
              isValid={this.state.companyRules["bankBranch"].isValid}
              errorMessage={this.state.companyRules["bankBranch"].errorMessage} />
          </Col>
          <Col md="4">
            <Label htmlFor="bankIfscCode">IFSC Code</Label>
            <ArkInput type="text" id="bankIfscCode"
              onChange={this.OnTextChangeHandler}
              value={this.state.companyValues.bankIfscCode}
              isTouched={this.state.companyRules["bankIfscCode"].isTouched}
              isValid={this.state.companyRules["bankIfscCode"].isValid}
              errorMessage={this.state.companyRules["bankIfscCode"].errorMessage} />
          </Col>
        </FormGroup>
      </Form>
    )
  }

  tabPane = () => {
    return (
      <>
        <TabPane tabId="1">
          {this.basicTabContent()}
        </TabPane>
        <TabPane tabId="2">
          {this.invoiceTabContent()}
        </TabPane>
        <TabPane tabId="3">
          {this.bankTabContent()}
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Alert color={this.state.alert.alertType}
              isOpen={this.state.alert.visible} toggle={this.onDismiss}>
              {this.state.alert.alertmessage}
            </Alert>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  Basic Information
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  Invoice
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => { this.toggle(0, '3'); }}
                >
                  Bank
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </CardBody>
          <CardFooter >
            <Button className="float-right" type="reset" size="m" color="danger"><i className="fa fa-ban"></i> Reset</Button>
            <Button className="float-right" onClick={this.submitClickHandler} size="m" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    companyId: state.auth.companyId
  }
}

export default connect(mapStateToProps, null)(Company);
