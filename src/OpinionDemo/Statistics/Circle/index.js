import React, {PureComponent, Fragment} from 'react';

const radius = 56;
const perimeter = 2 * Math.PI * radius;

const getTransform = function (rotate) {
    var cosVal = Math.cos(rotate * Math.PI / 180), sinVal = Math.sin(rotate * Math.PI / 180);
    var valTransform = 'matrix(' + cosVal.toFixed(6) + ',' + sinVal.toFixed(6) + ',' + (-1 * sinVal).toFixed(6) + ',' + cosVal.toFixed(6) + ',0,0)'
    return valTransform;
}
const step = 360 / 100;
const arcs = [
    {
        name: "论坛",
        percent: 0.58,
        color: '#13DDC8',
        angle: 0
    },
    {
        name: "媒体",
        percent: 0.13,
        color: '#3B99FF',
        angle: -360 * 0.18 - 360 * 0.11 - 360 * 0.13
    },
    {
        name: "博客",
        percent: 0.11,
        color: '#BFA7FF',
        angle: -360 * 0.18 - 360 * 0.11
    },
    {
        name: "微博",
        percent: 0.18,
        color: '#FFCD1A',
        angle: -360 * 0.18
    },
];
export default class extends PureComponent {
    handleClick = (name) => () => {
        const {toggleItem, activeKey} = this.props;
        typeof toggleItem === 'function' && toggleItem(name);
    }

    render() {
        const {activeKey} = this.props;
        const width = 150;
        return (
            <svg width={150} height={150}>
                <g transform="translate(0 150)">
                    <circle
                        onClick={this.handleClick(arcs[0].name)}
                        cx="75"
                        cy="75"
                        r={radius}
                        strokeWidth={arcs[0].name === activeKey ? 16 : 10}
                        transform={`rotate(${270 + arcs[0].angle})`}
                        stroke={arcs[0].color}
                        fill="none"
                        strokeDasharray={`${perimeter * arcs[0].percent} ${perimeter * (1 - arcs[0].percent)}`}
                        style={{transition: 'all .4s'}}
                    ></circle>
                </g>
                <g transform="translate(177 45)">
                    <circle
                        onClick={this.handleClick(arcs[1].name)}
                        cx="75"
                        cy="75"
                        r={radius}
                        strokeWidth={arcs[1].name === activeKey ? 16 : 10}
                        transform={`rotate(${270 + arcs[1].angle})`}
                        stroke={arcs[1].color}
                        fill="none"
                        strokeDasharray={`${perimeter * arcs[1].percent} ${perimeter * (1 - arcs[1].percent)}`}
                        style={{transition: 'all .4s'}}
                    ></circle>
                </g>
                <g transform="translate(167 129)">
                    <circle
                        onClick={this.handleClick(arcs[2].name)}
                        cx="75"
                        cy="75"
                        r={radius}
                        strokeWidth={arcs[2].name === activeKey ? 16 : 10}
                        transform={`rotate(${270 + arcs[2].angle})`}
                        stroke={arcs[2].color}
                        fill="none"
                        strokeDasharray={`${perimeter * arcs[2].percent} ${perimeter * (1 - arcs[2].percent)}`}
                        style={{transition: 'all .4s'}}
                    ></circle>
                </g>
                <g transform="translate(112 175)">
                    <circle
                        onClick={this.handleClick(arcs[3].name)}
                        cx="75"
                        cy="75"
                        r={radius}
                        strokeWidth={arcs[3].name === activeKey ? 16 : 10}
                        transform={`rotate(${270 + arcs[3].angle})`}
                        stroke={arcs[3].color}
                        fill="none"
                        strokeDasharray={`${perimeter * arcs[3].percent} ${perimeter * (1 - arcs[3].percent)}`}
                        style={{transition: 'all .4s'}}
                    ></circle>
                </g>
                <text x="46" y="82" fontSize="14px" fill="#FFFFFF">数据来源</text>
            </svg>
        );
    }
}
