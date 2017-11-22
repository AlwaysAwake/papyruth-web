'use strict';

import React from 'react';
import _ from 'underscore';

export default class RatingStars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stars, point, score, color, style } = this.props;
    let size = this.props.size + "em";
    let count = parseFloat(Math.round(score) * stars / point);
    let renderStars = () => {
      let starDom = [];
      for (let i = 1; i <= stars; i++) {
        let starType;
        if (i <= count) {
          starType = "fa-star";
        } else if (i > count && i < count + 1) {
          starType = "fa-star-half-o";
        } else {
          starType = "fa-star-o";
        }
        starDom.push(<i key={i} className={"fa " + starType} style={_.extend({ color: color, marginRight: "6px", fontSize: size}, this.props.starStyle)} />)
      }
      return starDom;
    };
    return <div style={style}>{renderStars()}</div>;
  }
};
