import React, {useEffect, useState} from 'react';
import './Modal.css'
import axios from "axios";
const ModalChange = ({changeButtonClicked, setUsers, setIsLoading, selectedUserID, changeUser, setSelectedUserEmail, setSelectedUserLastName, setSelectedUserFirstName, setChangeButtonClicked, selectedUserFirstName, selectedUserLastName, selectedUserEmail}) => {

    function handleCancelClick(){
        setChangeButtonClicked(false);
    }

    async function handleChangeClick(){
        if(selectedUserFirstName===""){
            alert("Введите фамилию пользователя!");
            return;
        }
        else if(selectedUserLastName===""){
            alert("Введите имя пользователя!");
            return;
        }
        else if(selectedUserEmail===""){
            alert("Введите почту пользователя!");
            return;
        }

        setIsLoading(true);
        const user={id: selectedUserID, firstname:selectedUserFirstName, lastname: selectedUserLastName, email:selectedUserEmail};
        await fetch('http://localhost:5000/admin/updateUser', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => console.error(error))

        try {
            const {data: response} = await axios.get('http://localhost:5000/admin/users');
            setUsers(response);
        } catch (error) {
            console.error(error.message);
        }

        setIsLoading(false);
    }

    return (
        <div className={changeButtonClicked ? "modal active" : "modal"} onClick={function () { setChangeButtonClicked(false)}}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h1>Введите новые данные для пользователя</h1>
                <div className="userFirstName">
                    <h1>Фамилия пользователя:</h1>
                    <input type="text" value={selectedUserFirstName} placeholder={"Введите фамилию пользователя"} onChange={(e) => setSelectedUserFirstName(e.target.value)} required />
                </div>
                <div className="userLastName">
                    <h1>Имя пользователя:</h1>
                    <input type="text" value={selectedUserLastName} placeholder={"Введите имя пользователя"} onChange={(e) => setSelectedUserLastName(e.target.value)} required />
                </div>
                <div className="userEmail">
                    <h1>Почта пользователя:</h1>
                    <input type="text" value={selectedUserEmail} placeholder={"Введите почту пользователя"} onChange={(e) => setSelectedUserEmail(e.target.value)} required />
                </div>
                <div className="buttons">
                    <button onClick={handleChangeClick}>Изменить</button>
                    <button onClick={handleCancelClick}>Отмена</button>
                </div>
            </div>
        </div>
    );
};
export default ModalChange;