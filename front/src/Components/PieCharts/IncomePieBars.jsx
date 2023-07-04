import React, { useEffect, useState } from "react";
import {VictoryBar, VictoryPie} from "victory";
import { CSSTransition } from "react-transition-group";
import "../MainPage/MainPage.css";

const IncomePieBar = ({ sortedTransactions }) => {
    const types = {};

    if (
        sortedTransactions &&
        sortedTransactions.length > 0 &&
        sortedTransactions !== undefined
    ) {
        sortedTransactions.forEach((transaction) => {
            if (transaction.valueOfTransaction > 0) {
                if (types[transaction.typeOfTransaction]) {
                    types[transaction.typeOfTransaction] += transaction.valueOfTransaction;
                } else {
                    types[transaction.typeOfTransaction] = transaction.valueOfTransaction;
                }
            }
        });

        const data = Object.keys(types).map((type, index) => ({
            x: type,
            y: types[type],
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
                <h1>Столбцы доходов:</h1>
                {data.length > 0 ? (
                    <CSSTransition
                        in={showChart}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <VictoryBar
                            data={data}
                            labelRadius={100}
                            style={{
                                labels: { fontSize: 20, fill: "white" },
                                data: {
                                    fill: ({ datum }) => {
                                        const greenValue = Math.floor(
                                            (datum.y / Math.max(...data.map((d) => d.y))) * 255
                                        );
                                        return `rgb(0, ${greenValue}, 0)`;
                                    },
                                },
                            }}
                            animate={{ duration: 1000 }}
                        />
                    </CSSTransition>
                ) : null}
            </div>
        );
    } else {
        return null;
    }
};

export default IncomePieBar;