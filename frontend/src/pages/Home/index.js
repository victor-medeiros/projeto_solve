import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HomeComponent from './Components/HomeComponent/';
import AccountComponent from './Components/AccountComponent/';
import ServicesComponent from './Components/ServicesComponent/';
import { FiHome, FiServer, FiUser, FiLogOut } from 'react-icons/fi';
import './style.css';

const Home = (props) => {
    const [page, setPage] = useState('home');
    const [user, setUser] = useState({});


    const history = useHistory();
    
    useEffect(()=> {
        setUser({
            id: localStorage.getItem('user_id'),
            name: localStorage.getItem('user_name'),
            picture: localStorage.getItem('user_picture')
        })
    }, []);

    function handleLogOut(){
        localStorage.clear();
        history.push('/');
    }
    
    return (
        <div className="hcontainer">
            <div className="side-menu">
                <div className="side-menu-header">
                    <img src={user.picture} alt="usuario"/>
                    <p>{user.name}</p>
                </div>
                
                <u className="side-menu-items">
                    <li onClick={() => setPage('home')} className={page === 'home' ? 'selected-item' : ''}>
                        <FiHome size={20} color='#000' />
                        <p>Home</p>
                    </li>
                    <li onClick={() => setPage('services')} className={page === 'services' ? 'selected-item' : ''}>
                        <FiServer size={20} color='#000' />
                        <p>Servicos</p>
                    </li>
                    {/* <li onClick={() => setPage('account')} className={page === 'account' ? 'selected-item' : ''}>
                        <FiUser size={20} color='#000' />
                        <p>Minha conta</p>
                    </li> */}
                    <li onClick={handleLogOut}>
                        <FiLogOut size={20} color='#d71919' />
                        <p className="log-out">Sair</p>
                    </li>
                </u>
            </div>
            <HomeComponent display={page === 'home' ? 'block': 'none'} />
            <AccountComponent display={page === 'account'? 'block': 'none'} />
            <ServicesComponent display={page === 'services'? 'block': 'none'} />
        </div>
    );
};

export default Home;