import React from 'react';
import Clock from "./Clock";

class TestHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clockHandler = (dataFromChild) => {
        // console.log(dataFromChild);
        if (dataFromChild === 'time-up') {
            this.handleTestSubmit(null, false);
        }
    };

    handleTestSubmit = () => {
        this.props.action('end-test');
    };

    render() {
        // handleTestSubmit : send an event
        return (
            <div>
                <Clock duration={this.props.duration} action={this.clockHandler}/>
                Hello {this.props.user.name}, you are giving {this.props.testName} test.
                <button className="btn btn-danger float-right" onClick={this.handleTestSubmit}>End Test</button>
            </div>
        );
    }
}

export default TestHeader;