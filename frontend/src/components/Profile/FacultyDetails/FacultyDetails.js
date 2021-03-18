import React, { Component } from 'react';
import axios from 'axios'
import '../Profile.css'
import * as Icon from 'react-bootstrap-icons';
import EditFacultyDetails from '../../Edit/EditFacultyDetails/EditFacultyDetails';


class FacultyDetails extends Component{

    state = {
        facultyDetails : null,
        showFacultyDetailsForm : false
    }

    componentDidMount(){
        axios.get("http://localhost:8080/forum/faculty/3")
        .then(
            (response) => {
                console.log(response.data)
                this.setState({
                    facultyDetails : response.data.result
                    
                })
            }
        )
        .catch(
            (error) => {
                console.log(error)
                this.setState({
                    erroMsg: "Error Something went Wrong"
                })
            }
        )
    }


    showEditFacultyDetailsForm = () => {
        console.log("clicked edit Faculty")
        this.setState({
            showFacultyDetailsForm : !this.state.showFacultyDetailsForm 
        })
    }

    changeFacultyDetailsHandler = (event) =>{
        const {name,value} = event.target
        const updatedFaculty = {...this.state.facultyDetails, [name]:value}
        this.setState({
            facultyDetails : updatedFaculty   
        }) 
    }

    updateFacultyDetails = (event) => {
        console.log("clicked updateFacultyDetails")
        
        axios.put("http://localhost:8080/forum/faculty", this.state.facultyDetails)
        .then(
            (response) => {
                console.log(response.data)
                this.setState({
                    showFacultyDetailsForm : false
                })
            } 
        )

    }

    render(){
        //console.log(this.state.facultyDetails)
        if(this.state.facultyDetails != null){
            return(
            
                <div className="card-body shadow-lg p-3 mb-5 bg-white rounded">
                    {this.state.showFacultyDetailsForm ? 
                    <EditFacultyDetails  value={this.state}
                    showFacultyDetailsForm={this.state.showFacultyDetailsForm}
                    showEditFacultyDetailsForm={this.showEditFacultyDetailsForm}
                    updateFacultyDetails={this.updateFacultyDetails}
                    changeFacultyDetailsHandler={this.changeFacultyDetailsHandler}
                    /> : 
                    <div>

                            <div className="row ml-4 justify-content-between">
                                <h5 className="ml-2">Faculty Details :</h5>
                                <button className="btn btn-sm btn-light mr-5 " onClick={this.showEditFacultyDetailsForm}> <Icon.PencilFill/> </button>                            
                            </div>
                        
                            <hr/>
                            
                        <div className="row">
                            <div className="col-sm-5">
                                    <h6 className="ml-5">Department </h6>
                            </div>
                                <div className="col-sm-7 text-secondary"> {this.state.facultyDetails.department} </div>
                        </div>
                            
                            <hr/>
                            <div className="row">
                                <div className="col-sm-5">
                                    <h6 className="ml-5">Position </h6>
                                </div>
                                <div className="col-sm-7 text-secondary"> {this.state.facultyDetails.position}</div>
                            </div>
                            
                            <hr/>
                            <div className="row">
                                <div className="col-sm-5">
                                    <h6 className="ml-5">Experience (years) </h6>
                                </div>
                                <div className="col-sm-7 text-secondary">{this.state.facultyDetails.experience}</div>
                            </div>
                            
                            <hr/>
                            <div className="row">
                                <div className="col-sm-5">
                                    <h6 className="ml-5">Hire Date </h6>
                                </div>
                                <div className="col-sm-7 text-secondary">{this.state.facultyDetails.hireDate}</div>
                            </div>
                    </div>
                }
                </div>
            )
        }
        else{
            return(
                <div>
                    Loading...
                </div>
            )
        }
    } 


}
export default FacultyDetails