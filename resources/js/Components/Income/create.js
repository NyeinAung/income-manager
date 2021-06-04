import React,{Component} from 'react';
import { Redirect } from 'react-router';

class IncomeCreate extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            amount: "",
            errors: {},
            fireRedirect: false
        };
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    handleValidation(){
        let errors = {};
        let formIsValid = true;

        //Amount
        if(this.state.amount == ""){
           errors["amount"] = "The amount field is required!";
           formIsValid = false;
        }     
        else if(this.state.amount <=0) {
            errors["amount"] = "The amount must be greater than zero!";
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.handleValidation()){
            const IncomeData = this.state;
            axios.post('/income/store',IncomeData).then((response) => {
                if(response.data.status === 200){
                    this.setState({ fireRedirect: true });
                }else{
                    // console.log(response);
                }
            }).catch(function (error) {
                // console.log(error);
            });
        }
    }

    render(){
        if(this.state.fireRedirect) {
            return <Redirect to={'/income'}/>
        }
        return(
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add Income</div>

                        <div className="card-body">
                            <div className="row block-12">
                                <div className="col-lg-12 d-flex">
                                    <form onSubmit={this.handleSubmit} className="p-5 col-md-12">
                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label">Enter Monthly Income Amount <span className="text-danger">*</span></label>
                                            <div className="col-sm-7">
                                                <input type="number" name="amount" className="form-control" onChange={this.onChange}/>
                                                <span className="text-danger">{this.state.errors["amount"]}</span>
                                            </div>
                                        </div>
                                        <div className="form-group float-right">
                                            <a href="/income" className="btn btn-danger">Cancel</a>
                                            <button type="submit" className="btn btn-primary ml-2">Save Income</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IncomeCreate;