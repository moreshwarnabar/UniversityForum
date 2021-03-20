import React, { Component } from 'react';
import axios from 'axios'
import '../Profile.css'
import * as Icon from 'react-bootstrap-icons';
import EditContactDetails from '../../Edit/EditContactDetails/EditContactDetails'

class ContactDetails extends Component{
    state = {
        contactDetails: null,
        showContactDetailsForm : false,
        
        contactFormDetails : null,

        error :{
        phoneNo: "",
        PinCode: ""
        }
         
    }

    componentDidMount(){
        axios.get("http://localhost:8080/forum/contacts/1")
        .then(
            (response) => {
                console.log(response.data)
                this.setState({
                    contactDetails : response.data.result,
                    contactFormDetails :  response.data.result
                })
            }
        )
    }

    showEditContactDetailsForm = () => {
        console.log("clicked edit contactDetails")
        this.setState({
            showContactDetailsForm : !this.state.showContactDetailsForm
        })
    }


    changeContactDetailsHandler = (event) =>{
        const {name,value} = event.target
        const updatedContact = {...this.state.contactFormDetails, [name]:value}
        this.setState({
            contactFormDetails : updatedContact   
        }) 
    }

    validate = () =>{
        if(this.state.contactFormDetails.phoneNo.trim().length !== 10){
            this.setState({error : {
                phoneNo : "Mobile No. must contain 10 digit"
            }
        })
        }
        else  if(this.state.contactFormDetails.pinCode.trim().length !== 6){
            this.setState({error : {pinCode : "pincode must contain 6 digit"}})
          }
        else
        {
            this.setState({
                error : {
                phoneNo : "",
                pinCode : ""
                }
            })
            return true
        } 

    }

    updateContactDetails = (event) => {
        if(this.validate()){
            console.log("clicked updateContactDetails")
            axios.put("http://localhost:8080/forum/contacts/", this.state.contactFormDetails)
            .then(
                (response) => {
                    console.log(response.data)
                    this.setState({
                        showContactDetailsForm : false,
                        contactDetails : response.data.result
                    })
                } 
            )
        }
    }

    render(){
      
        if(this.state.contactDetails != null){
            return(

        <div className="card-body-profile shadow-lg p-3 mb-5 bg-white rounded">       
           <div>{this.initialContactDetails}</div>

                    <EditContactDetails  {...this.state.contactFormDetails}
                    error={this.state.error}
                    showContactDetailsForm={this.state.showContactDetailsForm}
                    showEditContactDetailsForm={this.showEditContactDetailsForm}
                    updateContactDetails={this.updateContactDetails}
                    changeContactDetailsHandler ={this.changeContactDetailsHandler}
                    />     
            <div >
            
                <div >
                    
                  
                    <div className="row ml-4 justify-content-between">
                        <h5 className=" ml-3">Contact Details :</h5>
                        <button className="btn btn-sm btn-light mr-5" onClick={this.showEditContactDetailsForm}> <Icon.PencilFill/> </button>
                    </div>
                        
    
                    <hr/>
                    
                    <div className="row">
                        <div className="col-sm-5">
                            <h6 className="ml-5">Mobile </h6>
                        </div>
                        <div className="col-sm-7 text-secondary"> {this.state.contactDetails.phoneNo} </div>
                    </div>
                    
                    <hr/>
                    <div className="row">
                        <div className="col-sm-5">
                            <h6 className="ml-5">city</h6>
                        </div>
                        <div className="col-sm-7 text-secondary"> {this.state.contactDetails.city}</div>
                    </div>
                    
                    <hr/>
                    <div className="row">
                        <div className="col-sm-5">
                            <h6 className="ml-5">state</h6>
                        </div>
                        <div className="col-sm-7 text-secondary">{this.state.contactDetails.state}</div>
                    </div>
            
                    <hr/>
                    <div className="row">
                        <div className="col-sm-5">
                            <h6 className="ml-5">Street</h6>
                        </div>
                        <div className="col-sm-7 text-secondary">{this.state.contactDetails.street}</div>
                    </div>
            
                    <hr/>
                    <div className="row">
                        <div className="col-sm-5">
                            <h6 className="ml-5">Pin code</h6>
                        </div>
                        <div className="col-sm-7 text-secondary"> {this.state.contactDetails.pinCode}</div>
                    </div>

                    

                </div>
                
            </div>

            
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
export default ContactDetails
