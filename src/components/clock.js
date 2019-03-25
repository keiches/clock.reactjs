import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Digit from './digit';

const ClockContext = React.createContext('clock');

function withContext(Widget) {
  return function ContextComponent(props) {
    return (
      <ClockContext.Consumer>{times => <Widget {...props} times={times} />}</ClockContext.Consumer>
    );
  };
}

class Clock extends Component {
  state = {
    hours: this.props.hours || 0,
    minutes: this.props.minutes || 0,
    seconds: this.props.seconds || 0
  };

  constructor(props) {
    super(props);
    this.handleHoursTicked = this.handleHoursTicked.bind(this);
    this.handleHoursOverflowed = this.handleHoursOverflowed.bind(this);
    this.handleMinutesTicked = this.handleMinutesTicked.bind(this);
    this.handleMinutesOverflowed = this.handleMinutesOverflowed.bind(this);
    this.handleSecondsTicked = this.handleSecondsTicked.bind(this);
    this.handleSecondsOverflowed = this.handleSecondsOverflowed.bind(this);
  }

  componentDidMount() {
    //
  }

  handleHoursOverflowed() {
    /* const state = this.state;
    const props = this.props;
    if (props.resetTicksForHour > state.hours) {
      this.setState({
        hours: state.hours + props.ticksPerHour
      });
    } else {
      this.setState({
        hours: 0
      });
    }*/
  }

  handleHoursTicked(hours) {
    //
  }

  handleMinutesOverflowed() {
    const state = this.state;
    const props = this.props;
    if (props.resetTicksForHour > state.hours) {
      this.setState({
        hours: state.hours + props.ticksPerHour
      });
    } else {
      this.setState({
        hours: 0
      });
    }
  }

  handleMinutesTicked(minutes) {
    //
  }

  handleSecondsOverflowed() {
    const state = this.state;
    const props = this.props;
    if (props.resetTicksForMinute > state.minutes) {
      this.setState({
        minutes: state.minutes + props.ticksPerMinute
      });
    } else {
      this.setState({
        minutes: 0
      });
    }
  }

  handleSecondsTicked(seconds) {
    //
  }

  render() {
    return (
      <ClockContext.Provider value="times">
        <div className="clock">
          <Digit
            className="hours"
            longFormatted={this.props.longFormatted}
            value={this.state.hours}
            reset={this.props.resetTicksForHour}
            ticks={this.props.ticksPerHour}
            onOverflowed={this.handleHoursOverflowed}
            onTicked={this.handleHoursTicked}
          />
          <span className={'separator-hours-mins'}>:</span>
          <Digit
            className={'mins'}
            longFormatted={this.props.longFormatted}
            value={this.state.minutes}
            reset={this.props.resetTicksForMinute}
            ticks={this.props.ticksPerMinute}
            onOverflowed={this.handleMinutesOverflowed}
            onTicked={this.handleMinutesTicked}
          />
          <span className={'separator-mins-secs'}>:</span>
          <Digit
            className={'secs'}
            autoTicks={true}
            longFormatted={this.props.longFormatted}
            value={this.state.seconds}
            reset={this.props.resetTicksForSecond}
            ticks={this.props.ticksPerSecond}
            onOverflowed={this.handleSecondsOverflowed}
            onTicked={this.handleSecondsTicked}
          />
        </div>
      </ClockContext.Provider>
    );
  }
}

Clock.propsTypes = {
  longFormatted: PropTypes.bool,
  hours: PropTypes.number,
  resetTicksForHour: PropTypes.number,
  ticksPerHour: PropTypes.number,
  minutes: PropTypes.number,
  resetTicksForMinute: PropTypes.number,
  ticksPerMinute: PropTypes.number,
  seconds: PropTypes.number,
  resetTicksForSecond: PropTypes.number,
  ticksPerSecond: PropTypes.number
};
Clock.defaultProps = {
  longFormatted: true,
  hours: 0,
  resetTicksForHour: 24,
  ticksPerHour: 1,
  minutes: 0,
  resetTicksForMinute: 60,
  ticksPerMinute: 1,
  seconds: 0,
  resetTicksForSecond: 60,
  ticksPerSecond: 1
};

export default Clock;
