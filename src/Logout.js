import React from 'react';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    logout = () => {
        /*this.setState({
            token: null,
            user: null
        });*/
        this.props.action('logout');
        localStorage.removeItem('token');
    };

    render() {
        return (
            <div>
                <input
                    className="btn btn-danger float-right"
                    type="button"
                    value="Logout"
                    onClick={() => this.logout()}
                />
            </div>
        );
    }
}

export default Logout;