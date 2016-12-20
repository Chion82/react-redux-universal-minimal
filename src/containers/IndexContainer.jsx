import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReduxLogo from '../static/ReduxLogo.svg';
import Profile from '../components/Profile';
import { Link } from 'react-router';
import { WAIT_FOR_ACTION } from '../store/reduxWaitForMiddleware';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    marginBottom: '10vh',
  },
  logo: {
    height: '20vh',
  },
};

class IndexContainer extends Component {

  static fetchData(dispatch) {
    return dispatch({
      type: 'profile/get',
      [WAIT_FOR_ACTION]: 'profile/get/success',
    });
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    IndexContainer.fetchData(this.props.dispatch);
  }

  handleRefresh() {
    IndexContainer.fetchData(this.props.dispatch);
  }

  render() {
    return (
      <div style={style.container}>
        <img
          alt={'Redux logo'}
          src={ReduxLogo}
          style={style.logo}
        />
        <h1 style={style.headline}>
          Welcome!
        </h1>
        <Link to="/zen">Zen</Link>
        <a href="javascript:;" onClick={() => this.handleRefresh()}>Refresh</a>
        <Profile profileInfo={this.props.profile.profileInfo || {}} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(IndexContainer);
