import React, { useState } from 'react';
import Main from './MainPage';
import Teachers from './Teachers';
import Students from './Students';
import './styles.css';

function App() {
    const [activeTab, setActiveTab] = useState("Main");

    return (
        <div className="app">
            <h1>College ERP </h1>
            <div className="tabs">
                <button onClick={() => setActiveTab("Main")} className={activeTab === "Main" ? "active" : ""}>Main</button>
                <button onClick={() => setActiveTab("Teachers")} className={activeTab === "Teachers" ? "active" : ""}>Teachers</button>
                <button onClick={() => setActiveTab("Students")} className={activeTab === "Students" ? "active" : ""}>Students</button>
            </div>

            <div className="content">
                {activeTab === "Main" && <Main />}
                {activeTab === "Teachers" && <Teachers />}
                {activeTab === "Students" && <Students />}
            </div>
        </div>
    );
}

export default App;
