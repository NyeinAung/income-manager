import React,{Component} from 'react';
import { Link } from "react-router-dom";
import IncomeList from './List';

class IncomeIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            incomes: [],
            dataLoaded: false,
            error: false,
            Data: false
        };
    };

    componentWillMount() {
        axios.get('/income').then((response) => {
            if(response.data.data.length === 0){
                this.setState({ incomes: [], dataLoaded: true ,error : false,Data : false});
            }else{
                this.setState({ incomes: response.data.data, dataLoaded: true , error : false, Data : true});
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    deleteIncomeHandler(key,id){
        if (window.confirm('Are you sure you want to delete?')) {
            axios.post('/income/delete/'+id).then((response) => {
                if(response.data.status === 200){
                    const incomes = this.state.incomes;
                    incomes.splice(key, 1);
                    if(incomes.length === 0){
                        this.setState({ incomes: [], dataLoaded: true ,error : false,Data : false});
                    }else{
                        this.setState({ incomes: incomes, dataLoaded: true ,error : false,Data : true});
                    }
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    render(){
        let IncomeListData=null;
        if(this.state.dataLoaded){
            if(this.state.Data){
                IncomeListData = this.state.incomes.map((income,key) =>
                    <IncomeList
                        key={key}
                        delete={() => this.deleteIncomeHandler(key,income.id)}
                        number={key+1}
                        amount={income.amount}
                        date={income.created_at}
                        id={income.id}
                    />
                );
            }
            else{
                IncomeListData = <tr><td colSpan="3">No Results!</td></tr>;
            }
        }else{
            IncomeListData = <tr><td colSpan="3">Loading ...</td></tr>;
        }

        let addList;
        if(this.state.incomes.length==0) {
            addList = <Link className="btn btn-secondary" to={`/income/create`}>
                        <span className="ion-ios-add-circle"/> Add Income </Link>
        }

        return(
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row d-flex pt-2 pb-2">
                        <div className="col-xl-12 py-12 px-md-12">
                            <h3 className="pb-3">Income Lists</h3>
                            {addList}
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col-xl-12 py-12 px-md-12">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {IncomeListData}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default IncomeIndex;