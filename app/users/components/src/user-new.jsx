// @ifdef IS_NODE
var React     = require('react'),
    _         = require('lodash'),
    FormField = require('../../../forms/components/build/form-field');
// @endif

var UserNew = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var form_schema = this.state.form_schema ? this.state.form_schema : this.props.form_schema;


    var fields = _.map(form_schema, function (field, i) {
console.log(field)
      return <FormField key={i} field_info={field} />
    });

    // console.log(fields);

    return (
      <div>
        {fields}
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = UserNew;
// @endif
