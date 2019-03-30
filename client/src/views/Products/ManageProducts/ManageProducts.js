import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as validator from '../../../helpers/validator';
import ArkInput from '../../../components/ArkInput/ArkInput'
import RSelect from 'react-select'
import BigNumber from "bignumber.js"
import {
  Alert,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Col,
  FormGroup,
  Label
} from 'reactstrap';
import axios from '../../../helpers/axios'

class ManageProducts extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    alert: {
      visible: false,
      alertmessage: null,
      alertType: null
    },
    productValues: {
      _id: null,
      companyId: this.props.companyId,
      productName: "",
      productDescription: "",
      productHSN: "",
      uom: "",
      unitPrice: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      taxAmount: 0,
      totalAmount: 0,
      stock: 0
    },
    productRules: {
      productName: {
        required: true,
        errorMessage: "Product Name is Required!",
        maxLength: 30,
        isValid: false,
        isTouched: false
      },
      unitPrice: {
        isNumeric: true,
        errorMessage: "Enter Valid Price!",
        isValid: false,
        isTouched: false
      },
      taxAmount: {
        isNumeric: true,
        errorMessage: "Enter Valid Amount!",
        isValid: false,
        isTouched: false
      },
      totalAmount: {
        isNumeric: true,
        errorMessage: "Enter Valid Total Amount!",
        isValid: false,
        isTouched: false
      },
      userToDelete: null,
      showDeleteModal: false
    },
    uomOptions: [
      { value: 'each', label: 'EACH' },
      { value: 'kg', label: 'KG' },
      { value: 'gm', label: 'GM' },
      { value: 'm', label: 'Meter' },
      { value: 'cm', label: 'Centimeter' }
    ]

  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.id) {
      this.getUser();
    }
  }

  getUser = async () => {
    try {
      let res = await axios.post("product/get", { _id: this.props.location.state.id });
      let data = res.data;
      let newUser = {};
      if (data && data.responseCode === "200") {
        let responseDataArray = data.responseData;
        if (responseDataArray.length > 0) {
          newUser = responseDataArray[0];
        }
        this.setState({
          productValues: { ...this.state.productValues, ...newUser }
        })
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

  OnTextChangeHandler = (event) => {
    let updatedRules = { ...this.state.userRules };
    let newValue = { ...this.state.productValues };
    newValue[event.target.id] = event.target.value;

    if (updatedRules[event.target.id]) {
      let updatedRuleData = { ...updatedRules[event.target.id] };
      updatedRuleData.isTouched = true;
      updatedRuleData.isValid = validator.checkTextFieldValidity(event.target.value, updatedRuleData);
      updatedRules[event.target.id] = updatedRuleData;
    }

    if (event.target.id === "igst") {
      let taxRate = event.target.value;
      if (taxRate >= 0) {
        let sgst = taxRate / 2;
        newValue["cgst"] = sgst;
        newValue["sgst"] = sgst;
        newValue["igst"] = taxRate;
      }
    }

    if (event.target.id === "cgst" || event.target.id === "sgst") {
      let sgst = event.target.value;
      if (sgst >= 0) {
        newValue["cgst"] = sgst;
        newValue["sgst"] = sgst;
        newValue["igst"] = sgst * 2;
      }
    }

    if (event.target.id === "unitPrice" || newValue["unitPrice"] > 0) {
      let unitPrice = new BigNumber(newValue["unitPrice"]);
      let taxRate = new BigNumber(newValue["igst"]);

      if (taxRate >= 0) {
        let taxAmount = new BigNumber(unitPrice.times(taxRate).dividedBy(100).toFixed(2));
        let totalAmount = taxAmount.plus(unitPrice).toFixed(2);
        newValue["taxAmount"] = taxAmount;
        newValue["totalAmount"] = totalAmount;
      }
    }

    this.setState({
      productValues: newValue,
      userRules: updatedRules
    })
  }

  handleSelectChange = (key, newValue) => {
    let newValues = { ...this.state.productValues };
    newValues[key] = newValue.value;
    this.setState({ productValues: newValues });
  };


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
    let URL = "product/create"
    let alertMessage = "Product Created Successfully"
    if (this.state.productValues._id) {
      alertMessage = "Product Updated Successfully"
      URL = "product/updateById"
    }
    try {
      let res = await axios.post(URL, this.state.productValues);
      let data = res.data;
      if (data && data.responseCode === "200") {
        let newProduct = data.responseData;
        let alert = {
          visible: true,
          alertmessage: alertMessage,
          alertType: "success"
        }
        this.setState({
          productValues: { ...this.state.productValues, ...newProduct },
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
                <Label htmlFor="productName">Product Name</Label>
                <ArkInput type="text" id="productName"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.productValues.productName}
                  ruleObject={validator.getRuleFromObject(this.state.productRules, "productName")} />
              </Col>
              <Col md="8">
                <Label htmlFor="productDescription">Product Description</Label>
                <ArkInput type="textarea" id="productDescription"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.productValues.productDescription}
                  ruleObject={validator.getRuleFromObject(this.state.productRules, "productDescription")} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="uom">UOM</Label>
                <RSelect
                  options={this.state.uomOptions}
                  onChange={(newValue) => this.handleSelectChange("uom", newValue)}
                  value={this.state.productValues.uom ?
                    this.state.uomOptions.filter((el) => el.value === this.state.productValues.uom) : null} />
              </Col>
              <Col md="4">
                <Label htmlFor="productHSN">Product HSN</Label>
                <ArkInput type="text" id="productHSN"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.productValues.productHSN}
                  ruleObject={validator.getRuleFromObject(this.state.productRules, "productHSN")} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="cgst">CGST</Label>
                <ArkInput type="number" id="cgst"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.productValues.cgst}
                  ruleObject={validator.getRuleFromObject(this.state.productRules, "cgst")} />
              </Col>
              <Col md="4">
                <Label htmlFor="sgst">SGST</Label>
                <ArkInput type="number" id="sgst"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.productValues.sgst}
                  ruleObject={validator.getRuleFromObject(this.state.productRules, "sgst")} />
              </Col>
              <Col md="4">
                <Label htmlFor="igst">IGST</Label>
                <ArkInput type="number" id="igst"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.productValues.igst}
                  ruleObject={validator.getRuleFromObject(this.state.productRules, "igst")} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="4">
                <Label htmlFor="unitPrice">Unit Price</Label>
                <ArkInput type="number" id="unitPrice"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.productValues.unitPrice}
                  ruleObject={validator.getRuleFromObject(this.state.productRules, "unitPrice")} />
              </Col>
              <Col md="4">
                <Label htmlFor="taxAmount">Tax Amount</Label>
                <ArkInput type="number" id="taxAmount"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.productValues.taxAmount}
                  ruleObject={validator.getRuleFromObject(this.state.productRules, "taxAmount")} />
              </Col>
              <Col md="4">
                <Label htmlFor="totalAmount">Total Amount</Label>
                <ArkInput type="number" id="totalAmount"
                  onChange={this.OnTextChangeHandler}
                  value={this.state.productValues.totalAmount}
                  ruleObject={validator.getRuleFromObject(this.state.productRules, "totalAmount")} />
              </Col>
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button type="reset" size="m" color="danger" onClick={this.context.router.history.goBack}><i className="fa fa-ban"></i> Reset</Button>
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

export default connect(mapStateToProps, null)(ManageProducts);
