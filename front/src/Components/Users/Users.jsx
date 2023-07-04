import React, {useEffect, useState} from 'react';
import './Users.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Backdrop, CircularProgress} from '@mui/material';
import ModalDelete from '../Modal/ModalDelete'
import ModalChange from "../Modal/ModalChange";

import {Link} from "react-router-dom";
import Menu from "../Menu/Menu";

const Users = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({
        lastname:"",
        firstname:"",
        email:"",
        role:""
    });
    const [users, setUsers] = useState([]);
    const[deleteButtonClicked, setDeleteButtonClicked] = useState(false);
    const[changeButtonClicked, setChangeButtonClicked] = useState(false);
    const[selectedUserID, setSelectedUserID] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [menuActive, setMenuActive] = useState(false);
    const[selectedUserFirstName, setSelectedUserFirstName] = useState();
    const[selectedUserLastName, setSelectedUserLastName] = useState();
    const[selectedUserEmail, setSelectedUserEmail] = useState();
    const navigate = useNavigate();

    const MenuItems=[{value:"Выйти", action:handleLogoutClick, icon: "logout"}];


    const filteredUsers = users.filter(
        (user) =>
            (user.firstname + " " + user.lastname).toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(()=>{
        console.log(users);
    },[users])

    function handleLogoutClick(){
        navigate('/login');
        localStorage.clear();
    }

    useEffect(() => {
        const fetchData = (async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }
            try {
                const {data: response} = await axios.get('http://localhost:5000/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser({
                    lastname: response.lastname,
                    firstname: response.firstname,
                    email: response.email,
                    role: response.roles[0]
                });
            } catch (error) {
                console.error(error.message);
            }

            try {
                const {data: response} = await axios.get('http://localhost:5000/admin/users');
                setUsers(response);
            } catch (error) {
                console.error(error.message);
            }

            setIsLoading(false);
        });
        fetchData();
    }, []);

    useEffect(()=>{
        try {
            console.log(selectedUserID);
            fetch('http://localhost:5000/admin/getUser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({selectedUserID}),
            })
                .then(response => response.json())
                .then(async data => {
                    if(data){
                        setSelectedUserFirstName(data.firstname);
                        setSelectedUserLastName(data.lastname);
                        setSelectedUserEmail(data.email);
                    }
                })
                .catch(error => console.error(error));
        }catch (e){

        }
    }, [selectedUserID])

    function handleDeleteClick(id) {
        return function() {
            handleDelete(id);
        }
    }
    function handleChangeClick(id){
        return function() {
            handleChange(id);
        }
    }
    async function handleChange(key){
        setSelectedUserID(key);
        setChangeButtonClicked(true);
    }
    function handleDelete(key) {
        setDeleteButtonClicked(true);
        setSelectedUserID(key);
    }
    async function changeUser(){

    }
    async function deleteUser(){
        try {
            setIsLoading(true);
            await fetch('http://localhost:5000/admin/deleteUser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({selectedUserID}),
            })
                .then(response => response.json())
                .then(async data => {
                    if(data.isDeleted){
                        try {
                            const {data: response} = await axios.get('http://localhost:5000/admin/users');
                            setUsers(response);
                        } catch (error) {
                            console.error(error.message);
                        }
                        alert(data.message);
                    }
                    else{
                        alert(data.message);
                    }
                })
                .catch(error => console.error(error));
        }catch (e){

        }
        setIsLoading(false);
    }

    return (
        <div className="Users">
            <header>
                <div className="MainBar">
                    <h1 className="logo" onClick={()=>setMenuActive(!menuActive)}>CashR</h1>
                    <div className="userName">
                        <div className="projectIcon">
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <h1>{user.lastname} {user.firstname}</h1>
                    </div>
                </div>
            </header>
            <Menu active={menuActive} setActive={setMenuActive} action={true} header={"Главное меню"} items = {MenuItems}/>
            <ModalChange setUsers={setUsers} selectedUserID={selectedUserID} setIsLoading={setIsLoading} changeButtonClicked={changeButtonClicked} setChangeButtonClicked={setChangeButtonClicked} changeUser={changeUser} setSelectedUserFirstName={setSelectedUserFirstName} setSelectedUserLastName={setSelectedUserLastName} setSelectedUserEmail={setSelectedUserEmail} selectedUserFirstName={selectedUserFirstName} selectedUserLastName={selectedUserLastName} selectedUserEmail={selectedUserEmail}/>
            <ModalDelete deleteButtonClicked={deleteButtonClicked} setDeleteButtonClicked={setDeleteButtonClicked} deleteUser={deleteUser}/>
            <Backdrop open={isLoading}>
                <CircularProgress/>
            </Backdrop>

            <div className="verticalAligner">
                <h1>Список пользователей</h1>
                <div className="searchAligner">
                    <span className="material-symbols-outlined">search</span>
                    <input
                        style={{width: '450px'}}
                        type="text"
                        placeholder="Поиск пользователей"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="userAligner">
                <div>
                    {filteredUsers.map((user) => (
                        <div className="appUser" key={user._id}>
                            <h2>{user.firstname} {user.lastname}</h2>
                            <p>{user.email}</p>
                            <div id="userButtons">
                                <button onClick={handleChangeClick(user._id)} type="submit">Изменить</button>
                                <button onClick={handleDeleteClick(user._id)} type="submit">Удалить</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Users;