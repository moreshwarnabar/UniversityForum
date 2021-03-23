import React from 'react'
import { Button, Modal} from "react-bootstrap";



const EditStudentDetails = props => (

<div className=" shadow-lg p-3 mt-5 mb-3 bg-white rounded ">
    <Modal show={props.showStudentDetailsForm} onHide={props.showEditStudentDetailsForm} centered>
        <Modal.Header><h4>Update Details</h4></Modal.Header>
        <Modal.Body>
           
        <table className="table  table-responsive">
                    <tbody>
                        <tr>
                            <td> <label>branch :</label></td>
                            <td> 
                                <input  type="text" name="branch" className="form-control" value={props.branch} onChange={props.changeStudentDetailsHandler}/>
                                <div  className="text-danger">{props.error.branch}</div>    
                            </td>    
                        </tr>
                        <tr>
                            <td><label>stream :</label>  </td>
                            <td> 
                                <input type="text" name="stream" className="form-control" value={props.stream} onChange={props.changeStudentDetailsHandler}/>
                                <div  className="text-danger">{props.error.stream}</div>  
                            </td>                       
                        </tr>
                        <tr>
                            <td>  <label>year :</label></td>
                            <td><input type="number" min={1995} max={2021} step={1} name="year" className="form-control" value={props.year} onChange={props.changeStudentDetailsHandler}/></td>
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