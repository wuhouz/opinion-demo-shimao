import React, {PureComponent} from 'react';
import Circle from './Circle';
import Info from './Info';

export default class extends PureComponent {
    state = {
        activeKey: '论坛'
    }
    toggleItem = (name) => {
        this.setState({
            activeKey: name
        });
    }

    render() {
        const {activeKey} = this.state;

        return (
            <div className="statistics-classify">
                <Circle
                    activeKey={activeKey}
                    toggleItem={this.toggleItem}
                />
                <Info
                    activeKey={activeKey}
                    toggleItem={this.toggleItem}
                />
            </div>
        )
    }
}
