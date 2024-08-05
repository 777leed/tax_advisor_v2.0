import React from "react";

import './Menu.css';


const Menu = (props) => {
    const options = [
        {
            text: "What forms are needed for IRS Form 990?",
            handler: props.actionProvider.handleForm990,
            id: 1,
        },
        {
            text: "Make a CSV file for IRS Form 990",
            handler: () => {},
            id: 2,
        },
        {
            text: "How do I report revenue from fundraising events?",
            handler: () => {},
            id: 3,
        },
        {
            text: "Can you explain what is needed for IRS Form 990 Part I",
            handler: () => {},
            id: 4,
        },
    ];

    const buttonsMarkup = options.map((option) => (
        <button
            key={option.id}
            onClick={option.handler}
            className="option-button"
        >
            {option.text}
        </button>
    ));

    return <div className="options-container">{buttonsMarkup}</div>;

};

export default Menu;