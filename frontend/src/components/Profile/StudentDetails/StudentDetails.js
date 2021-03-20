import React, { Component } from 'react';
import axios from 'axios'
import '../Profile.css'
import * as Icon from 'react-bootstrap-icons';
import EditStudentDetails from '../../Edit/EditStudentDetails/EditStudentDetails';

class StudentDetails extends Component{

    state = {
        studentDetails : null,
        showStudentDetailsForm : false,

        studentFormData : null,

        error : {
            branch : "",
            stream : ""
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8080/forum/students/1")
        .then(
            (response) => {
                console.log(response.data)
                this.setState({
                    studentDetails : response.data.result,
                    studentFormData : response.data.result
                })
            }
        )
       
    }

    validate = () =>{
        if(this.state.studentFormData.branch.trim().length < 3){
            this.setState({error:{branch: "Invalid Branch"}})
        }
        else  if(this.state.studentFormData.stream.trim().length < 3){
            this.setState({error:{stream: "Invalid Stream"}})
          }
        else{
            this.setState({
                error : {
                branch : "",
                stream : ""
                }
            })
            return true
        } 

    }

    showEditStudentDetailsForm = () => {
        console.log("clicked edit student")
        this.setState({
            showStudentDetailsForm : !this.state.showStudentDetailsForm
          
        })
    }

    changeStudentDetailsHandler = (event) =>{
        const {name,value} = event.target
        const updatedStudent = {...this.state.studentFormData, [name]:value}
        this.setState({
            studentFormData : updatedStudent   
        }) 
    }

    updateStudentDetails = (event) => {
       

        if(this.validate()){
            console.log("clicked updateStudentDetails")
            axios.put("http://localhost:8080/forum/students/", this.state.studentDetails)
            .then(
                (response) => {
                    console.log(response.data)
                    this.setState({
                        showStudentDetailsForm : false
                    })
                } 
            )
        }

    }

    render(){
        if(this.state.studentDetails != null){
            return(
            <div className="card-body-profile shadow-lg p-3 mb-5 bg-white rounded">

                        <div className="row ml-4 justify-content-between">
                            <h5 className=" ml-3">Student Details :</h5>
                            <button className="btn btn-sm btn-light mr-5" onClick={this.showEditStudentDetailsForm}> <Icon.PencilFill/> </button>
                        </div>
                    <hr/>
                    
                    <div className="row ">
                        <div className="col-sm-5">
                            <h6 className="ml-5">Branch </h6>
                        </div>
                        <div className="col-sm-7 text-secondary"> {this.state.studentDetails.branch} </div>
                    </div>
                    
                    <hr/>
                    <div className="row">
                        <div className="col-sm-5">
                            <h6 className="ml-5">Stream </h6>
                        </div>
                        <div className="col-sm-7 text-secondary"> {this.state.studentDetails.stream}</div>
                    </div>
                    
                    <hr/>
                    <div className="row">
                        <div className="col-sm-5">
                            <h6 className="ml-5">Admission year </h6>
                        </div>
                        <div className="col-sm-7 text-secondary">{this.state.studentDetails.year}</div>
                    </div>

                    <hr/>
                   
                   { 
                   this.state.showStudentDetailsForm ?
                    <EditStudentDetails  {...this.state.studentFormData}
                    error = {this.state.error}
                    showStudentDetailsForm={this.state.showStudentDetailsForm}
                    showEditStudentDetailsForm={this.showEditStudentDetailsForm}
                    updateStudentDetails={this.updateStudentDetails}
                    changeStudentDetailsHandler={this.changeStudentDetailsHandler}
                    /> : null
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
export default StudentDetails