import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WishListEdit extends Component {
    constructor(props) {
        super(props);
        let id = '';
       
        if(props.match.params.id){
            id = props.match.params.id;
        }

        this.state = {
            id : id,
            data : false,
            item_name: '',
            price: '',
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

        // Item Name
        if(this.state.item_name == "") {
            errors["item_name"] = "The item name field is required!";
            formIsValid = false;
        }

        //Price
        if(this.state.price == ""){
           errors["price"] = "The price field is required!";
           formIsValid = false;
        }     
        else if(this.state.price <=0) {
            errors["price"] = "The price must be greater than zero!";
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    // handle submit
    handleSubmit(e) {
        e.preventDefault();

        if(this.handleValidation()) {
            axios.post(`/wish-list/update/${this.state.id}`, {
                item_name: this.state.item_name,
                price: this.state.price,
            })
            .then(response => {
                // console.log('from handle sumit', response);
                if(response.data.status === 200){
                    this.props.history.push('/wish-list');
                }
            });
        }
    }

    // get wish list detail
    getDetail() {
        axios.get('/wish-list/detail/'+this.state.id).then((response) => {
            if(response.data.status === 200){
                if(response.data.data) {
                    this.setState({ item_name: response.data.data.item_name, price: response.data.data.price, data: true});
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
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header"><span className="ion-ios-create"></span> Edit Wish List</div>

                        <div className="card-body">
                            <div className="row block-12">
                                <div className="col-lg-12 d-flex">
                                    <form onSubmit={this.handleSubmit} className="p-5 col-md-12">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Enter Item <span className="text-danger">*</span></label>
                                            <div className="col-sm-8">
                                                <input type="text" name="item_name" className="form-control" value={this.state.item_name} onChange={this.onChange}/>
                                                <span className="text-danger">{this.state.errors["item_name"]}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Enter Price <span className="text-danger">*</span></label>
                                            <div className="col-sm-8">
                                                <input type="number" name="price" className="form-control" value={this.state.price} onChange={this.onChange}/>
                                                <span className="text-danger">{this.state.errors["price"]}</span>
                                            </div>
                                        </div>
                                        <div className="form-group float-right">
                                            <a href="/wish-list" className="btn btn-danger">Cancel</a>
                                            <button type="submit" className="btn btn-primary ml-2">Update Wish List</button>
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

export default WishListEdit;
