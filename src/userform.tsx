
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './App.css';

enum GENDER { MALE, FEMALE }
interface User {
    name: string;
    age: number;
    skill: string;
    id: number;
    gender: GENDER;
}
const URL = 'http://localhost:3001/profile/';
function Userform(props: any) {  //component
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({  //local
        name: 'Pariwesh',
        age: 10,
        skill: '.Net',
        id: -1,
        gender: GENDER.MALE
    });
    const [skills, setSkills] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const getUsers = async () => {
        try {
            const response = await fetch(URL);
            const users = await response.json();
            //second call
            await fetch('second api ');
            setUsers(users);
        } catch (error) {
            //logic
        }
    }
    useEffect(() => {
        getUsers();
        getskills();
    }, []);
    async function getskills() {
        const response = await fetch('http://localhost:3001/skills');
        const skills = await response.json();
        setSkills(skills);
    }
    function updateValue(event: any) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    function save(event: any) {
        /*   try {
               const response = await fetch(URL, {
                   method: 'POST',
                   headers: {
                       'content-type': 'application/json'
                   },
                   body: JSON.stringify(user)
               });
               console.log(response);
           } catch (error) {//400-599
               console.error(error);
           }*/
        try {
            //delete user.id;
            const promise = fetch(URL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            promise.then((response) => {//100- 399
                response.json().then((savedUser: User) => {
                    setUsers([...users, savedUser]);
                });

            });
            promise.catch(error => console.log(error));
        } catch (error) {//400-599
            console.error(error);
        }
    }
    function deleteUser(id: any) {
        setShowModal(!showModal);
        setSelectedRecord(id);
    }
    async function handleDelete() {
        if (selectedRecord != null) {
            const response = await fetch(URL + selectedRecord, {
                method: 'delete'
            });
            getUsers();
            setShowModal(false);
            setSelectedRecord(null);
        }
    }
    return (    //jsx
        <div className="App">
            <Modal show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        No
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <h3>{props.title} , {props.prop1}</h3>
            <input name='name' value={user.name} onChange={updateValue} />
            <input name='age' type='number' value={user.age} onChange={updateValue} />
            <select name='skill' onChange={updateValue}>
                {
                    skills.map((skill) => {
                        return <option value={skill}>{skill}</option>
                    })
                }
            </select>
            <input type='radio' name='gender' value='MALE' onChange={updateValue} />Male
            <input type='radio' name='gender' value='FEMALE' onChange={updateValue} />Female

            <button onClick={save} >save</button>
            <ol>
                {users.map((user) => {
                    return <li key={user.id}> {user.name}, {user.age}<button onClick={() => deleteUser(user.id)} >X</button></li>; //react element
                })}
            </ol>

        </div>

    );
}
Userform.defaultProps = {
    title: 'default title',
    prop1: 'default value'
}
export default Userform;
