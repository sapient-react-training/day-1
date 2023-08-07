import React, { useState } from 'react';
import './App.css';
import Userform from './userform';

function App() {  //component
    return (    //jsx
        <div className="App">
            <Userform title='User form' prop1='value1'/>
            <Userform  title='Complain form'/>

        </div>
    );
}

export default App;
