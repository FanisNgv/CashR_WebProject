import React from 'react';
import './Menu.css';
const Menu = ({header, items, active, setActive, action}) => {
    return (
        <div className={active?'menu active':'menu'} onClick={()=>setActive(false)}>
            <div className="blur"/>
            <div className="menu__content" onClick={e=>e.stopPropagation()}>
                <div className="menu__header">{header}</div>
                <ul>
                    {items.map(item=>
                        <li>
                            <p onClick={item.action}>{item.value}</p>
                            {item.icon==="coin"&& <span className="material-symbols-outlined">payments</span>}
                            {item.icon==="logout"&&<span className="material-symbols-outlined">logout</span>}
                            {item.icon==="trans"&&<span className="material-symbols-outlined">currency_exchange</span>}
                            {item.icon==="analyse"&&<span className="material-symbols-outlined">leaderboard</span>}

                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Menu;