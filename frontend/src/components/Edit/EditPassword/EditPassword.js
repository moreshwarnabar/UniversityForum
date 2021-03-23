import React from 'react'
import { Button, Modal} from "react-bootstrap";

const EditPassword = props => (
<div>
                

    <Modal show={props.showPasswordForm} centered>
        <Modal.Header><h4>Update Password</h4>
       
        </Modal.Header>
        <Modal.Body>
            <p className="text-danger">{props.message}</p>
                <table className="table table-responsive">
                    <tbody>
                        <tr>
                            <td> <label>New password :</label></td>
                            <td> <input  type="password" placeholder="Password@123" minLength="6"  name="password" className="form-control" value={props.password} onChange={props.changePasswordHandler}/> </td>
                        </tr>
                        <tr>
                            <td> <label>Confirm New password  :</label></td>
                            <td> <input  type="password" placeholder="Password@123" minLength="6" name="retypedpPassword" className="form-control" value={props.reTypedPassword} onChange={props.changeRetypedPasswordHandler}/></td>
                        </tr>
                        
                    </tbody>
                </table>

        </Modal.Body>
        <Modal.Footer>
        <Button  type="submit" onClick={props.showEditPasswordForm}>Close</Button>
        <Button onClick={props.updatePassword}> Update</Button>
        </Modal.Footer>
    </Modal>
</div>
)
export default EditPassword