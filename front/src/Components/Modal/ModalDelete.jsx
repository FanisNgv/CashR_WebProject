import React, {useEffect, useState} from 'react';
import './Modal.css'
import axios from "axios";
const Modal = ({deleteButtonClicked, setDeleteButtonClicked, deleteUser}) => {

    function handleClick(){
        setDeleteButtonClicked(false);
    }

     return (
        <div className={deleteButtonClicked ? "modal active" : "modal"} onClick={function () { setDeleteButtonClicked(false)}}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h1>Вы действительно хотите удалить пользователя?</h1>
                <div className="buttons">
                    <button onClick={deleteUser}>Удалить</button>
                    <button onClick={handleClick}>Отмена</button>
                </div>
            </div>
        </div>
    );
};
export default Modal;