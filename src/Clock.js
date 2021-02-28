import React from 'react';
import moment from 'moment';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.init(this.props.duration);
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    init(duration) {
        let date = new Date();
        this.setState({
            end: moment(date).add(duration, 'm').toDate(),
            current: date
        });
    }

    tick() {
        this.setState({
            current: new Date()
        });
        // console.log(this.state.end - this.state.current);
        if (parseInt((this.state.end - this.state.current)/1000) === 0) {
            clearInterval(this.timerID);
            this.props.action('time-up');
            // swal.fire('Time Up!');
            // alert('Time Up!');
        }
    }

    msToTime(duration) {
        let seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    render() {
        return (
            <div>
                <h2>Time Left - {this.msToTime(this.state.end - this.state.current)}</h2>
            </div>
        );
    }
}

export default Clock;