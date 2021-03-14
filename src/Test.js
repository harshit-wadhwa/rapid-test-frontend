import React from 'react';
import swal from "sweetalert2";
import config from "./config";
import TestHeader from "./TestHeader";

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 0,
            questions: this.props.test.questions,
            duration: this.props.test.duration,
            name: this.props.test.name,
            totalScore: this.props.test.totalScore,
            testCode: this.props.test.code
        };
    }

    /*componentWillReceiveProps(nextProps, nextContext) {
        this.setState({


        });
    }*/

    handleTestSubmit = (event = null, endTestPermission = true) => {
        if (event) event.preventDefault();

        /*const testSubmit = window.confirm('Are you sure you want to end the test?');
        if (!testSubmit) {
            return;
        }*/

        if (endTestPermission) {
            swal.fire({
                title: 'Are you sure you want to end the test?',
                // text: 'You will not be able to recover this imaginary file!',
                // icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.value) {
                    this.endTest();
                }
            });
        } else {
            swal.fire('Time Up!').then(() => {
                this.endTest();
            });
        }
    };

    handleAnswerChange = (i, event) => {
        let questions = [...this.state.questions];
        questions[i].studentAnswer = parseInt(event.target.value);
        this.setState({questions});
        console.log(this.state);
    };

    onClickNext = (e) => {
        e.preventDefault();
        let total = this.state.questions.length;
        // console.log(total, this.state.i);
        if (this.state.i < total - 1) {
            this.setState({i: this.state.i + 1});
        }
        // console.log(this.state.i);
    };

    onClickPrev = (e) => {
        e.preventDefault();
        // console.log(this.state.i);
        if (this.state.i > 0) {
            this.setState({i: this.state.i - 1});
        }
        // console.log(this.state.i);
    };

    onClickButton = (e, n) => {
        e.preventDefault();
        // console.log(this.state.i);
        this.setState({i: n});
        // console.log(this.state.i);
    };

    endTest = () => {
        console.log(this.state);

        const numberOfQuestions = this.state.questions.length;
        const totalScore = this.state.totalScore;

        let score = 0;
        for (let i = 0; i < numberOfQuestions; i++) {
            if (this.state.questions[i].answer === this.state.questions[i].studentAnswer) {
                score += parseInt(this.state.questions[i].marks);
            }
        }

        this.props.action({
            event: 'end-test'
        });

        const studentData = {
            user_id: this.props.user.id,
            name: this.props.user.name, //this.state.studentName,
            score,
            code: this.state.testCode
        };
        console.log(studentData);

        // alert('Your score is ' + score + '/' + numberOfQuestions);

        fetch(config.baseUrl + "/score", {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.token},
            body: JSON.stringify(studentData)
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
            }).catch(err => {
            console.log(err);
        });

        /*this.setState({
            startTest: false,//todo
            // name: '',
            // code: this.guid(),
            // duration: null,
            // studentName: '',
            testCode: '',
            questions: [],
            totalScore: 0,
            /!*previousScore: {
                score,
                total: studentData.total
            },*!/
            i: 0
        });*/

        //todo
        // this.fetchScores();

        swal.fire('You scored ' + score + '/' + totalScore + ' in your previous test!');
    };

    endTestHandler = (dataFromChild) => {
        if (dataFromChild === 'end-test') {
            this.handleTestSubmit();
        }
    };

    render() {
        return (
            <div>
                <header className="App-header">
                    <TestHeader user={this.props.user} action={this.endTestHandler} testName={this.state.name} duration={this.state.duration}/>
                </header>
                <br/>
                {/*<p className="questions-list"> List of Questions </p>*/}
                {this.state.questions.map((el, i) => (
                    <button key={i} className={this.state.i === i ? 'btn btn-secondary' : 'btn btn-light'} onClick={e => this.onClickButton(e, i)}>{i + 1}</button>
                ))}

                <form onSubmit={this.handleTestSubmit}>
                    {/*{this.state.questions.map((el, i) => (*/}
                    <div key={this.state.i}>
                        <div className="container mt-sm-5 my-1">
                            <div className="question ml-sm-5 pl-sm-5 pt-2">
                                <div className="py-2 h5">
                                    <b>Q {this.state.i + 1}: {this.state.questions[this.state.i].question} [{this.state.questions[this.state.i].marks} marks]</b>
                                </div>
                                <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                    <label className="options">{this.state.questions[this.state.i].op1}
                                        <input
                                            type="radio" name={this.state.i} id="op1" value="1"
                                            checked={this.state.questions[this.state.i].studentAnswer === 1}
                                            onChange={e => this.handleAnswerChange(this.state.i, e)}/> <span
                                            className="checkmark"></span> </label>
                                    <label className="options">{this.state.questions[this.state.i].op2}
                                        <input
                                            type="radio" name={this.state.i} id="op2" value="2"
                                            checked={this.state.questions[this.state.i].studentAnswer === 2}
                                            onChange={e => this.handleAnswerChange(this.state.i, e)}/> <span
                                            className="checkmark"></span> </label>
                                    <label className="options">{this.state.questions[this.state.i].op3}
                                        <input
                                            type="radio" name={this.state.i} id="op3" value="3"
                                            checked={this.state.questions[this.state.i].studentAnswer === 3}
                                            onChange={e => this.handleAnswerChange(this.state.i, e)}/> <span
                                            className="checkmark"></span></label>
                                    <label className="options">{this.state.questions[this.state.i].op4}
                                        <input
                                            type="radio" name={this.state.i} id="op4" value="4"
                                            checked={this.state.questions[this.state.i].studentAnswer === 4}
                                            onChange={e => this.handleAnswerChange(this.state.i, e)}/> <span
                                            className="checkmark"></span> </label>
                                </div>
                            </div>
                            <div className="d-flex align-items-center pt-3">
                                {this.state.i > 0 ?
                                    <div id="prev">
                                        <button className="btn btn-primary"
                                                onClick={this.onClickPrev}>Previous
                                        </button>
                                    </div>
                                    :
                                    <div>
                                    </div>
                                }
                                {this.state.i < this.state.questions.length - 1 ?
                                    <div className="ml-auto mr-sm-5">
                                        <button className="btn btn-success" onClick={this.onClickNext}>Next
                                        </button>
                                    </div>
                                    :
                                    <div className="ml-auto mr-sm-5">
                                        <input className="btn btn-success" type="submit"
                                               value="Submit Test"/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Test;