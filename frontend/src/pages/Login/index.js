import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.png';
import api from '../../service/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        const data = {email, password};
        const response = await api.post('/login', data);

        const { user } = response.data;

        if(user === undefined) {
            return alert('Usuario inexistente');
        }
        return history.push(`home/${user.id}`);
    }

    return (
        <div className="container">
            <form className="form-container" onSubmit={handleSubmit}>
                <img src={logo} alt="Solve" />
                <input 
                    className="input-element"
                    type="text"
                    id="email"
                    placeholder="Seu e-mail"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    className="input-element"
                    type="password"
                    id="password"
                    placeholder="Sua senha"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit" className="button-submit">Entrar</button>
                <div className="text-container">
                    <div className="checkbox">
                        <input type="checkbox" name="lembrar_senha" id="lembrar_senha" />
                        <label htmlFor="lembrar_senha">Lembrar minha senha</label>
                    </div>
                    <Link className="form-link" to="./cadastro.html">Esqueci minha senha</Link>
                    <span>Ainda não possui conta? <Link className="form-link" to="/register">Crie agora!</Link></span>
                </div>
            </form>
        </div>
    );
}

export default Login;