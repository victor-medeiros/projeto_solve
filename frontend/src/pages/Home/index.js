import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HomeComponent from './Components/HomeComponent/';
import AccountComponent from './Components/AccountComponent/';
import ServicesComponent from './Components/ServicesComponent/';
import { FiHome, FiServer, FiUser, FiLogOut } from 'react-icons/fi';
import Usuario1 from '../../assets/usuario1.png';
import './style.css';
import api from '../../service/api';

const Home = (props) => {
    const [page, setPage] = useState('home');
    const [user, setUser] = useState({});
    const client_id = props.match.params.id;
    const [request, setRequest] = useState('');
    const professional_id = 3;


    const history = useHistory();
    
    useEffect(()=> {
        if (localStorage.getItem('lastUserLogged') == 0) {
            setUser({
                id: localStorage.getItem('client_id'),
                name: localStorage.getItem('client_name'),
                picture: localStorage.getItem('client_picture'),
                professional: 0
            })
        } else {
            setUser({
                id: localStorage.getItem('professional_id'),
                name: localStorage.getItem('professional_name'),
                picture: localStorage.getItem('professional_picture'),
                professional: 1
            })
            setPage('services');
        }
    }, []);

    async function handleRequest(){
        const data = [client_id, professional_id, request]
        await api.post('/service', data);
        
    }

    function handleLogOut(){
        if (user.professional == 0) {
            localStorage.setItem('client_id', '');
            localStorage.setItem('client_name', '');
            localStorage.setItem('client_picture', '');
        } else {
            localStorage.setItem('professional_id', '');
            localStorage.setItem('professional_name', '');
            localStorage.setItem('professional_picture', '');
        }
        history.push('/');
    }
    
    return (
        <div className="hcontainer">
            <div className="side-menu">
                <div className="side-menu-header">
                    <img src={Usuario1} alt="usuario"/>
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
                    <li onClick={() => setPage('account')} className={page === 'account' ? 'selected-item' : ''}>
                        <FiUser size={20} color='#000' />
                        <p>Minha conta</p>
                    </li>
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