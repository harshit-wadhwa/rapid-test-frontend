import React from 'react';

class EntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', code: ''};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleCodeChange(event) {
        this.setState({
            code: event.target.value
        });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name + ' with code: ' + this.state.code);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <br/>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <br/>
                <label>
                    Test Code:
                    <input type="text" value={this.state.code} onChange={this.handleCodeChange} />
                </label>
                <br/>
                <input type="submit" value="Start test" />
            </form>
        );
    }
}

export default EntryForm;