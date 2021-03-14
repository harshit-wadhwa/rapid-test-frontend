import React from "react";
import config from "./config";
import {guid} from './helper';

class CreateTest extends React.Component {

    question = {
        question: '',
        op1: '',
        op2: '',
        op3: '',
        op4: '',
        answer: '',
        marks: 1
    };

    constructor(props) {
        super(props);
        this.state = {
            questions: [{...this.question}],
            totalMarks: 1,
            name: '',
            code: guid(),
            duration: '',
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleDurationChange = (event) => {
        this.setState({
            duration: event.target.value
        });
    };

    handleStudentNameChange = (event) => {
        this.setState({
            studentName: event.target.value
        });
    };

    handleCreateTest = (event) => {
        event.preventDefault();
        const test = {
            user_id: this.props.user.id,
            name: this.state.name,
            code: this.state.code,
            duration: this.state.duration,
            questions: this.state.questions,
            totalMarks: this.state.totalMarks
        };
        console.log(test);
        fetch(config.baseUrl + "/test", {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.token},
            body: JSON.stringify(test)
        })
            .then(res => res.json())
            .then(response => {
                if (response) {
                    console.log(response);
                    if (response.error) {
                        this.setState({
                            errors: response.error
                        });
                        return;
                    }
                    this.setState({
                        name: '',
                        duration: '',
                        code: guid(),
                        questions: [{...this.question}]
                    });
                }
            }).catch(err => {
            console.log(err);
        });

        this.props.action('add-test');
    };

    handleChange = (i, name, event) => {
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
    };

    addClick = () => {
        this.setState(prevState => ({
            questions: [...prevState.questions, {...this.question}],
            totalMarks: this.state.totalMarks + 1
        }));
    };

    removeClick = (i) => {
        let questions = [...this.state.questions];
        this.setState({
            totalMarks: this.state.totalMarks - parseInt(this.state.questions[i].marks)
        });
        questions.splice(i, 1);
        this.setState({questions});
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleCreateTest}>
                    <div className="container out mt-sm-5 my-1">
                        <div className="question ml-sm-5 pl-sm-5 pt-2">
                            <label>
                                Name:
                                <input type="text" value={this.state.name}
                                       onChange={this.handleNameChange}/>
                                <p style={{color: 'red'}}>{this.state.errors && this.state.errors.name ? this.state.errors.name : ''}</p>
                            </label>
                            <br/>
                            <label>
                                Duration (in minutes):
                                <input type="number" min="1" max="300" value={this.state.duration}
                                       onChange={this.handleDurationChange}/>
                                <p style={{color: 'red'}}>{this.state.errors && this.state.errors.duration ? this.state.errors.duration : ''}</p>
                            </label>
                            <br/>
                            <label>
                                Test Code: {this.state.code}
                            </label>
                            <br/>
                            <label>
                                Total Marks: {this.state.totalMarks}
                                <p style={{color: 'red'}}>{this.state.errors && this.state.errors.totalMarks ? this.state.errors.totalMarks : ''}</p>
                            </label>
                            <br/>

                            {this.state.questions.map((el, i) => (
                                <div key={i}>
                                    <br/>
                                    <label>
                                        Question:
                                        <input type="text" value={this.state.questions[i].question}
                                               onChange={e => this.handleChange(i, 'question', e)}/>
                                        <p style={{color: 'red'}}>{this.state.errors && this.state.errors['questions[' + i + '].question'] ? this.state.errors['questions[' + i + '].question'] : ''}</p>
                                    </label>
                                    <br/>
                                    <label>
                                        Enter Option 1:
                                        <input type="text" value={this.state.questions[i].op1}
                                               onChange={e => this.handleChange(i, 'op1', e)}/>
                                        <p style={{color: 'red'}}>{this.state.errors && this.state.errors['questions[' + i + '].op1'] ? this.state.errors['questions[' + i + '].op1'] : ''}</p>
                                    </label>
                                    <br/>
                                    <label>
                                        Enter Option 2:
                                        <input type="text" value={this.state.questions[i].op2}
                                               onChange={e => this.handleChange(i, 'op2', e)}/>
                                        <p style={{color: 'red'}}>{this.state.errors && this.state.errors['questions[' + i + '].op2'] ? this.state.errors['questions[' + i + '].op2'] : ''}</p>
                                    </label>
                                    <br/>
                                    <label>
                                        Enter Option 3:
                                        <input type="text" value={this.state.questions[i].op3}
                                               onChange={e => this.handleChange(i, 'op3', e)}/>
                                        <p style={{color: 'red'}}>{this.state.errors && this.state.errors['questions[' + i + '].op3'] ? this.state.errors['questions[' + i + '].op3'] : ''}</p>
                                    </label>
                                    <br/>
                                    <label>
                                        Enter Option 4:
                                        <input type="text" value={this.state.questions[i].op4}
                                               onChange={e => this.handleChange(i, 'op4', e)}/>
                                        <p style={{color: 'red'}}>{this.state.errors && this.state.errors['questions[' + i + '].op4'] ? this.state.errors['questions[' + i + '].op4'] : ''}</p>
                                    </label>
                                    <br/>
                                    <label>
                                        Select Correct Option:
                                        <select value={this.state.questions[i].answer}
                                                onChange={e => this.handleChange(i, 'answer', e)}>
                                            <option>---SELECT---</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                            <option value="4">Option 4</option>
                                        </select>
                                        <p style={{color: 'red'}}>{this.state.errors && this.state.errors['questions[' + i + '].answer'] ? this.state.errors['questions[' + i + '].answer'] : ''}</p>
                                    </label>
                                    <br/>
                                    <label>
                                        Enter Marks:
                                        <input type="number" min="1" max="100"
                                               value={this.state.questions[i].marks || "1"}
                                               onChange={e => this.handleChange(i, 'marks', e)}/>
                                        <p style={{color: 'red'}}>{this.state.errors && this.state.errors['questions[' + i + '].marks'] ? this.state.errors['questions[' + i + '].marks'] : ''}</p>
                                    </label>
                                    <br/>
                                    {i > 0 ?
                                        <input
                                            className="btn btn-danger"
                                            type="button"
                                            value="Remove Question"
                                            onClick={() => this.removeClick(i)}
                                        />
                                        :
                                        ''
                                    }
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
        );
    }
}

export default CreateTest;