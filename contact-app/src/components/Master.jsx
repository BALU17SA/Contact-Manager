import {BrowserRouter,Routes,Route} from "react-router-dom";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'; 
import PersonDetails from "./PersonDetails";
import api from '../api/contacts';
import EditContact from "./EditContact";

const Master = () => {

    const [contacts, setContacts] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [searchResults,setSearchResults] = useState([]);

    //get request
    useEffect(() => {
        const fetchContacts = async () => {
            const response = await api.get("/contact");
            if (response.data) {
                setContacts(response.data);
            }
        };
        fetchContacts();
    }, []);  
   
    //post request
    const addContactHandler = async (contact) => {
        const request =  { id: uuid(), ...contact };
        const response = await api.post("/contact",request);
            setContacts([...contacts, response.data]);   //for local store management...
         //  State in React: React is designed to manage UI state locally, which is why we use state variables like contacts to store and manipulate data that affects the UI.
    }; 
    

    //update request
    const updateContactHandler = async (contact) =>{
        const response = await api.put(`/contact/${contact.id}`,contact)
        const {id, name, email } = response.data;
        setContacts(
            contacts.map((contact)=>{
                return contact.id === id ? {...response.data} : contact;
            })
        );
    }

    //delete request
    const removeContact = async (id) =>{
        await api.delete(`/contact/${id}`) 
        const newContacts = contacts.filter((con)=>{
            return con.id !== id;
        });
        setContacts(newContacts);
    };

    //searching method
    const searchHandler = (searchTermFromChild)=>{
        setSearchTerm(searchTermFromChild); 
        if( searchTerm!== "") {
            const newContactList = contacts.filter((contactttt)=>{
               return  Object.values(contactttt).join("").toLowerCase().includes(searchTerm.toLowerCase());
            })
            setSearchResults(newContactList);
        }
        else {
            setSearchResults(contacts);
        }
    }

    
    return(
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/add" element={ <AddContact addContact={addContactHandler} />}></Route>

                <Route path="/" element={<ContactList  searchKeyword={searchHandler}
                 con={ searchTerm.length < 1 ? contacts : searchResults }   onDeleteContact={removeContact} />}></Route>

                <Route path="/persondetails" element={<PersonDetails></PersonDetails>}></Route>
                <Route path="/edit" element={<EditContact  updateContactHandler={updateContactHandler}></EditContact>}></Route>
            </Routes>
            </BrowserRouter>
        </>
    )
}
export default Master;
