import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ArkAlert from '../../components/ArkAlert/ArkAlert'
import ArkTable from '../../components/ArkTable/ArkTable'
import {
  Alert,
  Button,
  Card, CardHeader, CardBody
} from 'reactstrap';
import axios from '../../helpers/axios'
import excelJS from 'exceljs/dist/es5/exceljs.browser'
import saveAs from 'save-as'
import { getDate } from '../../helpers/utility'

class Products extends Component {
  state = {
    tableConfiguration: [
      {
        header: "Product Name",
        dataField: "productName",
        type: "data"
      },
      {
        header: "HSN Code",
        dataField: "productHSN",
        type: "data"
      },
      {
        header: "Unit Price",
        dataField: "unitPrice",
        type: "data"
      },
      {
        header: "Tax",
        dataField: "taxAmount",
        type: "data"
      },
      {
        header: "Total Amount",
        dataField: "totalAmount",
        type: "data"
      },
      {
        header: "Edit",
        type: "link",
        linkConfig: {
          linkPath: "./products/manage",
          dataField: "_id",
          btnColor: "primary",
          iconClass: "cui-pencil icons font-xl mt-4"
        }
      },
      {
        header: "Delete",
        type: "link",
        linkConfig: {
          linkPath: "./products/manage",
          dataField: "_id",
          btnColor: "primary",
          iconClass: "cui-trash icons font-xl mt-4"
        }
      }
    ],
    excelDownloadConfiguration: [
      {
        key: "productName",
        width: 30
      },
      {
        key: "productHSN",
        width: 12
      },
      {
        key: "unitPrice",
        width: 12
      },
      {
        key: "taxAmount",
        width: 12
      },
      {
        key: "totalAmount",
        width: 14
      }
    ],
    alert: {
      visible: false,
      alertmessage: null,
      alertType: null
    },
    products: [],
    userToDelete: null,
    showDeleteModal: false
  };


  componentDidMount() {
    this.updateUsers();
  }

  downloadProducts = () => {
    var workbook = new excelJS.Workbook();
    workbook.creator = 'Ark Accounts';
    workbook.lastModifiedBy = 'Ark Accounts';
    workbook.created = new Date();
    workbook.modified = new Date();
    var worksheet = workbook.addWorksheet('My Sheet');

    let borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
    worksheet.mergeCells('A1:E1');

    var date = getDate();
    worksheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };;
    worksheet.getCell('E1').value = 'Ark Accounts - Products - ' + date;
    let calibriFont = {
      name: 'Calibri',
      size: 14,
      bold: true
    }

    worksheet.getCell('E1').style.font = calibriFont;
    worksheet.getRow(2).values = ['Product Name', 'HSN Code', 'Unit Price', 'Tax', 'Total Amount'];


    worksheet.getCell("A2").fill = {
      type: 'pattern',
      pattern: 'darkVertical',
      fgColor: { argb: 'FF22A7F0' },
      bgColor: { argb: 'FF22A7F0' }
    };

    worksheet.getCell("B2").fill = worksheet.getCell("A2").fill;
    worksheet.getCell("C2").fill = worksheet.getCell("A2").fill;
    worksheet.getCell("D2").fill = worksheet.getCell("A2").fill;
    worksheet.getCell("E2").fill = worksheet.getCell("A2").fill;


    worksheet.columns = this.state.excelDownloadConfiguration;

    this.state.products.map(row => worksheet.addRow(row));

    let columns = [];
    worksheet.columns.map(column => {
      return columns.push(worksheet.getColumn(column.key));
    })

    columns.map(column => {
      return column.eachCell((cell, colNumber) => {
        cell.border = borderStyle
      });
    })

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      saveAs(blob, "ark-Products.xlsx");
    });
  }

  updateUsers = () => {
    axios.post("product/get", {
      companyId: this.props.companyId
    })
      .then(response => {
        if (response.data && response.data.responseCode === "200") {
          let responseDataArray = response.data.responseData;
          this.setState({
            products: responseDataArray
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
            Products
            <Link to="./products/manage">
              <Button className="float-right" color="primary" >
                Add Product
              </Button>
            </Link>
            &nbsp;
            &nbsp;
              <Button className="float-right" color="primary" onClick={this.downloadProducts}>
              Download Products
              </Button>
          </CardHeader>
          <CardBody>
            <Alert color={this.state.alert.alertType}
              isOpen={this.state.alert.visible} toggle={this.onDismiss}>
              {this.state.alert.alertmessage}
            </Alert>
            <ArkTable
              tableConfiguration={this.state.tableConfiguration}
              data={this.state.products}
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


export default connect(mapStateToProps, null)(Products);
