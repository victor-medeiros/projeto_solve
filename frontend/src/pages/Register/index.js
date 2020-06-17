import React from 'react';
import { Link } from 'react-router-dom';
import { MdAccountBox } from 'react-icons/md';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';

const Register = () => {
    return (
        <div className="rcontainer">
            <form className="register-form-container">
                <div className="rheader">
                    <Link to="/">
                        <FiArrowLeft size={24} color="#19d7c8" />
                        <p>Voltar para a home</p>
                    </Link>
                </div>
                <label htmlFor="picture">
                    <MdAccountBox size={100} color="#5D6F70" />
                </label>
                <input type="file" id="picture" style={{display: 'none'}} />
                <label htmlFor="picture">Upload da foto de perfil</label>

                <input className="rinput-element" type="text" id="name" placeholder="Seu nome e sobrenome" />
                <input className="rinput-element" type="text" id="email" placeholder="E-mail" />

                <div className="rpassword-container">
                    <input type="password" id="password" placeholder="Senha" />
                    <input type="password" id="confirm-password" placeholder="Confirme sua senha" />
                </div>

                <div className="rcheckbox">
                    <input type="checkbox" id="professional" />
                    <label htmlFor="professional">Quero trabalhar como técnico em informática na plataforma</label>
                </div>

                <label className="rtitle" htmlFor="profile-description">Favoreça sua contratação na plataforma adicionando uma descrição do seu perfil</label>
                <textarea id="profile-description"></textarea>

                <button className="rbutton-submit" type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Register;