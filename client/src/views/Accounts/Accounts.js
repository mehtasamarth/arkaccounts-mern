import React, { Component } from 'react';
import axios from '../../helpers/axios'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import {
  Card, CardHeader, CardBody,
  Col, Row,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import SMWidget from '../../components/SMWidget/SMWidget'

// https://github.com/jbetancur/react-data-table-component/blob/master/src/themes/default.js
class Accounts extends Component {
  state = {
    alert: {
      visible: false,
      alertmessage: null,
      alertType: null
    },
    allAccounts: [],
    debitAccounts: [],
    creditAccounts: [],
    debitTotal: 0.00,
    creditTotal: 0.00,
    searchText: ""
  };

  OnTextChangeHandler = (event) => {
    let newValue = event.target.value;
    this.setState({
      searchText: newValue
    });
    this.populateDebitCreditAccounts(newValue);
  }
  componentDidMount() {
    this.getAccounts();
  }

  handleRowClicked = (row, event) => {
    console.log(row);
    console.log(event);
  }

  getAccounts = async () => {
    try {
      let URL = "account/get"
      let res = await axios.post(URL, { companyId: this.props.companyId });
      let data = res.data;

      if (data && data.responseCode === "200") {
        this.setState({
          allAccounts: data.responseData
        });
      }
      this.populateDebitCreditAccounts("");
    }
    catch (err) {
      let alert = {
        visible: true,
        alertmessage: "Oops..Something Went Wrong!",
        alertType: "danger"
      }
    }
  }
  onDismiss = () => {
    let newAlert = { ...this.state.alert };
    newAlert.visible = false;
    this.setState({ alert: newAlert });
  }

  populateDebitCreditAccounts = (searchKey) => {

    let allAccounts = this.state.allAccounts;
    let searchText = searchKey.length > 2 ? searchKey.toLowerCase() : null;
    console.log(searchText);
    let debitAccounts = [];
    let creditAccounts = [];
    let cTotal = 0.00;
    let debitTotal = 0.00;

    if (allAccounts && allAccounts.length > 0) {
      allAccounts.map((account) => {
        if (account.acountBalance >= 0) {
          cTotal += Number(account.acountBalance);
          if (!searchText) {
            creditAccounts.push(account)
          }
          else if (account.accountName.toLowerCase().includes(searchText)) {
            creditAccounts.push(account)
          }
        }
        else {
          let newAccount = { ...account };
          newAccount.acountBalance = Math.abs(account.acountBalance);
          debitTotal += Number(account.acountBalance);
          if (!searchText) {
            debitAccounts.push(newAccount)
          }
          else if (account.accountName.toLowerCase().includes(searchText)) {
            debitAccounts.push(newAccount)
          }
        }
        return true;
      })

      this.setState({
        debitAccounts: debitAccounts,
        creditAccounts: creditAccounts,
        creditTotal: cTotal,
        debitTotal: debitTotal
      });
    }
  }

  render() {
    const columns = [
      {
        name: 'Account Name',
        selector: 'accountName',
        sortable: true
      },
      {
        name: 'Phone No',
        selector: 'phoneno',
        sortable: true
      },
      {
        name: 'Outstanding Amount',
        selector: 'acountBalance',
        sortable: true
      }
    ];
    const tableTheme = {
      rows: {
        height: '30px'
      },
      header: {
        fontSize: '14px',
        height: '30px'
      },
      cells: {
        cellPadding: '20px',
      }
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="4" lg="2">
            <SMWidget header={this.state.creditTotal + ""} mainText="Credit" icon="fa fa-arrow-down" color="success" variant="1" />
          </Col>
          <Col xs="12" sm="4" lg="2">
            <SMWidget header={this.state.debitTotal + ""} mainText="Debit" icon="fa fa-arrow-up" color="danger" variant="1" />
          </Col>
          <Col xs="12" sm="4" lg="3">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button type="button" color="primary"><i className="fa fa-search"></i> </Button>
              </InputGroupAddon>
              <Input type="text" id="input1-group2" name="input1-group2"
                value={this.state.searchText} placeholder="Search Accounts"
                onChange={this.OnTextChangeHandler} />
            </InputGroup>
          </Col>
          <Col xs="12" sm="4" lg="2">
            <Button color="primary"><i className="fa fa-file-excel-o fa-lg"></i> Download</Button>
          </Col>
          <Col xs="12" sm="4" lg="2">
            <Link to="./accounts/manage">
              <Button color="primary"><i className="fa fa-plus-square fa-lg"></i> New Account</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader align="center" className="py-1">
                <strong>Debit Accounts</strong>
              </CardHeader>
              <CardBody className="p-0">
                <DataTable
                  noHeader
                  columns={columns}
                  data={this.state.debitAccounts}
                  highlightOnHover
                  defaultSortField="accountName"
                  customTheme={tableTheme}
                  onRowClicked={this.handleRowClicked}
                  pointerOnHover
                />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader align="center" className="py-1">
                <strong>Credit Accounts</strong>
              </CardHeader>
              <CardBody className="p-0">
                <DataTable
                  noHeader
                  columns={columns}
                  data={this.state.creditAccounts}
                  highlightOnHover
                  defaultSortField="accountName"
                  customTheme={tableTheme}
                  keyField="_id"
                  onRowClicked={this.handleRowClicked}
                  pointerOnHover
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
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


export default connect(mapStateToProps, null)(Accounts);
