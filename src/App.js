import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './components/clock';

class App extends Component {
  /* constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

 componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad);
  }

  handleLoad() {
    const elemApp = document.getElementsByClassName('App-logo')[0];
    // const pfx = ['webkit', 'moz', 'MS', 'o', ''];
    let hovered = false;

    function onAnimationIteration(event) {
      console.log('AnimationListener', event);
      if (hovered) {
        elemApp.classList.remove('animated');
        /!* elemApp.style.webkitTransform = 'scale(2)';
        elemApp.style.MozTransform = 'scale(2)';
        elemApp.style.msTransform = 'scale(2)';
        elemApp.style.OTransform = 'scale(2)';*!/
        elemApp.style.transform = 'scale(2)';
      }
    }

    function onTransitionEnd(event) {
      console.log('TransitionListener', event);
      if (!hovered) {
        elemApp.classList.add('animated');
      }
    }

    function PrefixedEvent(element, type, callback) {
      /!* for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p] + type, callback, false);
      }*!/
      element.addEventListener(type.toLowerCase(), callback, false);
    }

    PrefixedEvent(elemApp, 'AnimationIteration', onAnimationIteration);

    elemApp.onmouseover = function onmouseover(event) {
      console.log('onmouseover', event);
      hovered = true;
    };
    elemApp.onmouseout = function onmouseout(event) {
      console.log('onmouseout', event);
      setTimeout(function iter() {
        hovered = false;
      }, 500);
      PrefixedEvent(elemApp, 'TransitionEnd', onTransitionEnd);
      /!* elemApp.style.webkitTransform = 'scale(1)';
      elemApp.style.MozTransform = 'scale(1)';
      elemApp.style.msTransform = 'scale(1)';
      elemApp.style.OTransform = 'scale(1)';*!/
      elemApp.style.transform = 'scale(1)';
    };
  }*/

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Clock
          hours={0}
          resetTicksForHour={12}
          ticksPerHour={1}
          minutes={0}
          resetTicksForMinute={5}
          ticksPerMinute={1}
          seconds={0}
          resetTicksForSecond={12}
          ticksPerSecond={1}
          longFormatted={true}
        />
      </div>
    );
  }
}

export default App;
