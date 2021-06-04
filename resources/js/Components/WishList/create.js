import React,{Component} from 'react';
import { Redirect } from 'react-router';

class WishListCreate extends Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            item_name: '',
            price: '',
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

    handleSubmit(e) {
        e.preventDefault();

        if(this.handleValidation()) {
            const WishListData = this.state;
            axios.post('/wish-list/store',WishListData).then((response) => {
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
            return <Redirect to={'/wish-list'}/>
        }
        return(
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Add Wish List</div>

                        <div className="card-body">
                            <div className="row block-12">
                                <div className="col-lg-12 d-flex">
                                    <form onSubmit={this.handleSubmit} className="p-5 col-md-12">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Enter Item <span className="text-danger">*</span></label>
                                            <div className="col-sm-8">
                                                <input type="text" name="item_name" className="form-control" onChange={this.onChange}/>
                                                <span className="text-danger">{this.state.errors["item_name"]}</span>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Enter Price <span className="text-danger">*</span></label>
                                            <div className="col-sm-8">
                                                <input type="number" name="price" className="form-control" onChange={this.onChange}/>
                                                <span className="text-danger">{this.state.errors["price"]}</span>
                                            </div>
                                        </div>
                                        <div className="form-group float-right">
                                            <a href="/wish-list" className="btn btn-danger">Cancel</a>
                                            <button type="submit" className="btn btn-primary ml-2">Save Wish List</button>
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

export default WishListCreate;