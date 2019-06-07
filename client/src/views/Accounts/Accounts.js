import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import {
  Card, CardHeader, CardBody,
  Col, Row,
  FormGroup,
  Label,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import SMWidget from '../../components/SMWidget/SMWidget'


class Accounts extends Component {
  state = {
    alert: {
      visible: false,
      alertmessage: null,
      alertType: null
    },
    debitAccounts: [],
    creditAccounts: []
  };


  componentDidMount() {
  }

  onDismiss = () => {
    let newAlert = { ...this.state.alert };
    newAlert.visible = false;
    this.setState({ alert: newAlert });
  }

  render() {
    const data = [{ id: 1, name: "Samarth Mehta", phoneno: "7259181009", amount: "12345.22" },
    { id: 2, name: "Prerna Gupta", phoneno: "8128998643", amount: "25000.33" },
    { id: 3, name: "Kumar Trevadia", phoneno: "7259181009", amount: "22345.22" },
    { id: 4, name: "Samarth Mehta", phoneno: "7259181009", amount: "12345.22" },
    { id: 5, name: "Prerna Gupta", phoneno: "8128998643", amount: "25000.33" },
    { id: 6, name: "Kumar Trevadia", phoneno: "7259181009", amount: "22345.22" }];
    const columns = [
      {
        name: 'Account Name',
        selector: 'name',
        sortable: true
      },
      {
        name: 'Phone No',
        selector: 'phoneno',
        sortable: true
      },
      {
        name: 'Outstanding Amount',
        selector: 'amount',
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
            <SMWidget header="1.999,50" mainText="Credit" icon="fa fa-arrow-down" color="success" variant="1" />
          </Col>
          <Col xs="12" sm="4" lg="2">
            <SMWidget header="1.999,50" mainText="Debit" icon="fa fa-arrow-up" color="danger" variant="1" />
          </Col>
          <Col xs="12" sm="4" lg="3">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button type="button" color="primary"><i className="fa fa-search"></i> </Button>
              </InputGroupAddon>
              <Input type="text" id="input1-group2" name="input1-group2" placeholder="Search Accounts" />
            </InputGroup>
            <FormGroup check inline>
              <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
              <Label className="form-check-label" check htmlFor="inline-checkbox1">Open Accounts Only</Label>
            </FormGroup>
          </Col>
          <Col xs="12" sm="4" lg="2">
            <Button color="primary"><i className="fa fa-file-excel-o fa-lg"></i> Download</Button>
          </Col>
          <Col xs="12" sm="4" lg="2">
            <Button color="primary"><i className="fa fa-plus-square fa-lg"></i> New Account</Button>
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
                  data={data}
                  highlightOnHover
                  defaultSortField="name"
                  customTheme={tableTheme}
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
                  data={data}
                  highlightOnHover
                  defaultSortField="name"
                  customTheme={tableTheme}
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
