import React from 'react';

export default class StandardButton extends React.Component {

  render() {
    let {buttonString, onClick} = this.props;
    return (<div className="movie-query-button"
       onClick={onClick}>
      {buttonString}
    </div>);
  }
}