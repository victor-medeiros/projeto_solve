import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import './style.css';

import logo from '../../assets/logo.png';

const Login = () => {
    const history = useHistory();

    function handleSubmit(e){
        e.preventDefault();
        history.push('home/1')
    }

    return (
        <div className="container">
            <form className="form-container" onSubmit={handleSubmit}>
                <img src={logo} alt="Solve" />
                <input className="input-element" autofocus type="text" id="email" placeholder="Seu e-mail" />
                <input className="input-element" type="password" id="senha" placeholder="Sua senha" />
                <button type="submit" className="button-submit">Entrar</button>
                <div className="text-container">
                    <div className="checkbox">
                        <input type="checkbox" name="lembrar_senha" id="lembrar_senha" />
                        <label for="lembrar_senha">Lembrar minha senha</label>
                    </div>
                    <Link className="form-link" to="./cadastro.html">Esqueci minha senha</Link>
                    <span>Ainda não possui conta? <Link className="form-link" to="/register">Crie agora!</Link></span>
                </div>
            </form>
        </div>
    );
}

export default Login;