import React from 'react'
import { Button, Modal} from "react-bootstrap";


const EditUser = props => (

<div>
<Modal show={props.showUserDetailsForm} onHide={props.showEditUserDetailsForm} centered>
        <Modal.Header><h4>Update Details</h4></Modal.Header>
        <Modal.Body>
           
        <table className="table table-responsive">
                    <tbody>
                        <tr>
                            <td>  <label>First Name:</label></td>
                            <td> 
                                <input name="firstName" className="form-control" value={props.firstName} onChange={props.changeUserDetailsHandler}/> 
                                <div  className="text-danger" ><small>{props.fName}</small></div>
                            </td>
                        </tr>
                        <tr>
                            <td> <label>Last Name:</label></td>
                            <td> 
                                <input name="lastName" className="form-control" value={props.lastName} onChange={props.changeUserDetailsHandler}/>
                                <div className="text-danger"><small>{props.lName}</small></div>    
                            </td>
                        </tr>
                        <tr>
                            <td><label>Date Of Birth :</label>  </td>
                            <td> <input type="date" name="dateOfBirth" className="form-control" value={props.dateOfBirth}  onChange={props.changeUserDetailsHandler}/></td>
                        </tr>
                        <tr>
                            <td>  <label>Gender :</label></td>
                            <td>
                                <input type="text" readOnly={true}  name="gender" className="form-control" value={props.gender} onChange={props.changeUserDetailsHandler}/>
                            </td>
                        </tr>
                        <tr>                    

                            <td> <label>Role :</label>  </td>
                            <td><input type="text" readOnly={true} name="role" className="form-control"  value={props.role} onChange={props.changeUserDetailsHandler}/></td>
                        </tr>
                       
                    </tbody>
                </table>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.showEditUserDetailsForm}>Close</Button>
        <Button onClick={props.updateUserDetails}> Update</Button>
        </Modal.Footer>
    </Modal>
  
</div>


)
export default EditUser