import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import "./AuthReg.css";

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeEmail(event) {
        setEmail(event.target.value);
        const { value } = event.target.elements.login;
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const user = {email, password};
        await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                if (data.token && data.role[0] ==="Admin") {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', data.role[0]);

                    alert(data.message);
                    const timer = setTimeout(() => {
                        navigate('/users');
                    }, 1000);
                }
                else if(data.token && data.role[0] ==="User"){
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', data.role[0]);
                    alert(data.message);
                    navigate("/transactions");
                }
                else{
                    alert(data.message);
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="auth_reg">
            <div className="title_text">
                <h1>Авторизация</h1>
            </div>
            <form className="auth_reg_form" onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder={"Введите почту"} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={password} placeholder={"Введите пароль"} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Авторизоваться</button>
            </form>
        </div>
    );
}
export default Login;