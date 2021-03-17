import React from 'react'
import { Button, Modal} from "react-bootstrap";



const EditStudentDetails = props => (

<div className=" shadow-lg p-3 mt-5 mb-3 bg-white rounded ">
    <Modal show={props.showStudentDetailsForm} centered>
        <Modal.Header><h4>Update Password</h4></Modal.Header>
        <Modal.Body>
           
        <table className="table  table-responsive">
                    <tbody>
                        <tr>
                            <td> <label>branch :</label></td>
                            <td> <input  type="text" name="branch" className="form-control" value={props.value.studentDetails.branch} onChange={props.changeStudentDetailsHandler}/></td>
                        </tr>
                        <tr>
                            <td><label>stream :</label>  </td>
                            <td> <input type="text"  name="stream" className="form-control" value={props.value.studentDetails.stream} onChange={props.changeStudentDetailsHandler}/></td>
                        </tr>
                        <tr>
                            <td>  <label>year :</label></td>
                            <td><input type="text" name="year" className="form-control" value={props.value.studentDetails.year} onChange={props.changeStudentDetailsHandler}/></td>
                        </tr>
                        
                    </tbody>
                </table>

        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.showEditStudentDetailsForm}>Close</Button>
        <Button onClick={props.updateStudentDetails}> Update</Button>
        </Modal.Footer>
    </Modal>
</div>


                


)
export default EditStudentDetails