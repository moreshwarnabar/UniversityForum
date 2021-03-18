import React from 'react'
import { Button, Modal} from "react-bootstrap";


const EditFacultyDetails = props => (
<div className=" shadow-lg p-3 mt-5 mb-3 bg-white rounded ">
    <Modal show={props.showFacultyDetailsForm} centered>
        <Modal.Header><h4>Update Password</h4></Modal.Header>
        <Modal.Body>
        
        <table className="table table-responsive">
                    
                    <tbody>
                        <tr>
                            <td> <h6>department :</h6></td>
                            <td> <input  type="text" name="department" className="form-control" value={props.value.facultyDetails.department} onChange={props.changeFacultyDetailsHandler}/></td>
                        </tr>
                        <tr>
                            <td><h6>position :</h6>  </td>
                            <td> <input type="text"  name="position" className="form-control" value={props.value.facultyDetails.position} onChange={props.changeFacultyDetailsHandler}/></td>
                        </tr>
                        <tr>
                            <td>  <h6>experience :</h6></td>
                            <td><input type="number" min={0} name="experience" className="form-control" value={props.value.facultyDetails.experience} onChange={props.changeFacultyDetailsHandler}/></td>
                        </tr>

                        <tr>
                            <td>  <h6> Hire Date :</h6></td>
                            <td><input type="date" name="hireDate" className="form-control" value={props.value.facultyDetails.hireDate} onChange={props.changeFacultyDetailsHandler}/></td>
                        </tr>
                        
                    </tbody>
                </table>

        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.showEditFacultyDetailsForm}>Close</Button>
            <Button onClick={props.updateFacultyDetails}> Update</Button>
        </Modal.Footer>
    </Modal>
</div>
                


)
export default EditFacultyDetails