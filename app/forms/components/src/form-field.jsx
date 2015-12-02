// @ifdef IS_NODE
var React         = require('react'),
    _             = require('lodash'),
    FormInput     = require('./form-input'),
    FormImage     = require('./form-image'),
    FormTextarea  = require('./form-textarea'),
    FormSubmit    = require('./form-submit'),
    FormHidden    = require('./form-hidden'),
    FormError     = require('./form-error');
// @endif

var FormField = React.createClass({

  getInitialState: function () {
    return {};
  },

  fieldDefaults: {
    input: {
      wrapper_class: 'form-group',
      field_class: 'form-control',
      type: 'text',
      value: '',
    },
    image: {
      wrapper_class: 'form-group',
      field_class: 'form-control',
      type: 'file',
      value: '',
    },
    textarea: {
      wrapper_class: 'form-group',
      field_class: 'form-control',
      type: 'text',
      value: '',
    },
    submit: {
      wrapper_class: 'col-sm-2',
      field_class: 'btn btn-success',
      elem: 'input',
      type: 'submit',
      value: 'Submit',
    },
    hidden: {
      field_class: 'hidden',
      elem: 'input',
      type: 'hidden',
      value: '',
    },
    error: {},
  },

  renderField: function (field) {
    var map = {
      input: function () {
        return <FormInput field_info={field} />
      },
      image: function () {
        return <FormImage field_info={field} />
      },
      textarea: function () {
        return <FormTextarea field_info={field} />
      },
      submit: function () {
        return <FormSubmit field_info={field} />
      },
      hidden: function () {
        return <FormHidden field_info={field} />
      },
      error: function () {
        return <FormError field_info={field} />
      },
    }
    return map[field.elem]() || map['input']();
  },

  render: function() {
    var field_info = this.state.field_info ? this.state.field_info : this.props.field_info,
        field = _.assign({}, this.fieldDefaults[field_info.elem], field_info);

    return this.renderField(field);
  },
});


// @ifdef IS_NODE
module.exports = FormField;
// @endif
