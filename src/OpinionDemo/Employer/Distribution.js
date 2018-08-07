import React, {PureComponent} from 'react';
import Icon from '../Icon';
import {Tooltip} from 'antd';

let max = 108 * 16;

class Distribution extends PureComponent {
    render() {
        let props = this.props
        return (
            <div className="distribution">
                {props.data.map(function(item){
                     return   <div key={item.name} style={{fontWeight: '700'}}>
                            <div className="source-name">
                                <span style={{fontWeight: 700}}>{item.name}</span>
                                <Tooltip placement="top" overlayClassName="sort-tooltip" title={item.desc}>
                                    <Icon type='VK-message' size={14} />
                                </Tooltip>
                            </div>
                            <div className="number">{item.num}人</div>
                            <div className="wholeBar">
                                <div className="occupy" style={{width: item.num / max * 219}}/>
                            </div>
                        </div>
                })}
            </div>
        )
    }
}

export default Distribution
