import React, { useRef } from 'react';
import { FaTrash, FaUser, FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const ContactList = (props) => {

    const inputEl = useRef("");

    const handleDeleteClick = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (confirmDelete) {
            props.onDeleteContact(id);
        }
    };

    const navigate = useNavigate();

    const fun = () => {
        navigate("/add");
    };

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    };

    return (
        <>
            <button onClick={fun} className="add-contact-btn">Add Contact</button>
            <input type="text" placeholder="Search" ref={inputEl}  onChange={getSearchTerm} />
            <div className="container">
                {props.con.length > 0 ? (
                    props.con.map((contactt, index) => {
                        const { id, name, email } = contactt;

                        // Check if the name is not an empty string
                        if (name !== "") {
                            return (
                                <div key={index} className="contact-item">
                                    <div className="contact-details">
                                    <Link to={`/persondetails`} state={{ contactt }}>
                                        <FaUser className="icon" />
                                    </Link>
                                        <div className="contact-info">
                                            
                                                <p>{name}</p>
                                                <p>{email}</p>
                                                <p>{id}</p>
                                        </div>
                                    </div>
                                    <Link to={`/edit`} state={{ contactt }}>
                                        <FaEdit className="edit-icon" />
                                    </Link>
                                    <FaTrash
                                        className="delete-icon" 
                                        onClick={() => handleDeleteClick(id)}
                                    />
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <p>No contacts found</p>
                )}
            </div>
        </>
    );
};

export default ContactList;
