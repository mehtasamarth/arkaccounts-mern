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
        header: "Product Name",
        key: "productName",
        width: 30
      },
      {
        header: "HSN Code",
        key: "productHSN",
        width: 12
      },
      {
        header: "Unit Price",
        key: "unitPrice",
        width: 12
      },
      {
        header: "Tax",
        key: "taxAmount",
        width: 12
      },
      {
        header: "Total Amount",
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
    var sheet = workbook.addWorksheet('My Sheet');

    let borderStyle = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }

    sheet.columns = this.state.excelDownloadConfiguration;

    this.state.products.map(row => sheet.addRow(row));

    let columns = [];
    sheet.columns.map(column => {
      return columns.push(sheet.getColumn(column.key));
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
        console.log(response);
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
            Users
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }

export default connect(mapStateToProps, null)(Products);
