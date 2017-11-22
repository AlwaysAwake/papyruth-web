import React from 'react';
import Loading from 'react-loading';

export default class LoadingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{textAlign: "center", padding: '10px', display: this.props.display}}>
        <Loading type='spin' color='#e3e3e3' style={{marginTop: '10px'}}/>
        <p className="roboto" style={{marginTop: '10px'}}>{this.props.message}</p>
      </div>
    );
  }
}
