import './App.css';
import React from "react";
import {Routes, Route} from "react-router-dom";
import {OrderList} from "./component/OrderList";
import 'bootstrap/dist/css/bootstrap.css';
import {OrderCreate} from "./component/OrderCreate";
import {OrderUpdate} from "./component/OrderUpdate";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<OrderList/>}/>
                <Route path="/create" element={<OrderCreate/>}/>
                <Route path="/update/:id" element={<OrderUpdate/>}/>
            </Routes>
        </>
    );
}

export default App;
