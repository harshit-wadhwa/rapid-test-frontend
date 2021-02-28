import React from 'react';
import config from './config';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: ''};
        this.logIn = this.logIn.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleChange(name, event) {
        let obj = {};
        obj[name] = event.target.value;
        this.setState(obj);
    }

    logIn(event) {
        console.log(this.state);
        event.preventDefault();
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(credentials);
        fetch(config.baseUrl + "/log-in", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                if (response) {
                    localStorage.setItem('token', response.token);
                    this.setState({
                        name: '',
                        password: ''
                    });
                    this.props.action({
                        user: response.user,
                        token: response.token
                    });
                    console.log(this.state);
                }
            }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.logIn}>
                    <div className="container out mt-sm-5 my-1">
                        <div className="question ml-sm-5 pl-sm-5 pt-2">
                            LOGIN
                            <br/><br/>
                            <label>
                                Email:
                                <input type="email" value={this.state.email}
                                       onChange={e => this.handleChange('email', e)}/>
                            </label>
                            <label>
                                Password:
                                <input type="password" value={this.state.password}
                                       onChange={e => this.handleChange('password', e)}/>
                            </label>
                            <br/>
                            <input className="btn btn-success" type="submit" value="Log In"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LogIn;