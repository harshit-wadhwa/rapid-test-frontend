import React from 'react';

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {question: '', option1: '', option2: '', option3: '', option4: '', answer: ''};

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleOption1Change = this.handleOption1Change.bind(this);
        this.handleOption2Change = this.handleOption2Change.bind(this);
        this.handleOption3Change = this.handleOption3Change.bind(this);
        this.handleOption4Change = this.handleOption4Change.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch("http://localhost:8080/question", {
            method: "GET"
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
            }).catch(err => {
            console.log(err);
        });
    }

    handleQuestionChange(event) {
        this.setState({
            question: event.target.value
        });
    }

    handleOption1Change(event) {
        this.setState({
            option1: event.target.value
        });
    }

    handleOption2Change(event) {
        this.setState({
            option2: event.target.value
        });
    }

    handleOption3Change(event) {
        this.setState({
            option3: event.target.value
        });
    }

    handleOption4Change(event) {
        this.setState({
            option4: event.target.value
        });
    }

    handleAnswerChange(event) {
        this.setState({
            answer: event.target.value
        });
    }

    handleSubmit(event) {
        // alert('A question was submitted: ' + this.state.question + this.state.option1 + this.state.answer);
        console.log(this.state);
        event.preventDefault();
        const question = {
            question: this.state.question,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            answer: this.state.answer
        };
        console.log('QUESTION: ', question);
        fetch("http://localhost:8080/question", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(question)
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                this.setState({question: '', option1: '', option2: '', option3: '', option4: '', answer: ''});
            }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <br/>
                <label>
                    Question:
                    <input type="text" value={this.state.question} onChange={this.handleQuestionChange}/>
                </label>
                <br/>
                <label>
                    Enter Option 1:
                    <input type="text" value={this.state.option1} onChange={this.handleOption1Change}/>
                </label>
                <br/>
                <label>
                    Enter Option 2:
                    <input type="text" value={this.state.option2} onChange={this.handleOption2Change}/>
                </label>
                <br/>
                <label>
                    Enter Option 3:
                    <input type="text" value={this.state.option3} onChange={this.handleOption3Change}/>
                </label>
                <br/>
                <label>
                    Enter Option 4:
                    <input type="text" value={this.state.option4} onChange={this.handleOption4Change}/>
                </label>
                <br/>
                <label>
                    Enter Correct Option:
                    <select value={this.state.answer} onChange={this.handleAnswerChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </label>
                <br/>
                <input type="submit" value="Add Question"/>
            </form>
        );
    }
}

export default AddQuestion;