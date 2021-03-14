import React, {useState} from 'react';
import TestDashboard from "./TestDashboard";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import decodeJwt from "jwt-decode";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        let token = localStorage.getItem('token');
        this.state = {
            token,
            user: token ? decodeJwt(token) : null,
        };
    }

    loginHandler = (dataFromChild) => {
        // console.log(dataFromChild);
        if (dataFromChild && dataFromChild.token && dataFromChild.user) {
            // useState({token: dataFromChild.token, user: dataFromChild.user});
            this.setState({token: dataFromChild.token, user: dataFromChild.user});
        }
    };

    testActionHandler = (dataFromChild) => {
        if (dataFromChild === 'logout') {
            this.setState({
                user: null,
                token: null
            });
        }
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                {
                    this.state.user && this.state.user.id ?
                        <TestDashboard action={this.testActionHandler} user={this.state.user} token={this.state.token}/>
                        :
                        <div>
                            <SignUp action={this.loginHandler}/>
                            <LogIn action={this.loginHandler}/>
                        </div>
                }
            </div>
        );
    }
}

export default Dashboard;