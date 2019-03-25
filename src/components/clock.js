import React, { Component } from 'react';
import Digit from './digit';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: props.hours || 0,
      minutes: props.minutes || 0,
      seconds: props.seconds || 0
    };
    this.handleHoursTicked = this.handleHoursTicked.bind(this);
    this.handleHoursReset = this.handleHoursReset.bind(this);
    this.handleMinutesTicked = this.handleMinutesTicked.bind(this);
    this.handleMinutesReset = this.handleMinutesReset.bind(this);
    this.handleSecondsTicked = this.handleSecondsTicked.bind(this);
    this.handleSecondsReset = this.handleSecondsReset.bind(this);
  }

  componentDidMount() {
    //
  }

  handleHoursReset() {
    //
  }

  handleHoursTicked(hours) {
    //
  }

  handleMinutesReset() {
    this.setState({
      hours: this.state.hours + 1
    });
  }

  handleMinutesTicked(minutes) {
    //
  }

  handleSecondsReset() {
    this.setState({
      minutes: this.state.minutes + 1
    });
  }

  handleSecondsTicked(seconds) {
    //
  }

  render() {
    return (
      <div className="clock">
        {/* <Digit
          className="hours"
          longFormatted={this.props.longFormatted}
          value={this.state.hours}
          reset={this.props.resetTicksForHour}
          ticks={this.props.ticksPerHour}
          onReset={this.handleHoursReset}
          onTicked={this.handleHoursTicked}
        />
        <span className={'separator-hours-mins'}>:</span>
        <Digit
          className={'mins'}
          longFormatted={this.props.longFormatted}
          value={this.state.minutes}
          reset={this.props.resetTicksForMinute}
          ticks={this.props.ticksPerMinute}
          onReset={this.handleMinutesReset}
          onTicked={this.handleMinutesTicked}
        />
        <span className={'separator-mins-secs'}>:</span>*/}
        <Digit
          className={'secs'}
          autoTicks={true}
          longFormatted={this.props.longFormatted}
          value={this.state.seconds}
          reset={this.props.resetTicksForSecond}
          ticks={this.props.ticksPerSecond}
          onReset={this.handleSecondsReset}
          onTicked={this.handleSecondsTicked}
        />
      </div>
    );
  }
}

export default Clock;
