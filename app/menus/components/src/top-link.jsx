// @ifdef IS_NODE
'use strict';

var React = require('react');
// @endif


var TopLink = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var link = this.state.link ? this.state.link : this.props.link;

    return (
      <li className='pull-left'>
        <a href={link.url}>{link.display_name}</a>
      </li>
    );
  },
});

// @ifdef IS_NODE
module.exports = TopLink;
// @endif