import React,{Component} from 'react';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import WishList from './List';

class WishListIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            wishlists: [],
            dataLoaded: false,
            error: false,
            Data: false,
            completed: false,
			pageCount: 1,
			currentPage: 1,
            totalRows: 0,
            perPage: 10
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    };

    componentWillMount() {
        const page = this.getQueryStringValue('page');
        this.setState({ currentPage: page ? page : 1});

        this.getWishList();
    };

    async handlePageClick(data) {
		const page = data.selected >= 0 ? data.selected + 1 : 0;
		await Promise.resolve(this.setState(() => ({ currentPage: page })));

		this.getWishList();
	}

    getWishList() {
        axios.get('/wish-list?page=' + this.state.currentPage).then((response) => {
            if(response.data.data.length === 0){
                this.setState({ wishlists: [], dataLoaded: true ,error : false,Data : false});
            }else{
                this.setState({ wishlists: response.data.data.data, 
                            dataLoaded: true , 
                            error : false, 
                            Data : true,
                            currentPage: response.data.data.current_page,
                            pageCount: response.data.data.last_page,
                            totalRows: response.data.data.total});
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    deleteWishListHandler(key,id){
        if (window.confirm('Are you sure you want to delete?')) {
            axios.post('/wish-list/delete/'+id).then((response) => {
                if(response.data.status === 200){
                    if(this.state.wishlists.length == 1 && this.state.currentPage > 1) {
                        this.setState({currentPage: this.state.currentPage - 1});
                    }

                    this.getWishList();
                }
              }).catch(function(error) {
                  console.log(error);
              });
        } 
    }

    getQueryStringValue(key) {
		const value = decodeURIComponent(
			window.location.search.replace(
				new RegExp(
					'^(?:.*[&\\?]' +
						encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
						'(?:\\=([^&]*))?)?.*$',
					'i'
				),
				'$1'
			)
		);
		return value ? value : null;
	}

    render(){
        let WishListData = "";
        let Pagination = "";
        if(this.state.dataLoaded){
            if(this.state.Data){
                WishListData = this.state.wishlists.map((wishlist,key) =>
                    <WishList
                        key={key}
                        delete={() => this.deleteWishListHandler(key,wishlist.id)}
                        number={((this.state.currentPage-1)*this.state.perPage) + (key+1)}
                        item_name={wishlist.item_name}
                        price={wishlist.price}
                        date={wishlist.created_at}
                        id={wishlist.id}
                    />
                );
            }
            else{
                WishListData = <tr><td colSpan="4">No Results!</td></tr>;
            }
        } else{
            WishListData = <tr><td colSpan="4">Loading ...</td></tr>;
        }

        if(this.state.pageCount > 1) {
            Pagination  =   <ReactPaginate
                                pageCount={this.state.pageCount}
                                initialPage={this.state.currentPage - 1}
                                forcePage={this.state.currentPage - 1}
                                pageRangeDisplayed={4}
                                marginPagesDisplayed={2}
                                previousLabel="&#x276E;"
                                nextLabel="&#x276F;"
                                containerClassName="pagination float-right"
                                activeClassName="page-item active"
                                disabledClassName="page-item disabled"
                                previousClassName="page-link"
                                pageLinkClassName="page-link"
                                nextClassName="page-link"
                                onPageChange={this.handlePageClick}
                                disableInitialCallback={true}
                            />
        }

        return(
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row d-flex pt-2 pb-2">
                        <div className="col-xl-12 py-12 px-md-12">
                            <h3 className="pb-3">Wish Lists</h3>
                            <Link className="btn btn-secondary" to={`/wish-list/create`}>
                                <span className="ion-ios-add-circle"/> Add Wish List </Link>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col-xl-12 py-12 px-md-12 pt-4">
                            <p>Total Rows: {this.state.totalRows} row(s)</p>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Item Name</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {WishListData}
                                    </tbody>
                                </table>
                            </div>
                            {Pagination}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default WishListIndex;