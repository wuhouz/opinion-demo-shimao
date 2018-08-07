import React from 'react';

export default ({descriptionData}) => {
    return (
        <div className="coordinate-description">
            <div className="description-top">
                <span className="x">x</span>
                <span className="content"> 消极-积极</span>
                <span className="y">y</span>
                <span className="content"> 个性-普遍</span>
                <span className="bubble"></span>
                <span className="content"> 气泡大小-声音大小</span>
            </div>
            <ul className="description-bottom">
                {descriptionData.map((item) => <li className="description-item" key={item.name}>
                    <span className="dot" style={{backgroundColor: item.color}}></span>
                    <span className="name">{item.name}</span>
                    <span className="percent">{item.percent}</span>
                </li>)}
            </ul>
        </div>
    );
}
