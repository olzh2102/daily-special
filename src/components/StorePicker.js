import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

  myInput = React.createRef();
  goToStore = (e) => {
    e.preventDefault();

    const storeName = console.log(this.myInput.value.value);

    this.props.history.push(`/store/${storeName}`);
    
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter Store</h2>
        <input 
          type="text" 
          ref={this.myInput}
          placeholder="Store name" 
          defaultValue={getFunName()} 
          required  
        />
        <button type="submit">Visit store -></button>
      </form>
    );
  }
}

export default StorePicker;