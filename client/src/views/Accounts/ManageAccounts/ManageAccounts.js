import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as validator from '../../../helpers/validator';
import ArkInput from '../../../components/ArkInput/ArkInput'
import RSelect from 'react-select'
import {
  Alert,
  Button, ButtonGroup,
  Card, CardBody, CardFooter,
  Col,
  FormGroup,
  Label
} from 'reactstrap';
import axios from '../../../helpers/axios'

class ManageAccounts extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  state = {
    alert: {
      visible: false,
      alertmessage: null,
      alertType: null
    },
    accountValues: {
      companyId: this.props.companyId,
      userId: this.props.companyId,
      accountName: "",
      phoneno: "",
      gtin: "",
      accountType: "party",
      address: "",
      pincode: "",
      state: "",
      acountBalance: 0,
      isDebit: true
    },
    accountRules: {
      accountName: {
        required: true,
        errorMessage: "Account Name is Required!",
        maxLength: 30,
        isValid: false,
        isTouched: false
      },
      gtin: {
        required: false,
        errorMessage: "Enter Valid GST Format!",
        isRegex: true,
        RegexPattern: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
        maxLength: 15,
        isValid: false,
        isTouched: false
      },
      phoneno: {
        required: true,
        errorMessage: "Phone No is Required!",
        maxLength: 30,
        isValid: false,
        isTouched: false
      },
      acountBalance: {
        isNumeric: true,
        errorMessage: "Enter Valid Price!",
        isValid: false,
        isTouched: false
      }
    },
    stateOptions: [
      { value: '1', label: 'Jammu & Kashmir' },
      { value: '2', label: 'Himachal Pradesh' },
      { value: '3', label: 'Punjab' },
      { value: '4', label: 'Chandigarh' },
      { value: '5', label: 'Uttarakhand' },
      { value: '6', label: 'Haryana' },
      { value: '7', label: 'Delhi' },
      { value: '8', label: 'Rajasthan' },
      { value: '9', label: 'Uttar Pradesh' },
      { value: '10', label: 'Bihar' },
      { value: '11', label: 'Sikkim' },
      { value: '12', label: 'Arunachal Pradesh' },
      { value: '13', label: 'Nagaland' },
      { value: '14', label: 'Manipur' },
      { value: '15', label: 'Mizoram' },
      { value: '16', label: 'Tripura' },
      { value: '17', label: 'Meghalaya' },
      { value: '18', label: 'Assam' },
      { value: '19', label: 'West Bengal' },
      { value: '20', label: 'Jharkhand' },
      { value: '21', label: 'Orissa' },
      { value: '22', label: 'Chhattisgarh' },
      { value: '23', label: 'Madhya Pradesh' },
      { value: '24', label: 'Gujarat' },
      { value: '25', label: 'Daman & Diu' },
      { value: '26', label: 'Dadra & Nagar Haveli' },
      { value: '27', label: 'Maharashtra' },
      // { value: '28', label: 'Andhra Pradesh' },
      { value: '29', label: 'Karnataka' },
      { value: '30', label: 'Goa' },
      { value: '31', label: 'Lakshadweep' },
      { value: '32', label: 'Kerala' },
      { value: '33', label: 'Tamil Nadu' },
      { value: '34', label: 'Puducherry' },
      { value: '35', label: 'Andaman & Nicobar Islands' },
      { value: '36', label: 'Telengana' },
      { value: '37', label: 'Andhra Pradesh' }
    ]
  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.id) {
      this.getUser();
    }
  }

  // getAccount = async () => {
  //   try {
  //     let res = await axios.post("product/get", { _id: this.props.location.state.id });
  //     let data = res.data;
  //     let newUser = {};
  //     if (data && data.responseCode === "200") {
  //       let responseDataArray = data.responseData;
  //       if (responseDataArray.length > 0) {
  //         newUser = responseDataArray[0];
  //       }
  //       this.setState({
  //         productValues: { ...this.state.productValues, ...newUser }
  //       })
  //     }
  //   }
  //   catch (err) {
  //     let alert = {
  //       visible: true,
  //       alertmessage: "Oops..Something Went Wrong!",
  //       alertType: "danger"
  //     }
  //     this.setState({
  //       alert: alert
  //     })
  //     setTimeout(this.onDismiss, 3000);
  //   }
  // }

  OnTextChangeHandler = (event) => {
    let updatedRules = { ...this.state.accountRules };
    let newValue = { ...this.state.accountValues };
    newValue[event.target.id] = event.target.value;

    if (updatedRules[event.target.id]) {
      let updatedRuleData = { ...updatedRules[event.target.id] };
      updatedRuleData.isTouched = true;
      updatedRuleData.isValid = validator.checkTextFieldValidity(event.target.value, updatedRuleData);
      updatedRules[event.target.id] = updatedRuleData;
    }

    this.setState({
      accountValues: newValue,
      accountRules: updatedRules
    })
  }

  // handleSelectChange = (key, newValue) => {
  //   let newValues = { ...this.state.productValues };
  //   newValues[key] = newValue.value;
  //   this.setState({ productValues: newValues });
  // };

  OnDebitCreditClick = (event) => {
    var newAccountValues = { ...this.state.accountValues };
    if (event.target.id === "DebitButton") {
      newAccountValues.isDebit = true;
    }
    else {
      newAccountValues.isDebit = false;
    }
    this.setState({
      accountValues: newAccountValues
    });
  }

  isSwitchOnClick = (switchName) => {
    let newproductValues = { ...this.state.productValues };
    newproductValues[switchName] = !newproductValues[switchName];
    this.setState({
      productValues: newproductValues
    });
  }

  onDismiss = () => {
    let newAlert = { ...this.state.alert };
    newAlert.visible = false;
    this.setState({ alert: newAlert });
  }

  submitClickHandler = async () => {
    let URL = "account/create"
    let alertMessage = "Account Created Successfully"
    if (this.state.accountValues._id) {
      alertMessage = "Product Updated Successfully"
      URL = "product/updateById"
    }
    try {
      let accountValues = { ...this.state.accountValues };
      if (this.state.accountValues.isDebit) {
        accountValues.acountBalance = -Math.abs(accountValues.acountBalance);
      }

      let res = await axios.post(URL, accountValues);
      let data = res.data;
      if (data && data.responseCode === "200") {
        let newProduct = data.responseData;
        let alert = {
          visible: true,
          alertmessage: alertMessage,
          alertType: "success"
        }
        this.setState({
          accountValues: { ...this.state.accountValues, ...newProduct },
          alert: alert
        })
        setTimeout(this.onDismiss, 3000);
      }
    }
    catch (err) {
      let alert = {
        visible: true,
        alertmessage: "Oops..Something Went Wrong!",
        alertType: "danger"
      }
      this.setState({
        alert: alert
      })
      setTimeout(this.onDismiss, 3000);
    }

  }

  handleSelectChange = (key, newValue) => {
    let newValues = { ...this.state.accountValues };
    newValues[key] = newValue.value;
    this.setState({ accountValues: newValues });
  };

  render() {
    var openingBalanceComponents = null;
    if (!this.state.accountValues._id) {
      openingBalanceComponents = <FormGroup row>
        <Col md="4">
          <Label htmlFor="acountBalance">Opening Balance</Label>
          <ArkInput type="text" id="acountBalance"
            onChange={this.OnTextChangeHandler}
            value={this.state.accountValues.acountBalance}
            ruleObject={validator.getRuleFromObject(this.state.accountRules, "acountBalance")} />
        </Col>
        <Col md="4">
          <ButtonGroup>
            <Button id="DebitButton" outline color="success" onClick={this.OnDebitCreditClick}
              active={this.state.accountValues.isDebit}>Debit</Button>
            <Button id="CreditButton" outline color="success" onClick={this.OnDebitCreditClick}
              active={!this.state.accountValues.isDebit}>Credit</Button>
          </ButtonGroup>
        </Col>
      </FormGroup>;
    }
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Alert color={this.state.alert.alertType}
              isOpen={this.state.alert.visible} toggle={this.onDismiss}>
              {this.state.alert.alertmessage}
            </Alert>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="accountName">Account Name</Label>
                <ArkInput type="text" id="accountName"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.accountValues.accountName}
                  ruleObject={validator.getRuleFromObject(this.state.accountRules, "accountName")} />
              </Col>
              <Col md="4">
                <Label htmlFor="phoneno">Phone No</Label>
                <ArkInput type="text" id="phoneno"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.accountValues.phoneno}
                  ruleObject={validator.getRuleFromObject(this.state.accountRules, "phoneno")} />
              </Col>
              <Col md="4">
                <Label htmlFor="gtin">GSTIN</Label>
                <ArkInput type="text" id="gtin"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.accountValues.gtin}
                  ruleObject={validator.getRuleFromObject(this.state.accountRules, "gtin")} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="address">Address</Label>
                <ArkInput type="textarea" id="address"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.accountValues.address}
                  ruleObject={validator.getRuleFromObject(this.state.accountRules, "address")} />
              </Col>
              <Col md="4">
                <Label htmlFor="pincode">PIN Code</Label>
                <ArkInput type="text" id="pincode"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.accountValues.pincode}
                  ruleObject={validator.getRuleFromObject(this.state.accountRules, "pincode")} />
              </Col>
              <Col md="4">
                <Label htmlFor="state">State</Label>
                <RSelect
                  options={this.state.stateOptions}
                  onChange={(newValue) => this.handleSelectChange("state", newValue)}
                  value={this.state.accountValues.state ?
                    this.state.stateOptions.filter((el) => el.value === this.state.accountValues.state) : null} />
              </Col>
            </FormGroup>
            {openingBalanceComponents}
          </CardBody>
          <CardFooter>
            <Button type="reset" size="m" color="danger" onClick={this.context.router.history.goBack}><i className="fa fa-ban"></i> Reset</Button>
            &nbsp;
            &nbsp;
            <Button onClick={this.submitClickHandler} size="m" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          </CardFooter>
        </Card>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    companyId: state.auth.companyId,
    loggedInUserId: state.auth.userId
  }
}

export default connect(mapStateToProps, null)(ManageAccounts);
