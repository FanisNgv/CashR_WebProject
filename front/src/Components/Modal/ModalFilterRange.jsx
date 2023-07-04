import React, {useEffect, useState} from 'react';
import './Modal.css'
import axios from "axios";
import MultiSelect from "../DropDown/DropDownMulti";
import MyDatePickerRange from "../DatePicker/DatePickerRange";
const ModalFilterRange = ({setModalFilterIsOpened, expensesSum, incomesSum, setIncomeSum, total, setTotal, setExpensesSum, modalFilterIsOpened, transactions, sortedTransactions, setSortedTransactions}) => {

    const [startDate, setStartDate] = useState(new Date("2023-01-01"));
    const [endDate, setEndDate] = useState(new Date("2040-01-01"));


    let values = sortedTransactions.map(transaction => transaction.valueOfTransaction);

    let expenses = values.filter(transaction => transaction < 0);
    let incomes = values.filter(transaction => transaction > 0);

    setExpensesSum(expenses.reduce((total, amount) => total + amount, 0));
    setIncomeSum(incomes.reduce((total, amount) => total + amount, 0));
    setTotal(expensesSum + incomesSum);

    function filterByDate(transactions, startDate, endDate) {
        return transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.dateOfTransaction);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    function handleFilterClick() {
        setSortedTransactions(filterByDate(transactions, startDate, endDate));

        setExpensesSum(expenses.reduce((total, amount) => total + amount, 0));
        setIncomeSum(incomes.reduce((total, amount) => total + amount, 0));
        setTotal(expensesSum + incomesSum);

        values = sortedTransactions.map(transaction => transaction.valueOfTransaction);

        expenses = values.filter(transaction => transaction < 0);
        incomes = values.filter(transaction => transaction > 0);
    }

    return (
        <div className={modalFilterIsOpened ? "modal active" : "modal"} onClick={function () { setModalFilterIsOpened(false)}}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h1>Введите диапазон дат:</h1>

                <div id="datePickerRange">
                    <MyDatePickerRange startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} className="hidden"/>
                </div>


                <div className="addButton">
                    <button onClick={handleFilterClick}>Отфильтровать</button>
                </div>
            </div>
        </div>
    );
};
export default ModalFilterRange;