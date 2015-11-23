// @ifdef IS_NODE
var React = require('react');
// @endif

var FormError = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function() {

    var field_info = this.state.field_info ? this.state.field_info : this.props.field_info;

    return (
      <p className={field_info.field_class}>{field_info.error}</p>
    );
  },
});


// @ifdef IS_NODE
module.exports = FormError;
// @endif
