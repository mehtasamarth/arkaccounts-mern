import React from 'react';
import { Input, FormFeedback } from 'reactstrap';

const arkInput = (props) => {

    let ruleObject = props.ruleObject;

    let normalInput = <Input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder} />;

    if (ruleObject && ruleObject.isTouched && ruleObject.isValid) {
        normalInput = <Input valid
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder} />
    }
    if (ruleObject && ruleObject.isTouched && !ruleObject.isValid) {
        normalInput = (
            <>
                <Input invalid
                    type={props.type}
                    id={props.id}
                    value={props.value}
                    onChange={props.onChange} 
                    placeholder = {props.placeholder}/>
                <FormFeedback>{ruleObject.errorMessage}</FormFeedback>
            </>
        )
    }
    return normalInput;
}

export default arkInput;
