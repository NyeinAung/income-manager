import React from 'react';
import { Link } from "react-router-dom";

const IncomeList = (props) => {
    return (
        <tr>
            <td>{props.number}</td>
            <td>{props.amount}</td>
            <td>
                <Link className="btn btn-primary" to={`/income/${props.id}/edit`}>
                    <span className="ion-ios-create"/> Edit </Link>&nbsp;
                <a href="#" className="btn btn-danger" onClick={props.delete}><span
                            className="ion-ios-remove-circle-outline"/> Delete</a>
            </td>
        </tr>
    );
};

export default IncomeList;