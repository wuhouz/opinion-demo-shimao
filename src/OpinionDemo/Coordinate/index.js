import React, {Fragment,Component} from 'react';
import range from 'lodash/range';

class Pointer extends Component {
    render() {
        const {x, y, r, type, name, index} = this.props, fontSize = Math.min(r / 1.2, 35);

        return (
            <g transform={`translate(${x} ${y})`}>
                <circle cx={0} cy={0} r={r * 2} stroke="none" fill={type} style={{opacity: 0}} stroke='#fff' strokeWidth={1} strokeOpacity={0.5}>
                    <animateTransform attributeName="transform" begin={`${Math.ceil(index/10) * 200}ms`} dur="0.5s" type="scale"
                                      from="0" to="1"/>
                    <animate attributeName="opacity" from="0" to="0.8" begin={`${Math.ceil(index/10) * 200}ms`} dur="0.5s"
                             fill="freeze"/>
                </circle>
                {r >= 8 && name.length * fontSize < r * 4 - 10 ? <text x={0} y={0} fill="#fff" style={{
                    fillOpacity: 0,
                    textAnchor: 'middle',
                    dominantBaseline: 'middle',
                    fontSize: `${fontSize}px`
                }}>{name}
                    <animate attributeName="fill-opacity" from="0" to="1" begin={`${Math.ceil(index/10) * 200 + 500}ms`} dur="0.3s"
                             fill="freeze"/>
                </text> : null}
            </g>
        );
    }
}

const PointerWithHover=((WrappedComponent)=>class extends Component{
    handlerMouseEnter=(e)=>{
        const {x,y,r,name,onShow}=this.props;
        if(!name) return;
        if(r >= 8 && name.length * Math.min(r / 1.2, 35) < r * 4 - 8) return;
        onShow&&onShow({x,y,r,name});
    };
    handlerMouseLeave=()=>{
        const {onHide}=this.props;
        onHide&&onHide();
    };
    render(){
        const {x,y}=this.props;
        return <g transform={`translate(${x} ${y})`} onMouseEnter={this.handlerMouseEnter} onMouseLeave={this.handlerMouseLeave}><WrappedComponent {...this.props} x={0} y={0}/></g>;
    };
})(Pointer);

