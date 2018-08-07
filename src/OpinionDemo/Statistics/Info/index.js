import React, {PureComponent} from 'react';

const DATA = [
    {
        name: "论坛",
        color: '#13DDC8',
        percent: '48%'
    },
    {
        name: "微博",
        color: '#FFCD1A',
        percent: '27%'
    },
    {
        name: "媒体",
        color: '#3B99FF',
        percent: '17%'

    },
    {
        name: "博客",
        color: '#BFA7FF',
        percent: '8%'
    },
];

export default class extends PureComponent {
    handleClick = (name) => () => {
        const {toggleItem} = this.props;
        typeof toggleItem === 'function' && toggleItem(name);
    }

    render() {
        const {toggleItem, activeKey} = this.props

        return (
            <ul className="statistics-number">
                {DATA.map((item) => {
                    const isActive = activeKey === item.name;

                    return <li
                        className="statistics-item"
                        key={item.name}
                        onClick={this.handleClick(item.name)}
                    >
                        <span style={{background: item.color}} className="statistics-number-dot"></span>
                        <span className="statistics-number-dot-circle" style={isActive ? {borderColor: item.color} : {}}></span>
                        <span className="statistics-number-name" style={isActive ? {'color': item.color} : {}}>{item.name} </span>
                        <span className="statistics-number-percentage" style={isActive ? {'color': item.color} : {}}>{item.percent}</span>
                    </li>
                })}
            </ul>
        )
    }
}
