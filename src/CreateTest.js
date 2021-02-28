import './CreateTest.css';

import decodeJwt from 'jwt-decode';
import swal from 'sweetalert2';

/*import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useState} from 'react';

import Clock from "./Clock";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Tabs from "./Tabs";
import config from "./config";


/*const showModal = ({ children }) => {
    const [show, toggleShow] = useState(true);

    return (
        <>
            {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">React-Bootstrap</strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </>
    );
};*/

/*
function showModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
*/

class CreateTest extends React.Component {
    constructor(props) {
        super(props);
        let token = localStorage.getItem('token');

        this.state = {
            name: '',
            code: this.guid(),
            duration: '',
            questions: [],
            totalMarks: 0,
            startTest: false,
            i: 0,
            token,
            user: token ? decodeJwt(token) : null,
            scores: [],
            tests: []
        };
        console.log(this.state);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleStudentNameChange = this.handleStudentNameChange.bind(this);
        this.handleTestCodeChange = this.handleTestCodeChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnterTest = this.handleEnterTest.bind(this);
        this.handleTestSubmit = this.handleTestSubmit.bind(this);
        this.endTest = this.endTest.bind(this);
        this.clockHandler = this.clockHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
        this.fetchScores = this.fetchScores.bind(this);
        this.fetchTests = this.fetchTests.bind(this);
        this.fillCode = this.fillCode.bind(this);

        /*this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);*/

        /*const [show, setShow] = useState(false);
        this.show = show;
        this.setShow = setShow;*/
    }

    /*handleClose() {
        this.setShow(false);
    }

    handleShow() {
        this.setShow(true);
    }*/

    componentDidMount() {
        this.fetchTests();
        this.fetchScores();
    }

