import React, {PureComponent, Fragment} from 'react';
import Icon from '../Icon';
import './index.css';
import classnames from 'classnames';
import Coordinate from '../Coordinate';
import Description from '../Coordinate/description.js';
import TextEscapeHTML from './TextEscapeHTML';
import Distribution from './Distribution';

class Item extends PureComponent {
    handleClick = () => {
        const {data, openedName, activeItemFn} = this.props;
        // if( data.advantage && data.advantage.length === 0) return;
        if (openedName === data.name) {
            typeof activeItemFn === 'function' && activeItemFn('');
        } else {
            typeof activeItemFn === 'function' && activeItemFn(data.name);
        }
    }

    render() {
        const {data, openedName} = this.props;
        const isActive = data.name === openedName,
            canOpen = data.list && data.list.length > 0;

        return (
            <Fragment>
                <div className={classnames("employer-item", {
                    active: isActive,
                    hover: data.advantage && data.advantage.length > 0
                })}
                     onClick={this.handleClick}
                >
                    <div className="item-left">
                        {data.name}
                    </div>
                    <div className="item-right">
                        <div className="item-desc">
                            <div className="title">{data.title}</div>
                            <div className="slogan">{data.slogan}</div>
                        </div>
                        {canOpen ?
                            <Fragment>{isActive ? <Icon size={12} type="retract_up"/> :
                                <Icon type="spread"/>}</Fragment>
                            : null}
                    </div>
                </div>
                {isActive && canOpen ? <div className="detail">
                    <div className="list-advantage">{data.desc} {data.list.join('、')}</div>
                    {data.advantage.length > 0 && data.advantage.map((item) => <div className="advantage-list"
                                                                                    key={item.suggest}>
                        {item.condition ? <div className="advantage-content">
                            <span className="advantage-name">{item.condition}</span>
                            {item.content ? <span>：{item.content}</span> : null}
                        </div> : null}
                        <div className="suggest">分析建议：</div>
                        <div className="advantage-suggest"><TextEscapeHTML text={item.suggest}/></div>
                    </div>)}
                </div> : null}
            </Fragment>
        );
    }
}

export default class extends PureComponent {
    state = {
        openedName: 'B'
    }
    toggleZone = (name) => {
        this.setState({
            openedName: name
        });
    }

    render() {
        const {openedName} = this.state,
            {data, desData, descriptionData, sort_mentioned, sort_special} = this.props;

        return (
            <div className="employer-wrapper">
                <div className="employer-coordinate">
                    <Coordinate width={820} data={data} activeKey={openedName} onChange={this.toggleZone}/>
                    <Description descriptionData={descriptionData}/>
                </div>
                <div className="employer-sort">
                    <div className="employer-sort-left">
                        <h2>最多被提及的特征Top5</h2>
                        <Distribution data={sort_mentioned}/>
                    </div>
                    <div className="employer-sort-right">
                        <h2>企业独占的特征Top5</h2>
                        <Distribution data={sort_special}/>
                    </div>
                </div>
                <div className="employer-analyse">
                    {desData.map((item) => <Item
                        key={item.name}
                        openedName={openedName}
                        activeItemFn={this.toggleZone}
                        data={item}/>)}
                </div>
            </div>
        );
    }
}
