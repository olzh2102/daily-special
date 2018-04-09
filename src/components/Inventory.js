import React from "react";
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes:PropTypes.object,
    updateFish: PropTypes.func,
    deleteFush: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    owner: null,
    uid: null
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    });
  };

  authHandler = async (authData) => {
    // 1. Check the current store in firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if(!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log('logging out');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = <button onClick={this.logout}>Logout</button>;

    // 1. Check if the user is logged in 
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
      // eslint-disable-next-line
    }

    // 2. Check if they not are owner of the store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not an owner of the store</p>
          {logout}
        </div>
      );
    }

    // 3. They must be the owner
    return (
      <div className="order">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => 
          <EditFishForm 
            key={key} 
            index={key}
            fish={this.props.fishes[key]} 
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}  
          />)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;