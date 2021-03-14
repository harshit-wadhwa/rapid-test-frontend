import React from 'react';
import config from "./config";

class PerformTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }



    handleTestCodeChange = (event) => {
        this.setState({
            testCode: event.target.value
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleEnterTest}>
                    <div className="container out mt-sm-5 my-1">
                        <div className="question ml-sm-5 pl-sm-5 pt-2">
                            {/*<label>
                                            Your Name:
                                            <input type="text" value={this.state.studentName}
                                                   onChange={this.handleStudentNameChange}/>
                                        </label>
                                        <br/>*/}
                            <label>
                                Test Code:
                                <input type="text" value={this.state.testCode}
                                       onChange={this.handleTestCodeChange}/>
                            </label>
                            <br/>
                            <input className="btn btn-success" type="submit" value="Enter Test"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default PerformTest;