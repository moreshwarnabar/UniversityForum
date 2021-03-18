import React from 'react';
import ContactDetails from '../../components/Profile/ContactDetails/ContactDetails';
import UserDetails from '../../components/Profile/UserDetails/UserDetails';
//import StudentDetails from '../../components/Profile/StudentDetails/StudentDetails';
import FacultyDetails from '../../components/Profile/FacultyDetails/FacultyDetails';


const ProfilePage = props => (

    <div>
        <div className='container'>
            
                <div >
                    <UserDetails/>
                   
                </div>
                
                <div className="d-flex justify-content-around">
                    <ContactDetails/>
                    {/* <StudentDetails/> */}
                    
                    <FacultyDetails/>
                </div>
                
        </div>

        
    </div>
)
export default ProfilePage