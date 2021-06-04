import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class IncomeEdit extends Component {
    constructor(props) {
        super(props);
        let id = '';
        if(props.match.params.id){
            id = props.match.params.id;
        }
        this.state = {
            id : id,
            data : false,
            amount: '',
            errors: {}
        }
        // bind
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // lifecycle mehtod
    componentDidMount() {
        this.getDetail();
    }

    // handle change
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // handle validation
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

    // handle submit
    handleSubmit(e) {
        e.preventDefault();
        if(this.handleValidation()){
            axios.post(`/income/update/${this.state.id}`, {
                amount: this.state.amount
            })
            .then(response => {
                // console.log('from handle sumit', response);
                if(response.data.status === 200){
                    this.props.history.push('/income');
                }
            });
        }
    }

    // get income detail
    getDetail() {
        axios.get('/income/detail/'+this.state.id).then((response) => {
            if(response.data.status === 200){
                if(response.data.data) {
                    this.setState({ amount: response.data.data.amount, data: true});
                } else {
                    this.setState({ Data : false});
                }
            }
        }).catch(function(error) {
        });
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header"><span className="ion-ios-create"></span> Edit Income</div>

                        <div className="card-body">
                            <div className="row block-12">
                                <div className="col-lg-12 d-flex">
                                    <form onSubmit={this.handleSubmit} className="p-5 col-md-12">
                                        <div className="form-group row">
                                            <label className="col-sm-5 col-form-label">Enter Monthly Income Amount <span className="text-danger">*</span></label>
                                            <div className="col-sm-7">
                                                <input type="number" name="amount" className="form-control" value={this.state.amount} onChange={this.onChange}/>
                                                <span className="text-danger">{this.state.errors["amount"]}</span>
                                            </div>
                                        </div>
                                        <div className="form-group float-right">
                                            <a href="/income" className="btn btn-danger">Cancel</a>
                                            <button type="submit" className="btn btn-primary ml-2">Update Income</button>
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

export default IncomeEdit;
