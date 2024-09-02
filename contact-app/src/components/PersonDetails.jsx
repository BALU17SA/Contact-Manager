import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const PersonDetails = () => {
    const location = useLocation();
    const { contactt } = location.state;

    const navigate = useNavigate();
    
    console.log(contactt);
    console.log(location.state);

    const [data] = useState({
        id: contactt.id,
        name: contactt.name,
        email: contactt.email,
    });

    const fun = ()=>{
        navigate("/");
    }

    return (
        <div className="person-details-box">
            <img src="https://via.placeholder.com/150" alt="Contact" className="contact-image" />
            <div className="contact-info">
                <label>Name:</label>
                <input type="text" name="name" value={data.name} placeholder="Enter name" readOnly /> <br /><br />
                <label>Email:</label>
                <input type="text" name="email" value={data.email} placeholder="Enter email" readOnly />
            </div>
            <button onClick={fun}>Back</button>
        </div>
    );
};

export default PersonDetails;
