
import React, { useState } from 'react';
import './App.css';

interface User {
    name: string;
    age: number;
    skill: string;
}

function Userform(props: any) {  //component
    const [user, setUser] = useState<User>({  //local
        name: '',
        age: 0,
        skill: ''
    });
    function updateValue(event: any) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    function save(event: any) {
        /*   try {
               const response = await fetch('http://localhost:3001/profile', {
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
            const promise = fetch('http://localhost:3001/profile', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            promise.then((response) => {//100- 399
                response.json().then(data => console.log(data));
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
