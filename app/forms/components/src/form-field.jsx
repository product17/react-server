// @ifdef IS_NODE
var React = require('react'),
    FormInput = require('./form-input');
// @endif

var FormField = React.createClass({

  getInitialState: function () {
    return {};
  },

  fieldType: function (type) {
    var map = {

    }
    return map[type] || map['input'];
  },

  render: function() {
    var field_info = this.state.field_info ? this.state.field_info : this.props.field_info;

    return (
      <FormInput field_info={field_info} />
    );
  },
});


// @ifdef IS_NODE
module.exports = FormField;
// @endif
