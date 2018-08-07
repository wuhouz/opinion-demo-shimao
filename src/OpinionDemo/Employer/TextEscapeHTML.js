import React, {PureComponent} from 'react'

export default class extends PureComponent {
    static defaultProps={
        text:''
    };
    render() {
        const {text}=this.props;
        let newText=text.replace(/</g,'&lt;');
        newText=newText.replace(/>/g,'&gt;');
        newText=newText.replace(/[\n\r]/g,'<br/>');
        newText=newText.replace(/\s/g,'&nbsp;');
        return (
            <span dangerouslySetInnerHTML={{__html:newText}}/>
        );
    }
}