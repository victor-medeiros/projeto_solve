import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdAccountBox } from 'react-icons/md';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../service/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfirmPassword] = useState('');
    const [picture, setPicture] = useState();
    const [profile_description, setProfileDescription] = useState('');
    const [professional, setProfessional] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [selectedImgUrl, setSelectedImgUrl] = useState('');

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        });
    }, []);

    async function handleSubmit(e){
        e.preventDefault();
        if(password !== confrimPassword){
            return alert('As senhas não batem');
        }

        let lat = null;
        let lon = null;

        const proStatus = professional ? 1 : 0;

        if (professional) {
            lat = latitude;
            lon = longitude;
        }

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        data.append('picture', picture);
        data.append('profile_description', profile_description);
        data.append('professional', proStatus);
        data.append('latitude', lat);
        data.append('longitude', lon);

        // if (picture) {
        // }
        await api.post('/user', data);
        alert('Cadastrado');
        history.push('/');
    }

    function handlePictureChange(file) {
        const image = file;
        setPicture(image);

        const imgUrl = URL.createObjectURL(image);
        setSelectedImgUrl(imgUrl);
    }

    function handleEmailChange(e){
        setEmail(e.target.value)
    }
    return (
        <div className="rcontainer">
            <form className="register-form-container" onSubmit={handleSubmit}>
                <div className="rheader">
                    <Link className="link" to="/">
                        <FiArrowLeft size={24} color="#19d7c8" />
                        <p>Voltar para a home</p>
                    </Link>
                </div>
                <label htmlFor="picture">
                    {picture 
                        ? <img src={selectedImgUrl} alt="image" className="profile-image" />
                        : <MdAccountBox size={100} color="#5D6F70" />
                    }
                </label>
                <input onChange={e => handlePictureChange(e.target.files[0])} accept='image/*' type="file" id="picture" style={{display: 'none'}} />
                <label htmlFor="picture">Upload da foto de perfil</label>

                <input 
                    className="rinput-element"
                    type="text"
                    id="name"
                    required
                    placeholder="Seu nome e sobrenome"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
                <input
                    className="rinput-element"
                    type="email"
                    id="email"
                    required
                    placeholder="E-mail"
                    onChange={handleEmailChange}
                    value={email}
                />

                <div className="rpassword-container">
                    <input 
                        type="password"
                        id="password"
                        placeholder="Senha"
                        required
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="Confirme sua senha"
                        required
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confrimPassword}
                    />
                </div>

                <div className="rcheckbox">
                    <input
                        value="true"
                        type="checkbox"
                        id="professional"
                        onChange={e => setProfessional(e.target.checked)}
                    />
                    <label htmlFor="professional">Quero trabalhar como técnico em informática na plataforma</label>
                </div>

                <div style={{display: professional ? 'block' : 'none', width: '80%', marginTop: 15}}>
                    <label className="rtitle" htmlFor="profile-description">Descrição do seu perfil, para facilitar sua contratação na plataforma</label>
                    <textarea
                        id="profile-description"
                        placeholder="Ex: Estou na área desde 2010, tenho experiência com concerto de computadores e notebooks."
                        onChange={e => setProfileDescription(e.target.value)}
                        value={profile_description}
                    />
                    <Map className="rmap" center={[ latitude, longitude ]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[ latitude, longitude ]} />
                    </Map>
                </div>

                <button className="rbutton-submit" type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Register;