import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditContact = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Access the passed contact data from the state
    const { contactt } = location.state;
    
    console.log(contactt);
    console.log(location.state);

    // Initialize the form state with the existing contact data
    const [data, setData] = useState({
        id: contactt.id,
        name: contactt.name,
        email: contactt.email,
    });

    // Back button logic
    const back = (e) => {
        e.preventDefault(); // Prevent the form from submitting
        navigate("/");
    };

    // Form submission logic
    const update = (e) => {
        e.preventDefault(); // Prevent the form's default submit action

        if (!data.name) {
            alert("Name is mandatory");
            return; // Stop further execution if the name is empty
        }

        console.log(data);
        setData({ name: "", email: "" });
        props.updateContactHandler(data);
        navigate("/");
    };

    // Handle input changes
    const fun = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <>
            <form onSubmit={update}>
                <label>Name:</label>
                <input type="text" name="name" value={data.name} placeholder="Enter name" onChange={fun} />

                <label>Email:</label>
                <input type="text" name="email" value={data.email} placeholder="Enter email" onChange={fun} />

                <button type="submit">Update</button>
                <button onClick={back} className="back-button">Back</button>
            </form>
        </>
    );
};

export default EditContact;