    fetchScores() {
        if (this.state.user && this.state.user.id) {
            fetch(config.baseUrl + "/score/" + this.state.user.id, {
                method: "GET",
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.token}
            })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    if (response) {
                        this.setState({
                            scores: response
                        });
                        console.log(this.state);
                    }
                }).catch(err => {
                console.log(err);
            });
        }
    }

    fetchTests() {
        fetch(config.baseUrl + "/test", {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.token}
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                if (response) {
                    this.setState({
                        tests: response
                    });
                    console.log(this.state);
                }
            }).catch(err => {
            console.log(err);
        });
    }

    handleChange(i, name, event) {
        let questions = [...this.state.questions];
        questions[i][name] = event.target.value;
        this.setState({questions});
        if (name === 'marks') {
            let totalMarks = 0;
            for (let i = 0; i < questions.length; i++) {
                totalMarks += parseInt(questions[i].marks);
            }
            this.setState({totalMarks});
            // this.setState({totalMarks: this.state.totalMarks + parseInt(questions[i].marks)})
        }
    }

    handleAnswerChange(i, event) {
        let questions = [...this.state.questions];
        questions[i].studentAnswer = parseInt(event.target.value);
        this.setState({questions});
        console.log(this.state);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleDurationChange(event) {
        this.setState({
            duration: event.target.value
        });
    }

    handleStudentNameChange(event) {
        this.setState({
            studentName: event.target.value
        });
    }

    handleTestCodeChange(event) {
        this.setState({
            testCode: event.target.value
        });
    }

    addClick() {
        this.setState(prevState => ({
            questions: [...prevState.questions, {
                question: '',
                op1: '',
                op2: '',
                op3: '',
                op4: '',
                answer: '',
                marks: 1
            }],
            totalMarks: this.state.totalMarks + 1
        }));
    }

    removeClick(i) {
        let questions = [...this.state.questions];
        this.setState({
            totalMarks: this.state.totalMarks - parseInt(this.state.questions[i].marks)
        });
        questions.splice(i, 1);
        this.setState({questions});
    }

    handleEnterTest(event) {
        console.log(this.state);
        event.preventDefault();
        const credentials = {
            student: this.state.user.name,
            code: this.state.testCode
        };
        fetch(config.baseUrl + "/test/enter", {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.token},
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                if (response && response.questions.length > 0) {
                    this.setState({
                        questions: response.questions,
                        duration: response.duration,
                        name: response.name,
                        totalScore: response.totalScore,
                        // answers: [],
                        startTest: true
                    });
                    console.log(this.state);
                }
            }).catch(err => {
            console.log(err);
        });
    }

    handleTestSubmit(event = null, endTestPermission = true) {
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
    }

    endTest() {
        console.log(this.state);

        const numberOfQuestions = this.state.questions.length;
        const totalScore = this.state.totalScore;

        let score = 0;
        for (let i = 0; i < numberOfQuestions; i++) {
            if (this.state.questions[i].answer === this.state.questions[i].studentAnswer) {
                score = score + parseInt(this.state.questions[i].marks);
            }
        }

        const studentData = {
            user_id: this.state.user.id,
            name: this.state.studentName,
            score,
            code: this.state.testCode
        };
        console.log(studentData);

        // alert('Your score is ' + score + '/' + numberOfQuestions);

        fetch(config.baseUrl + "/score", {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.token},
            body: JSON.stringify(studentData)
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
            }).catch(err => {
            console.log(err);
        });

        this.setState({
            startTest: false,
            name: '',
            code: this.guid(),
            duration: null,
            studentName: '',
            testCode: '',
            questions: [],
            totalScore: 0,
            /*previousScore: {
                score,
                total: studentData.total
            },*/
            i: 0
        });

        this.fetchScores();

        swal.fire('You scored ' + score + '/' + totalScore + ' in your previous test!');
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.name + ' with code: ' + this.state.code);
        console.log(this.state.questions);
        event.preventDefault();
        const test = {
            user_id: this.state.user.id,
            name: this.state.name,
            code: this.state.code,
            duration: this.state.duration,
            questions: this.state.questions,
            totalMarks: this.state.totalMarks
        };
        fetch(config.baseUrl + "/test", {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.token},
            body: JSON.stringify(test)
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                this.setState({name: '', duration: '', questions: []});
            }).catch(err => {
            console.log(err);
        });
    }

    clockHandler(dataFromChild) {
        // console.log(dataFromChild);
        if (dataFromChild === 'time-up') {
            this.handleTestSubmit(null, false);
        }
    }

    loginHandler(dataFromChild) {
        // console.log(dataFromChild);
        if (dataFromChild && dataFromChild.token && dataFromChild.user) {
            this.setState({token: dataFromChild.token, user: dataFromChild.user});
        }
    }

    onClickNext(e) {
        e.preventDefault();
        let total = this.state.questions.length;
        // console.log(total, this.state.i);
        if (this.state.i < total - 1) {
            this.setState({i: this.state.i + 1});
        }
        // console.log(this.state.i);
    }

    onClickPrev(e) {
        e.preventDefault();
        // console.log(this.state.i);
        if (this.state.i > 0) {
            this.setState({i: this.state.i - 1});
        }
        // console.log(this.state.i);
    }

    onClickButton(e, n) {
        e.preventDefault();
        // console.log(this.state.i);
        this.setState({i: n});
        // console.log(this.state.i);
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    guid() {
        //return id of format 'aaaaaaaa'
        return this.s4() + this.s4();
    }

    fillCode(code) {
        this.setState({
            testCode: code
        });
    }

    logout() {
        this.setState({
            token: null,
            user: null
        });
        localStorage.removeItem('token');
    }

    render() {
        return (
            this.state.user && this.state.user.id ?
                (this.state.startTest ?
                        <div>
                            <header className="App-header">
                                <Clock duration={this.state.duration} action={this.clockHandler}/>
                                Hello {this.state.user.name}, you are giving {this.state.name} test.
                                <button className="btn btn-danger float-right" onClick={this.handleTestSubmit}>End Test</button>
                            </header>
                            <br/>
                            {/*<p className="questions-list"> List of Questions </p>*/}
                            {this.state.questions.map((el, i) => (
                                <button className={this.state.i === i ? 'btn btn-secondary' : 'btn btn-light'} onClick={e => this.onClickButton(e, i)}>{i + 1}</button>
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

                                {/*<Button variant="primary" onClick={this.handleShow}>
                                    Launch demo modal
                                </Button>

                                <Modal show={this.show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modal heading</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={this.handleClose}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>*/}

                                {/*))}*/}

                            </form>

                        </div>

                        :

                        <div>

                            <input
                                className="btn btn-danger float-right"
                                type="button"
                                value="Logout"
                                onClick={() => this.logout()}
                            />

                            <Tabs>
                                <div className="tablink" label="Create Test">
                                    {/*<showModal>
                                    </showModal>*/}
                                    {/*<Button variant="primary" onClick={this.handleShow}>
                                        Launch demo modal
                                    </Button>

                                    <Modal show={this.show} onHide={this.handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Modal heading</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={this.handleClose}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>*/}
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="container out mt-sm-5 my-1">
                                            <div className="question ml-sm-5 pl-sm-5 pt-2">
                                                <label>
                                                    Name:
                                                    <input type="text" value={this.state.name}
                                                           onChange={this.handleNameChange}/>
                                                </label>
                                                <br/>
                                                <label>
                                                    Duration (in minutes):
                                                    <input type="number" min="0" max="300" value={this.state.duration}
                                                           onChange={this.handleDurationChange}/>
                                                </label>
                                                <br/>
                                                <label>
                                                    Test Code: {this.state.code}
                                                </label>
                                                <br/>
                                                <label>
                                                    Total Marks: {this.state.totalMarks}
                                                </label>
                                                <br/>

                                                {this.state.questions.map((el, i) => (
                                                    <div key={i}>
                                                        <br/>
                                                        <label>
                                                            Question:
                                                            <input type="text" value={this.state.questions[i].question}
                                                                   onChange={e => this.handleChange(i, 'question', e)}/>
                                                        </label>
                                                        <br/>
                                                        <label>
                                                            Enter Option 1:
                                                            <input type="text" value={this.state.questions[i].op1}
                                                                   onChange={e => this.handleChange(i, 'op1', e)}/>
                                                        </label>
                                                        <br/>
                                                        <label>
                                                            Enter Option 2:
                                                            <input type="text" value={this.state.questions[i].op2}
                                                                   onChange={e => this.handleChange(i, 'op2', e)}/>
                                                        </label>
                                                        <br/>
                                                        <label>
                                                            Enter Option 3:
                                                            <input type="text" value={this.state.questions[i].op3}
                                                                   onChange={e => this.handleChange(i, 'op3', e)}/>
                                                        </label>
                                                        <br/>
                                                        <label>
                                                            Enter Option 4:
                                                            <input type="text" value={this.state.questions[i].op4}
                                                                   onChange={e => this.handleChange(i, 'op4', e)}/>
                                                        </label>
                                                        <br/>
                                                        <label>
                                                            Select Correct Option:
                                                            <select value={this.state.questions[i].answer || "1"}
                                                                    onChange={e => this.handleChange(i, 'answer', e)}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                            </select>
                                                        </label>
                                                        <br/>
                                                        <label>
                                                            Enter Marks:
                                                            <input type="number" min="1" max="100"
                                                                   value={this.state.questions[i].marks || "1"}
                                                                   onChange={e => this.handleChange(i, 'marks', e)}/>
                                                        </label>
                                                        <br/>
                                                        <input
                                                            className="btn btn-danger"
                                                            type="button"
                                                            value="Remove Question"
                                                            onClick={() => this.removeClick(i)}
                                                        />
                                                    </div>
                                                ))}

                                                <div className="d-flex align-items-center pt-3">
                                                    <div className="ml-auto mr-sm-5">
                                                        <input className="btn btn-primary" type="button"
                                                               value="Add Question"
                                                               onClick={() => this.addClick()}/>
                                                    </div>
                                                    <div className="ml-auto mr-sm-5">
                                                        <input className="btn btn-success" type="submit"
                                                               value="Create Test"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="tablink" label="Give Test">
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
                                    <br/><br/>
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
                                        {this.state.tests.map((el, i) => (
                                            <tr key={i}>
                                                <td>{el.name}</td>
                                                <td>{el.code}</td>
                                                <td>{el.duration} mins</td>
                                                <td>
                                                    <center>
                                                        <button className="btn btn-primary"
                                                                onClick={e => this.fillCode(el.code)}>Fill Code
                                                        </button>
                                                    </center>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tablink" label="Test Scores">
                                    <br/>
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
                                        {this.state.scores.map((el, i) => (
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
                            </Tabs>
                            {/*<button className="tablink" onClick={this.openPage('Home', this, 'gray')}
                                    id="defaultOpen">Create/Give Test
                            </button>
                            <button className="tablink" onClick={this.openPage('News', this, 'gray')}>Test Scores
                            </button>
*/
                            }

                            {/*<br/>
                            {'Hello ' + this.state.user.name + '. Welcome to Quick Test.'}
                            <br/>
                            <p> {this.state.previousScore ? 'Your score for previous test is ' + this.state.previousScore.score + '/' + this.state.previousScore.total : ''} </p>
*/
                            }

                            {/*<div id="Home" className="tabcontent">

                            </div>

                            <div id="News" className="tabcontent">

                            </div>*/
                            }
                        </div>
                ) :
                <div>
                    <SignUp action={this.loginHandler}/>
                    <LogIn action={this.loginHandler}/>
                </div>
        );
    }
}

// https://codepen.io/ehermanson/pen/KwKWEv

export default CreateTest;