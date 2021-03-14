import React from 'react';
import config from "./config";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', email: ''};
        this.signUp = this.signUp.bind(this);
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

    signUp(event) {
        // console.log(this.state);
        event.preventDefault();
        const credentials = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        // console.log(credentials);
        fetch(config.baseUrl + "/sign-up", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(response => {
                console.log(response);
                if (response) {
                    if (response.error) {
                        this.setState({
                            errors: response.error
                        });
                        return;
                    }
                    localStorage.setItem('token', response.token);
                    this.setState({
                        name: '',
                        email: '',
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
                <form onSubmit={this.signUp}>
                    <div className="container out mt-sm-5 my-1">
                        <div className="question ml-sm-5 pl-sm-5 pt-2">
                            REGISTER
                            <br/><br/>
                            <label>
                                Name:
                                <input type="text" value={this.state.name}
                                       onChange={e => this.handleChange('name', e)}/>
                            </label>
                            <p style={{color: 'red'}}>{this.state.errors && this.state.errors.name ? this.state.errors.name : ''}</p>
                            <br/>
                            <label>
                                Email:
                                <input type="text" value={this.state.email}
                                       onChange={e => this.handleChange('email', e)}/>
                            </label>
                            <p style={{color: 'red'}}>{this.state.errors && this.state.errors.email ? this.state.errors.email : ''}</p>
                            <br/>
                            <label>
                                Password:
                                <input type="password" value={this.state.password}
                                       onChange={e => this.handleChange('password', e)}/>
                            </label>
                            <p style={{color: 'red'}}>{this.state.errors && this.state.errors.password ? this.state.errors.password : ''}</p>
                            <br/>
                            <input className="btn btn-success" type="submit" value="Sign Up"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp;