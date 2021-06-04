import React from 'react';
import { Link } from "react-router-dom";

const ManageIncomeList = (props) => {
    return (
        <tr>
            <td>{props.month}</td>
            <td className="pre-wrap">{props.match_name}</td>
        </tr>
    );
};

export default ManageIncomeList;