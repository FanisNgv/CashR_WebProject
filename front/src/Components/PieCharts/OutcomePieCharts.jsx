import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";
import { CSSTransition } from "react-transition-group";
import "../MainPage/MainPage.css";

const OutcomePieChart = ({ sortedTransactions }) => {
    const types = {};

    sortedTransactions.forEach((transaction) => {
        if (transaction.valueOfTransaction < 0) {
            if (types[transaction.typeOfTransaction]) {
                types[transaction.typeOfTransaction] += transaction.valueOfTransaction;
            } else {
                types[transaction.typeOfTransaction] = transaction.valueOfTransaction;
            }
        }
    });

    const data = Object.keys(types).map((type, index) => ({
        x: type,
        y: -types[type],
        label: `${type}`,
    }));

    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChart(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <h1>Диаграмма доходов:</h1>
            <CSSTransition
                in={showChart}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <VictoryPie
                    data={data}
                    labelRadius={120}
                    style={{
                        labels: { fontSize: 20, fill: 'white' },
                        data: {
                            fill: ({ datum }) => {
                                const redValue = Math.floor((datum.y / Math.max(...data.map(d => d.y))) * 255 + 10);
                                return `rgb(${redValue}, 0 , 0)`;
                            }
                        }
                    }}
                    animate={{ duration: 1000 }}
                />
            </CSSTransition>
        </div>
    );
};

export default OutcomePieChart;