export default class  extends Component {
    static defaultProps = {
        width: 522,
        height: 522
    };
    state={
        tipShow:false,
        tipInfo:{}
    };
    handlerClick = (e) => {
        const {top, left} = this.el.getBoundingClientRect(), x = e.clientX - left,
            y = e.clientY - top, {width, height, onChange} = this.props;
        let active;
        if (x < width / 2 && y < height / 2) {
            active = 'C';
        } else if (x < width / 2 && y >= height / 2) {
            active = 'D';
        } else if (x >= width / 2 && y > height / 2) {
            active = 'A';
        } else if (x > width / 2 && y <= height / 2) {
            active = 'B';
        }
        onChange && onChange(active);
    };
    handlerTipShow=({x,y,r,name})=>{
        this.setState({
            tipShow:true,
            tipInfo:{x,y:y-r,name}
        });
    };
    handlerTipHide=()=>{
        this.setState({
            tipShow:false
        });
    };
    render() {
        const {width, height, data, activeKey} = this.props,{tipInfo,tipShow}=this.state;
        return (
            <div className="chart">
                {tipShow?<div className="tips" style={{
                    top:`${tipInfo.y}px`,
                    left:`${tipInfo.x}px`
                }}>{tipInfo.name}</div>:null}
                <svg ref={(el) => this.el = el} width={`${width}px`} height={`${height}px`}
                     viewBox={`0 0 ${width} ${height}`} onClick={this.handlerClick}>
                    <g>
                        {activeKey === "A" ?
                            <rect x={width / 2} y={height / 2} width={width / 2} height={height / 2}
                                  fill="#F4FCFF"/> : null}
                        {activeKey === "B" ?
                            <rect x={width / 2} y={0} width={width / 2} height={height / 2} fill="#F4FCFF"/> : null}
                        {activeKey === "C" ?
                            <rect x={0} y={0} width={width / 2} height={height / 2} fill="#F4FCFF"/> : null}
                        {activeKey === "D" ?
                            <rect x={0} y={height / 2} width={width / 2} height={height / 2} fill="#F4FCFF"/> : null}
                        <g>
                            <g transform={`translate(${width - 22} ${height - 22})`}>
                                <rect rx="2" x={0} y={0} width={22} height={22}
                                      fill={activeKey === "A" ? "#3B99FF" : "#eee"}/>
                                <text x={6} y={16} style={{
                                    fontSize: '14px',
                                    fill: activeKey === "A" ? "#FFF" : '#333'
                                }}>A
                                </text>
                            </g>
                            <g transform={`translate(${width - 22} ${0})`}>
                                <rect rx="2" x={0} y={0} width={22} height={22}
                                      fill={activeKey === "B" ? "#3B99FF" : "#eee"}/>
                                <text x={6} y={16} style={{
                                    fontSize: '14px',
                                    fill: activeKey === "B" ? "#FFF" : '#333'
                                }}>B
                                </text>
                            </g>
                            <g transform={`translate(${3} ${0})`}>
                                <rect rx="2" x={0} y={0} width={22} height={22}
                                      fill={activeKey === "C" ? "#3B99FF" : "#eee"}/>
                                <text x={6} y={16} style={{
                                    fontSize: '14px',
                                    fill: activeKey === "C" ? "#FFF" : '#333'
                                }}>C
                                </text>
                            </g>
                            <g transform={`translate(${3} ${height - 24})`}>
                                <rect rx="2" x={0} y={0} width={22} height={22}
                                      fill={activeKey === "D" ? "#3B99FF" : "#eee"}/>
                                <text x={6} y={16} style={{
                                    fontSize: '14px',
                                    fill: activeKey === "D" ? "#FFF" : '#333'
                                }}>D
                                </text>
                            </g>
                        </g>
                        <g transform={`translate(${0} ${height / 2})`}>
                            <line x2={width} y2={0} style={{
                                stroke: '#DFDFDF'
                            }}/>
                            {range(0, 13).map((value, index) => <line key={index} x1={value * width / 12}
                                                                      x2={value * width / 12} y1={0} y2={-5}
                                                                      stroke="#DFDFDF" strokeWidth={2}/>)}
                        </g>
                        <g transform={`translate(${width / 2} ${0})`}>
                            <line x2={0} y2={height} style={{
                                stroke: '#DFDFDF'
                            }}/>
                            {range(0, 13).map((value, index) => <line key={index} y1={value * width / 12}
                                                                      y2={value * width / 12} x1={0} x2={5}
                                                                      stroke="#DFDFDF" strokeWidth={2}/>)}
                        </g>
                        <g>
                            <text x={width / 2 - 38} y={18} style={{
                                fontSize: '14px',
                                fill: '#999999'
                            }}>个性
                            </text>
                            <text x={width / 2 - 38} y={height - 8} style={{
                                fontSize: '14px',
                                fill: '#999999'
                            }}>普遍
                            </text>
                            <text x={8} y={height / 2 + 22} style={{
                                fontSize: '14px',
                                fill: '#999999'
                            }}>消极
                            </text>
                            <text x={width - 32} y={height / 2 + 22} style={{
                                fontSize: '14px',
                                fill: '#999999'
                            }}>积极
                            </text>
                        </g>
                        {data.map(({x, y, r, type, name}, index) => <PointerWithHover onShow={this.handlerTipShow} onHide={this.handlerTipHide} key={index} index={index}
                                                                             x={width / 2 + x * width / 200}
                                                                             y={height / 2 - y * height / 200} r={r}
                                                                             name={name} type={type}/>)}
                    </g>
                </svg>
            </div>
        );
    }
}
