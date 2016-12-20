import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchZen } from '../actions/zen';
import { Link } from 'react-router';

class ZenContainer extends Component {

  static propTypes = {
    zen: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  static fetchData(dispatch) {
    return dispatch(fetchZen());
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
