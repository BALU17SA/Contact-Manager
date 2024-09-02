import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = (props) => {
    const navigate = useNavigate();

    let [data, setData] = useState({
        name: "", email: ""
    });

    const back = (e) => {
        e.preventDefault(); // Prevent the form from submitting
        navigate("/");
    }

    // Form submission logic
    const submit = (e) => {
        e.preventDefault(); // Prevent the form's default submit action

        if (!data.name) {
            alert("Name is mandatory");
            return; // Stop further execution if the name is empty
        }

        console.log(data);
        props.addContact(data);
        setData({ name: "", email: "" });
        navigate("/");
    }

    // Handle input changes
    const fun = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <>
            <form onSubmit={submit}>
                <label>Name:</label>
                <input type="text" name="name" value={data.name} placeholder="Enter name" onChange={fun} />

                <label>Email:</label>
                <input type="text" name="email" value={data.email} placeholder="Enter email" onChange={fun} />
                
                <button type="submit">Submit</button> 
                <button onClick={back} className="back-button">Back</button>
            </form>
        </>
    )
}
export default AddContact;
