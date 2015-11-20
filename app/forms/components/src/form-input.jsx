// @ifdef IS_NODE
var React = require('react');
// @endif

var FormInput = React.createClass({

  getInitialState: function () {
    return {};
  },

  render: function() {

    var field_info = this.state.field_info ? this.state.field_info : this.props.field_info;

    // Set defaults
    field_info.type = field_info.field.type || '';
    field_info.value = field_info.field.value || '';

    var tmp_label = field_info.name.charAt(0).toUpperCase() + field_info.name.slice(1);
    field_info.label = tmp_label.replace(/_/g, ' ');

    return (
      <div className={field_info.field.wrapper_classes || ''}>
        <label for={field_info.name}>{field_info.label}</label>
        <input name={field_info.name} className='form-control' type={field_info.type} value={field_info.value} placeholder={field_info.label} />
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = FormInput;
// @endif
