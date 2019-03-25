import React, { Component } from 'react';
import PropTypes from 'prop-types';

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  (window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) ||
  window.oRequestAnimationFrame ||
  !window.msRequestAnimationFrame ||
  (callback => window.setTimeout(callback, 1000 / 60)); // shoot for 60 fps

window.cancelAnimationFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.oCancelRequestAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  window.clearTimeout;

window.requestInterval = function requestInterval(callback, timeout) {
  if (!window.requestAnimationFrame) return window.setInterval(callback, timeout);

  let start = window.performance.now(); // new Date().getTime();
  const handle = {};

  function loop() {
    const current = window.performance.now(); // new Date().getTime();
    const delta = current - start;

    if (delta >= timeout) {
      callback.call();
      start = current; // window.performance.now(); // new Date().getTime();
    }

    handle.value = window.requestAnimationFrame(loop);
  }

  handle.value = window.requestAnimationFrame(loop);
  return handle;
};

window.clearRequestInterval = function clearRequestInterval(handle) {
  window.cancelAnimationFrame(handle.value);
};

class Digit extends Component {
  state = {
    value: this.props.value,
    angle: 360 / this.props.reset,
    style: {
      transform: 'rotate(0deg)'
    },
    ticksToReset: this.props.ticks * 1000
  };

  constructor(props) {
    super(props);
    this.handleTicked = this.handleTicked.bind(this);
    this.processTick = this.processTick.bind(this);
  }

  componentDidMount() {
    const props = this.props;
    if (props.autoTicks) {
      this.setState({
        taskStartTime: window.performance.now(),
        className: 'rotate' // 'rotating',
        /* style: {
          animationDuration: `${props.reset}s`
        }*/
      });
      window.requestInterval(this.processTick, props.ticks);
    } else {
      this.setState({
        className: 'rotate'
      });
    }
    //
  }

  componentWillReceiveProps(props) {
    if (props.reset !== this.props.reset) {
      this.setState({
        angle: 360 / props.reset
      });
    }
    if (props.value !== this.props.value) {
      if (props.value === 0) {
        this.setState({
          value: 0,
          style: {
            transform: 'rotate(0deg)'
          }
        });
        this.props.onOverflowed();
      } else {
        this.setState({
          value: props.value,
          style: {
            transform: `rotate(${(this.state.angle * props.value) % 360}deg)`
          }
        });
        this.props.onTicked();
      }
    }
  }

  handleTicked() {
    // console.log('yyyy', this.props.className, this.state);
    const state = this.state;
    const props = this.props;
    const value = state.value + props.ticks;
    if (props.reset > value) {
      this.setState({
        value,
        style: {
          transform: `rotate(${(state.angle * value) % 360}deg)`
        }
      });
      this.props.onTicked();
    } else {
      this.setState({
        value: 0,
        style: {
          transform: 'rotate(0deg)'
        }
      });
      this.props.onOverflowed();
    }
  }

  processTick() {
    // Go again if there’s enough time to do the next task.
    const taskFinishTime = window.performance.now();
    if (taskFinishTime - this.state.taskStartTime >= this.state.ticksToReset) {
      this.setState({
        taskStartTime: taskFinishTime
      });
      this.handleTicked();
    }

    // window.requestAnimationFrame(this.processTick);
  }

  render() {
    const state = this.state;
    const props = this.props;
    const value = props.longFormatted ? `${state.value}`.padStart(2, '0') : state.value;
    return (
      // <div className="digit" style={{ transform: `rotate(${degree}deg)` }}>
      /* <div
        className="digit"
        style={{
          animation: `${props.className}-rotating 1s linear infinite`,
          animationFillMode: 'forwards'
        }}
      >*/
      <div className={`digit ${state.className}`} style={state.style}>
        <div className="border-outer">
          <div className="border-inner" />
        </div>
        {value}
      </div>
    );
  }
}

Digit.propTypes = {
  autoTicks: PropTypes.bool,
  longFormatted: PropTypes.bool,
  value: PropTypes.number,
  reset: PropTypes.number,
  ticks: PropTypes.number,
  onOverflowed: PropTypes.func,
  onTicked: PropTypes.func
};
Digit.defaultProps = {
  autoTicks: false,
  longFormatted: true,
  value: 0,
  reset: 60,
  ticks: 1,
  onOverflowed: null,
  onTicked: null
};

export default Digit;
