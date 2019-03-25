import React, { Component } from 'react';

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
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      reset: 360 / props.reset,
      ticksToReset: props.ticks * 1000
    };
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
        reset: 360 / props.reset
      });
    }
    if (props.value !== this.props.value) {
      // console.log('xxxx', props.className, props);
      /* if (this.props.ticks) {
        if (this.props.reset > props.value) {
          this.setState({
            value: props.value
          });
          this.props.onTicked();
        } else {
          this.setState({
            value: 0
          });
          this.props.onReset();
        }
      }*/
      this.setState({
        value: props.value,
        style: {
          transform: `rotate(${(this.state.reset * props.value) % 360}deg)`
        }
      });
      this.handleTicked();
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
          transform: `rotate(${(state.reset * value) % 360}deg)`
        }
      });
      // 360 / this.props.reset
      this.props.onTicked();
    } else {
      this.setState({
        value: 0,
        style: {
          transform: 'rotate(0deg)'
        }
      });
      this.props.onReset();
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
        {value}
      </div>
    );
  }
}

export default Digit;
