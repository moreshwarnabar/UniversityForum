import React, { Component } from 'react';
import axios from 'axios'
import '../Profile.css'
import avatar7 from '../../../resources/images/avatar7.png';
import * as Icon from 'react-bootstrap-icons';
import EditUser from '../../Edit/EditUser/EditUser';
import EditPassword from '../../Edit/EditPassword/EditPassword';
import { Button} from "react-bootstrap";

class UserDetails extends Component{
    state = {
        userDetails : null,
        showUserDetailsForm : false,
        
        password : '',
        reTypedPassword : '',
        showPasswordForm : false,
        message : ''
    }

    componentDidMount(){
        axios.get("http://localhost:8080/forum/users/ganesh123/ganesh123")
        .then(
            (response) => {
                console.log(response.data)
                this.setState({
                    userDetails : response.data.result
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


    //Password Change
    showEditPasswordForm = () =>{
        console.log("clicked edit Password")
        this.setState({
            showPasswordForm : !this.state.showPasswordForm
          
        })
    }

    changePasswordHandler = (event) =>{
        this.setState({
            password : event.target.value,
        })
    }
    changeRetypedPasswordHandler = (event) =>{
        this.setState({
            reTypedPassword : event.target.value
        })
    }

    updatePassword = (event) => {
        console.log("clicked update Password")
        console.log(this.state.password +" "+ this.state.reTypedPassword)

        if(this.state.password === this.state.reTypedPassword){
            if(this.state.password.length > 6){
                console.log(this.state.password +" == "+ this.state.reTypedPassword)
                const userpass ={
                    password : this.state.password
                }
                axios.put("http://localhost:8080/forum/users/password/1", userpass)
                .then(
                    (response) => {
                        console.log(response.data)
                        this.setState({
                            showUserDetailsForm : false
                        })
                        this.setState({
                            showPasswordForm : false,
                            message : response.data.result
                        })
                    } 
                )
                
            }else{
                this.setState({
                    showPasswordForm : true,
                    message : "Password must contain more than 6 character"
                })
            }
        }else{
            this.setState({
                showPasswordForm : true,
                message : "Password must be same in both fields"
            })
        }
        
    }


    showEditUserDetailsForm = () => {
        console.log("clicked editUser")
        this.setState({
            showUserDetailsForm : !this.state.showUserDetailsForm
          
        })
    } 

    changeUserDetailsHandler = (event) =>{
        const {name,value} = event.target
        const updatedUser = {...this.state.userDetails, [name]:value}
        this.setState({
            userDetails : updatedUser   
        }) 
    }

    updateUserDetails = (event) => {
        console.log("clicked updateUserDetails")
        console.log(this.state.userDetails)
        axios.put("http://localhost:8080/forum/users", this.state.userDetails)
        .then(
            (response) => {
                console.log(response.data)
                this.setState({
                    showUserDetailsForm : false
                })
            } 
        )
    }

    render(){
        
        if(this.state.userDetails != null){
            return(

        <div>
            
             
            <EditUser  value={this.state.userDetails}
            showUserDetailsForm={this.state.showUserDetailsForm}
            showEditUserDetailsForm={this.showEditUserDetailsForm}
            updateUserDetails={this.updateUserDetails}
            changeUserDetailsHandler={this.changeUserDetailsHandler}
            /> 
           
            <div className=" shadow-lg p-3 mt-5 mb-3 bg-white rounded ">
                
                    <div className="row ml-4 justify-content-between">
                        <h3 className="ml-2">Profile :</h3>
                        <Button variant="light" size="sm" className="mb-3 " onClick={this.showEditPasswordForm}> <Icon.ShieldLockFill/> Change Password </Button>
                        
                        <Button variant="light"  size="sm" className="mr-5 mb-3" onClick={this.showEditUserDetailsForm}> <Icon.PencilFill/> </Button>
                    </div>
               
               <div className="row">
                    <div className="col-sm-4">
                    <img  className="float-left img-fluid rounded-circle" src={avatar7} alt="Profile Pic"></img>
                    </div>
               
                    <hr/>
                
                    <div className="col-sm-8">


                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td> <h6 className="ml-5">Full Name</h6></td>
                                <td> <div className="text-secondary ml-5"> {this.state.userDetails.firstName} {this.state.userDetails.lastName}</div></td>
                            </tr>
                            <tr>
                                <td> <h6 className="ml-5">Email</h6></td>
                                <td> <div className="text-secondary ml-5"> {this.state.userDetails.username}</div></td>
                            </tr>
                            <tr>
                                <td>  <h6 className="ml-5">Date of Birth</h6></td>
                                <td> <div className="text-secondary ml-5">{this.state.userDetails.dateOfBirth}</div></td>
                            </tr>
                            <tr>
                                <td>  <h6 className="ml-5">Gender</h6></td>
                                <td> <div className="text-secondary ml-5">{this.state.userDetails.gender}</div></td>
                            </tr>
                            <tr>
                                <td>   <h6 className="ml-5">Role</h6></td>
                                <td> <div className="text-secondary ml-5">{this.state.userDetails.role}</div></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-success">{this.state.message}</div>
                    </div>
                </div>
            </div>
            

            <EditPassword password={this.state.password}
            reTypedPassword={this.state.reTypedPassword}
            showPasswordForm={this.state.showPasswordForm}
            message={this.state.message}
            showEditPasswordForm={this.showEditPasswordForm}
            changePasswordHandler={this.changePasswordHandler}
            changeRetypedPasswordHandler={this.changeRetypedPasswordHandler}
            updatePassword ={this.updatePassword}
            />
               
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
export default UserDetails;