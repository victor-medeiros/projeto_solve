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

        const user = response.data.user[0];

        if(user === undefined) {
            return alert('Usuario inexistente');
        }

        // if(user.professional){
        //     localStorage.setItem('professional_id', user.id);
        //     localStorage.setItem('professional_name', user.name);
        //     localStorage.setItem('professional_picture', user.picture_url);
        // } else {
        //     localStorage.setItem('client_id', user.id);
        //     localStorage.setItem('client_picture', user.picture_url);
        //     localStorage.setItem('client_name', user.name);
        // };

        localStorage.setItem('user_id', user.id);
        localStorage.setItem('user_picture', user.picture_url);
        localStorage.setItem('user_name', user.name);
        localStorage.setItem('professional', user.professional);

        // localStorage.setItem('lastUserLogged', user.professional)

        return history.push(`home/${user.id}`);
    }

    return (
        <div className="container">
            <form className="form-container" onSubmit={handleSubmit}>
                <img src={logo} alt="Solve" />
                <input 
                    className="input-element"
                    type="email"
                    id="email"
                    placeholder="Seu e-mail"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <input
                    className="input-element"
                    type="password"
                    id="password"
                    placeholder="Sua senha"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button type="submit" className="button-submit">Entrar</button>
                <div className="text-container">
                    <span>Ainda não possui conta? <Link className="form-link" to="/register">Crie agora!</Link></span>
                </div>
            </form>
        </div>
    );
}

export default Login;