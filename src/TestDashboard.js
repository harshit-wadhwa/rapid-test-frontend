import './CreateTest.css';

import decodeJwt from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';

import Tabs from "./Tabs";
import config from "./config";
import TestHeader from "./TestHeader";
import Test from "./Test";
import Logout from "./Logout";
import CreateTest from "./CreateTest";
import PerformTest from "./PerformTest";
import AvailableTest from "./AvailableTest";
import TestScore from "./TestScore";

class TestDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startTest: false,
            scores: [],
            tests: [],
            user: this.props.user,
            token: this.props.token
        };
        console.log(this.state);
    }

    componentDidMount() {
        this.fetchTests();
        this.fetchScores();
    }

    fetchScores = () => {
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
    };

    fetchTests = () => {
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
            // console.log(err);
        });
    };

    testActionHandler = async (dataFromChild) => {
        console.log('DATA FROM CHILD: ', dataFromChild);
        if (dataFromChild.event === 'start-test') {
            this.setState({
                startTest: true,
                testData: {
                    questions: dataFromChild.questions,
                    duration: dataFromChild.duration,
                    name: dataFromChild.name,
                    totalScore: dataFromChild.totalScore,
                    code: dataFromChild.code
                }
            });
        } else if (dataFromChild.event === 'end-test') {
            console.log('Ending test');
            this.setState({
                startTest: false
            });
            await this.fetchScores();
        }
    };

    logoutHandler = (dataFromChild) => {
        if (dataFromChild === 'logout') {
            this.props.action('logout');
            /*this.setState({
               user: null,
               token: null
            });*/
        }
    };

    createTestHandler = async (dataFromChild) => {
        if (dataFromChild === 'add-test') {
            await this.fetchTests();
        }
    };

    render() {
        return (
            this.state.startTest ?

                <div>
                    <Test user={this.state.user} token={this.state.token} test={this.state.testData}
                          endTest={this.state.endTest} action={this.testActionHandler}/>
                </div>

                :

                <div>
                    <Logout action={this.logoutHandler}/>

                    <Tabs>
                        <div className="tablink" label="Create Test">
                            <CreateTest user={this.state.user} token={this.state.token}
                                        action={this.createTestHandler}/>
                        </div>

                        <div className="tablink" label="Give Test">
                            {/*<PerformTest user={this.state.user}/>*/}
                            <br/><br/>
                            <AvailableTest tests={this.state.tests} user={this.state.user} token={this.state.token}
                                           action={this.testActionHandler}/>
                        </div>

                        <div className="tablink" label="Test Scores">
                            <br/>
                            <TestScore scores={this.state.scores}/>
                        </div>
                    </Tabs>

                    {/*<br/>
                            {'Hello ' + this.state.user.name + '. Welcome to Quick Test.'}
                            <br/>
                            <p> {this.state.previousScore ? 'Your score for previous test is ' + this.state.previousScore.score + '/' + this.state.previousScore.total : ''} </p>*/}
                </div>
        );
    }
}

// https://codepen.io/ehermanson/pen/KwKWEv

export default TestDashboard;