// @ifdef IS_NODE
var React = require('react');
// @endif

var FormSubmit = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function() {

    var field_info  = this.state.field_info ? this.state.field_info : this.props.field_info;

    return (
      <div className={field_info.wrapper_classes}>
        <input className={field_info.field_class} type='submit' value={field_info.value} />
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = FormSubmit;
// @endif
