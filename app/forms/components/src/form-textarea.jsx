// @ifdef IS_NODE
var React = require('react');
// @endif

var FormTextarea = React.createClass({

  getInitialState: function () {
    return {};
  },

  niceName: function (name) {
    return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/_/g, ' ');
  },

  render: function() {

    var field_info  = this.state.field_info ? this.state.field_info : this.props.field_info,
        label       = this.niceName(field_info.name);

    return (
      <div className={field_info.wrapper_class}>
        <label for={field_info.name}>{label}</label>
        <textarea name={field_info.name} className={field_info.field_class} type={field_info.type} value={field_info.value} placeholder={label}></textarea>
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = FormTextarea;
// @endif
