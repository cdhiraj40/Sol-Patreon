import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {InitWorkspace} from "./api/useWorkspace";
import WalletContext from "./components/WalletContext";

function App() {

    InitWorkspace()
    return (
        <div className="App">
            <WalletContext>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/explore" element={<Explore/>}/>
                    <Route path="/profile/:walletaddress" element={<Profile/>}/>
                    <Route path="/edit-profile/:walletaddress" element={<EditProfile/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
            </WalletContext>
        </div>
    );
}

export default App;
