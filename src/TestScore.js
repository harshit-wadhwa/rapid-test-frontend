import React from 'react';

class TestScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <table className="container table-container mt-sm-5 my-1">
                    <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Test Code</th>
                        <th>Score</th>
                        <th>Submission Date</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.scores.map((el, i) => (
                        <tr key={i}>
                            <td>{el.test_name}</td>
                            <td>{el.code}</td>
                            <td>{el.score + '/' + el.test_total}</td>
                            <td>{new Date(el.submitted_at).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TestScore;