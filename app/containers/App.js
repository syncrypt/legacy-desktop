import React, { Component, PropTypes } from 'react';
import rest from '../api'
import { connect } from 'react-redux';
import ConnectingPage from '../components/ConnectingPage';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    connected: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    const { dispatch, connected } = this.props;
    if (!connected) {
      dispatch(rest.actions.stats.reset());
    }
    dispatch(rest.actions.stats());
  }

  render() {
    return (
      <div>
        { this.props.connected ? this.props.children : <ConnectingPage /> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    connected: state.stats.sync && (state.stats.loading || state.stats.error == null)
  };
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
