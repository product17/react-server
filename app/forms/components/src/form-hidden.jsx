// @ifdef IS_NODE
'use strict';
var React = require('react');
// @endif

var FormHidden = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function() {

    var field_info = this.state.field_info ? this.state.field_info : this.props.field_info;

    return (
      <input name={field_info.name} className={field_info.field_class} type={field_info.type} value={field_info.value} />
    );
  },
});


// @ifdef IS_NODE
module.exports = FormHidden;
// @endif
