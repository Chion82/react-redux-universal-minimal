import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { WAIT_FOR_ACTION } from '../store/reduxWaitForMiddleware';

class ZenContainer extends Component {

  static propTypes = {
    zen: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  static fetchData(dispatch) {
    return dispatch({
      type: 'zen/get',
      [WAIT_FOR_ACTION]: 'zen/get/success',
    });
  }

  componentDidMount() {
    ZenContainer.fetchData(this.props.dispatch);
  }

  render() {
    return (
      <div>
        <h1>{this.props.zen.zenInfo && this.props.zen.zenInfo.text}</h1>
        <Link to="/">Index</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  zen: state.zen,
});

export default connect(mapStateToProps)(ZenContainer);
