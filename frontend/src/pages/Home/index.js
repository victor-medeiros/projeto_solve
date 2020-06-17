import React, { useState } from 'react';
import HomeComponent from './Components/HomeComponent/';
import AccountComponent from './Components/AccountComponent/';
import ServicesComponent from './Components/ServicesComponent/';
import { FiHome, FiServer, FiUser, FiLogOut } from 'react-icons/fi';
import Usuario1 from '../../assets/usuario1.png';
import './style.css';

const Home = (props) => {
    const id = props.match.params.id;

    const [page, setPage] = useState('home');
    return (
        <div className="container">
            <div className="side-menu">
                <div className="side-menu-header">
                    <img src={Usuario1} alt="usuario"/>
                    <p>Nome</p>
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
                    <li>
                        <FiLogOut size={20} color='#000' />
                        <p>Sair</p>
                    </li>
                </u>
            </div>
            <HomeComponent display={page === 'home'? 'block': 'none'} />
            <AccountComponent display={page === 'account'? 'block': 'none'} />
            <ServicesComponent display={page === 'services'? 'block': 'none'} />
        </div>
    );
};

export default Home;