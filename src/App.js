import './App.css';
import React from "react";
import decodeJwt from "jwt-decode";
import Dashboard from "./Dashboard";

function App() {
    return (
        <div className="App">
            <main className="App-main">
                <Dashboard/>
            </main>
        </div>
    );
}

export default App;
