import React,{Component} from 'react';
import { Link } from "react-router-dom";
import ManageIncomeList from './List';

class ManageIncomeListIndex extends Component{
    constructor(props){
        super(props);
        this.state = {
            matchlists: [],
            dataLoaded: false,
            error: false,
            Data: false
        };
    };

    componentWillMount() {
        axios.get('/manage-income').then((response) => {
            if(response.data.data.length === 0){
                this.setState({ matchlists: [], dataLoaded: true ,error : false,Data : false});
            }else{
                this.setState({ matchlists: response.data.data, dataLoaded: true , error : false, Data : true});
            }
        }).catch(function(error) {
            console.log(error);
        });
    };

    render(){
        let MatchListData=null;
        if(this.state.dataLoaded){
            if(this.state.Data){
                MatchListData = this.state.matchlists.map((matchlist,key) =>
                    <ManageIncomeList
                        key={key}
                        number={key+1}
                        month={matchlist.month}
                        match_name={matchlist.match_name}
                        comment={6}
                    />
                );
            }
            else{
                MatchListData = <tr><td>No Results!</td></tr>;
            }
        } else{
            MatchListData = <tr><td>Loading ...</td></tr>;
        }

        return(
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="row d-flex pt-2 pb-2">
                        <div className="col-xl-12 py-12 px-md-12">
                            <h3 className="pb-3">Manage Income</h3>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className="col-xl-12 py-12 px-md-12">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <tbody>
                                        {MatchListData}
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

export default ManageIncomeListIndex;