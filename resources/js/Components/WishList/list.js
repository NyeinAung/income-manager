import React from 'react';
import { Link } from "react-router-dom";

const WishList = (props) => {
    return (
        <tr>
            <td>{props.number}</td>
            <td>{props.item_name}</td>
            <td>{props.price}</td>
            <td>
                <Link className="btn btn-primary" to={`/wish-list/${props.id}/edit`}>
                    <span className="ion-ios-create"/> Edit </Link>&nbsp;
                <a href="#" className="btn btn-danger" onClick={props.delete}><span
                            className="ion-ios-remove-circle-outline"/> Delete</a>
            </td>
        </tr>
    );
};

export default WishList;