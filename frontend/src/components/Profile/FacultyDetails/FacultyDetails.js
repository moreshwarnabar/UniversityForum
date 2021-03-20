import React, { Component } from 'react';
import axios from 'axios'
import '../Profile.css'
import * as Icon from 'react-bootstrap-icons';
import EditFacultyDetails from '../../Edit/EditFacultyDetails/EditFacultyDetails';


class FacultyDetails extends Component{

    state = {
        facultyDetails : null,
        showFacultyDetailsForm : false,

        facultyFormDetails : null,

        error : {
            department : "",
            position : ""
        }

    }

    componentDidMount(){
        axios.get("http://localhost:8080/forum/faculty/3")
        .then(
            (response) => {
                console.log(response.data)
                this.setState({
                    facultyDetails : response.data.result,
                    facultyFormDetails : response.data.result
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
        const updatedFaculty = {...this.state.facultyFormDetails, [name]:value}
        this.setState({
            facultyFormDetails : updatedFaculty   
        }) 
    }

    validate(){
        if(this.state.facultyFormDetails.department.trim().length < 3){
            this.setState({
                error:{
                    department : "Invalid Department"
                }
            })
        }
         else if(this.state.facultyFormDetails.position.trim().length < 3){
            this.setState({
                error:{
                    position : "Invalid Position"
                }
            })
         }
         else{
            this.setState({
                error:{
                    department : "",
                    position : ""
                }
                
            })
            return true;
        }
    }

    updateFacultyDetails = (event) => {
        console.log("clicked updateFacultyDetails")
        if(this.validate()){
            axios.put("http://localhost:8080/forum/faculty", this.state.facultyFormDetails)
            .then(
                (response) => {
                    console.log(response.data)
                    this.setState({
                        showFacultyDetailsForm : false,
                        facultyDetails : response.data.result
                    })
                } 
            )
        }
    }

    render(){
        //console.log(this.state.facultyDetails)
        if(this.state.facultyDetails != null){
            return(
            
                <div className="card-body-profile shadow-lg p-3 mb-5 bg-white rounded">
                    {this.state.showFacultyDetailsForm ? 
                    <EditFacultyDetails  {...this.state.facultyFormDetails}
                    error={this.state.error}
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