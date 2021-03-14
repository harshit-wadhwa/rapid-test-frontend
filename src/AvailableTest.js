import React from 'react';
import config from "./config";

class AvailableTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    /*fillCode = (code) => {
        this.setState({
            testCode: code
        });
    };*/

    handleEnterTest = (event, testCode) => {
        console.log(this.state);
        event.preventDefault();
        const credentials = {
            student: this.props.user.name,
            code: testCode
        };
        fetch(config.baseUrl + "/test/enter", {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.token},
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                if (response && response.questions.length > 0) {
                    /*this.setState({
                        questions: response.questions,
                        duration: response.duration,
                        name: response.name,
                        totalScore: response.totalScore,
                        // answers: [],
                        startTest: true
                    });*/

                    this.props.action({
                        event: 'start-test',
                        questions: response.questions,
                        duration: response.duration,
                        name: response.name,
                        totalScore: response.totalMarks,
                        code: testCode
                    });
                    console.log(this.state);
                }
            }).catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <div>
                <table className="container table-container mt-sm-5 my-1">
                    <thead>
                    <tr>
                        <th>Available Test Name</th>
                        <th>Test Code</th>
                        <th>Test Duration</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.tests.map((el, i) => (
                        <tr key={i}>
                            <td>{el.name}</td>
                            <td>{el.code}</td>
                            <td>{el.duration} mins</td>
                            <td>
                                <center>
                                    <button className="btn btn-primary"
                                            onClick={e => this.handleEnterTest(e, el.code)}>Give Test
                                    </button>
                                </center>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AvailableTest;