import React,{Component} from 'react';
import { Switch,Route,Link } from "react-router-dom";
import axios from "axios";

import Income from './Income/Index';
import IncomeCreate from './Income/Create';
import IncomeEdit from './Income/Edit';

import WishList from './WishList/Index';
import WishListCreate from './WishList/Create';
import WishListEdit from './WishList/Edit';

import ManageIncome from './ManageIncome/Index';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            manage_income : false
        }
        this.logout = this.logout.bind(this)
    };

    componentWillMount() {
        this.checkMangeIncome();
    };

    checkMangeIncome() {
        axios.get('/manage-income/check').then((response) => {
            if(response.data.status === 200){
                this.setState({manage_income: true});
            }
        }).catch(function(error) {
            console.log(error);
        });
    }
    
    logout(){
        $("#logout").click();
    }

    render(){
        let manage_income_menu = "";
        if(this.state.manage_income) {
            manage_income_menu = <li className="nav-item active">
                                    <Link className="nav-link" to="/manage-income">Manage Income</Link>
                                </li>;
        } else {
            manage_income_menu = <li className="nav-item">
                                    <a className="nav-link">Manage Income</a>
                                </li>;
        }

        return(
            <div className="HeaderSection">
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary mb-5">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            Income Manager
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/income">Income</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/wish-list">Wish List</Link>
                                </li>
                                {manage_income_menu}
                                <li className="nav-item active">
                                    <a className="nav-link" href="#" onClick={this.logout}>Log Out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <Switch>
                        {/* Income Routes */}
                        <Route exact path="/income">
                            <Income />
                        </Route>
                        <Route path="/income/create">
                            <IncomeCreate />
                        </Route>
                        <Route path="/income/:id/edit" render={props => <IncomeEdit id=":id" {...props} />}>
                        </Route>

                        {/* Wish List Routes */}
                        <Route exact path="/wish-list">
                            <WishList />
                        </Route>
                        <Route exact path="/wish-list/create">
                            <WishListCreate />
                        </Route>
                        <Route path="/wish-list/:id/edit" render={props => <WishListEdit id=":id" {...props} />}>
                        </Route>

                        {/* Manage Income Route */}
                        <Route exact path="/manage-income">
                            <ManageIncome />
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Header;