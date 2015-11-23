// @ifdef IS_NODE
var React = require('react'),
    _     = require('lodash');
// @endif

var UserFragment = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var user = this.state.user_info ? this.state.user_info : this.props.user_info;

    return (
      <div>Hello {user.display_name}</div>
    );
  },
});

// @ifdef IS_NODE
module.exports = UserFragment;
// @endif
