// @ifdef IS_NODE
var React         = require('react'),
    _             = require('lodash');
// @endif

var UserList = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function() {
    var list = this.state.list ? this.state.list : this.props.list;

    return (
      <div className='col-sm-6 col-sm-offset-3 text-center'>
        <h1>Loading</h1>
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = UserList;
// @endif
