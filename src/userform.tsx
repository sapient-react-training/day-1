
import React, { useEffect, useState } from 'react';
import './App.css';

interface User {
    name: string;
    age: number;
    skill: string;
}
const URL = 'http://localhost:3001/profile';
function Userform(props: any) {  //component
    const [user, setUser] = useState<User>({  //local
        name: '',
        age: 0,
        skill: ''
    });
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
    const [users, setUsers] = useState<any>([]);
    useEffect(() => {
        getUsers();
    }, []);
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
            const promise = fetch(URL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            promise.then((response) => {//100- 399
                response.json().then(savedUser => {
                    setUsers([...users, savedUser]);
                });

            });
            promise.catch(error => console.log(error));
        } catch (error) {//400-599
            console.error(error);
        }
    }
    return (    //jsx
        <div className="App">
            <h3>{props.title} , {props.prop1}</h3>
            <input name='name' value={user.name} onChange={updateValue} />
            <input name='age' type='number' value={user.age} onChange={updateValue} />
            <input name='skill' value={user.skill} onChange={updateValue} />
            <button onClick={save} >save</button>
        </div>
    );
}
Userform.defaultProps = {
    title: 'default title',
    prop1: 'default value'
}
export default Userform;
