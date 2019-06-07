import React from 'react';
import {
    Button, Badge, Table
} from 'reactstrap';
import { Link } from "react-router-dom";

const arkTable = (props) => {
    let tableHeader = (
        <thead>
            <tr>
                {
                    props.tableConfiguration.map((element, index) => {
                        return <th key={index}>{element.header}</th>
                    })
                }
            </tr>
        </thead>
    );

    let tableBody = (
        <tbody>
            {
                props.data.map((dataRow, index) => {
                    return <tr key={index}>
                        {
                            props.tableConfiguration.map((dataColumn, index) => {
                                let cellData = null;
                                let value = dataRow[dataColumn.dataField] + "";
                                let displayValue = value;
                                if (dataColumn["valueConfig"]) {
                                    let valueConfig = dataColumn["valueConfig"];
                                    displayValue = valueConfig[value];
                                }
                                switch (dataColumn.type) {
                                    case "data":
                                        cellData = <td key={index}>{displayValue}</td>;
                                        break;
                                    case "badge":
                                        let badgeConfig = dataColumn["badgeConfig"];
                                        cellData = <td key={index}>
                                            <h5>
                                                <Badge color={badgeConfig[value]}>
                                                    {displayValue}
                                                </Badge>
                                            </h5>
                                        </td>
                                        break;
                                    case "link":
                                        let linkConfig = dataColumn["linkConfig"];
                                        cellData = <td key={index}>
                                            <Link to={{
                                                pathname: linkConfig["linkPath"],
                                                state: { id: dataRow[linkConfig.dataField] }
                                            }}>
                                                <Button color={linkConfig.btnColor}>
                                                    <i className={linkConfig.iconClass}></i>
                                                </Button>
                                            </Link>
                                        </td>
                                        break;
                                    case "delete":
                                        let linkConfig1 = dataColumn["linkConfig"];
                                        cellData = <td key={index}>
                                            <Button color={linkConfig1.btnColor} onClick={() => props.delete(dataRow)}>
                                                <i className={linkConfig1.iconClass}></i>
                                            </Button>
                                        </td>
                                        break;
                                    default:
                                        cellData = <td key={index}></td>
                                }
                                return cellData;
                            })
                        }
                    </tr>
                })
            }
        </tbody>
    )

    return (
        <Table responsive>
            {tableHeader}
            {tableBody}
        </Table>
    );
}

export default arkTable;
