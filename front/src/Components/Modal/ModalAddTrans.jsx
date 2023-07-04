import React, {useEffect, useState} from 'react';
import './Modal.css'
import axios from "axios";
import SingleSelect from "../DropDown/DropDownSingle";
import MyDatePicker from "../DatePicker/DatePicker";

const ModalAddTrans = ({setAddTransactionIsOpened, setUser, setTransactions, setIsLoading, user, setCome, come, addTransactionIsOpened, typesOfIncomes, typesOfOutcomes}) => {

    const[typesOfComes, setTypesOfComes] = useState([]);
    const[selectedType, setSelectedType] = useState("");
    const[sumOfTrans, setSumOfTrans] = useState();
    const [startDate, setStartDate] = useState(new Date());


    useEffect(()=>{
        if(come==="Income"){
            setTypesOfComes(typesOfIncomes);
        }
        else if(come ==="Outcome"){
            setTypesOfComes(typesOfOutcomes);
        }
    }, [come])

    async function handleCreateTransClick(){
        if(!come){
            alert("Выберите, это доход или расход!");
            return;
        }
        else if(come==="Income"&&selectedType===""){
            alert("Выберите тип дохода!")
            return;
        }
        else if(come==="Outcome"&&selectedType===""){
            alert("Выберите тип расхода!")
            return;
        }
        else if(!sumOfTrans){
            alert("Введите сумму транзакции!")
            return;
        }

        let transaction;
        if (come === "Outcome") {
            transaction = {
                userID: user._id,
                come: come,
                valueOfTransaction: -sumOfTrans,
                typeOfTransaction: selectedType,
                dateOfTransaction: startDate
            };
        } else if (come === "Income") {
            transaction = {
                userID: user._id,
                come: come,
                valueOfTransaction: sumOfTrans,
                typeOfTransaction: selectedType,
                dateOfTransaction: startDate
            };
        }

        setIsLoading(true);
        await fetch('http://localhost:5000/user/createTransaction', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(transaction)
        })
            .then(response => response.json())
            .then(data => {
                if (data){
                    alert(data.message);
                }
            })
            .catch(error => console.error(error));

        try{
            const transactionsResponse = await fetch('http://localhost:5000/user/getTransactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID: user._id }),
            });

            const transactionsData = await transactionsResponse.json();
            setTransactions(transactionsData);

        }
        catch(error){
            console.error(error.message);
        }
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in localStorage');
            return;
        }

        const { data: response } = await axios.get('http://localhost:5000/auth/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        await setUser({
            ...user,
            balance: response.balance,
        });

        setStartDate(new Date())
        setIsLoading(false);
    }

    return (
        <div className={addTransactionIsOpened ? "modal active" : "modal"} onClick={function () { setAddTransactionIsOpened(false)}}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>

                <h1>Выберите тип транзакции:</h1>
                <div className="come">
                    <div className="Income">
                        <input
                            type="radio"
                            name="come"
                            id="Income"
                            value="Income"
                            onChange={(e) => setCome(e.target.value)}
                        />
                        <label htmlFor="Income">Доход</label>
                    </div>
                    <div className="Outcome">
                        <input
                            type="radio"
                            name="come"
                            id="Outcome"
                            value="Outcome"
                            onChange={(e) => setCome(e.target.value)}
                        />
                        <label htmlFor="Outcome">Расход</label>
                    </div>
                </div>
                <br/>
                <h1>Выберите тип транзакции:</h1>
                <SingleSelect typesOfComes={typesOfComes} setSelectedType={setSelectedType} selectedType={selectedType}/>
                <br/>

                <h1>Введите сумму транзакции:</h1>
                <div className="amountOfTrans">
                    <input type="number" placeholder={"Введите сумму"} onChange={(e) => setSumOfTrans(e.target.value)} required />
                </div>

                <h1>Введите дату транзакции:</h1>
                <div className="dateOfTrans">
                    <MyDatePicker wrapperClassName="datePicker" startDate={startDate} setStartDate={setStartDate}/>
                </div>
                <div className="addButton">
                    <button onClick={handleCreateTransClick}>Создать</button>
                </div>
            </div>
        </div>
    );
};
export default ModalAddTrans;