import React from 'react';
import './App.css';
import Jobs from './components/Jobs';

// Main App component
// all other components will be its children
function App() {
    return (
        <div className="container-fluid">
            {/* rendering our Jobs component, that manages complete CRUD operations of jobs */}
            <Jobs />
        </div>
    );
}

export default App;
