import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReduxLogo from '../static/ReduxLogo.svg';
import Profile from '../components/Profile';
import { fetchProfile } from '../actions/profile';

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

  componentDidMount() {
    this.props.dispatch(fetchProfile());
  }

  handleRefresh() {
    this.props.dispatch(fetchProfile());
  }

  render() {
    return (
      <div style={style.container}>
        <img
          alt={'Redux logo'}
          src={ReduxLogo}
          style={style.logo}
          onClick={() => this.handleRefresh()}
        />
        <h1 style={style.headline}>
          Welcome!
        </h1>
        <Profile profile={this.props.profile} />
      </div>
    );
  }
}

IndexContainer.propTypes = {
  profile: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(IndexContainer);
