// @ifdef IS_NODE
var React     = require('react'),
    _         = require('lodash'),
    FormField = require('../../../forms/components/build/form-field');
// @endif

var UserEdit = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var form_schema = this.state.form_schema ? this.state.form_schema : this.props.form_schema;

    var fields = _.map(form_schema, function (field, i) {
      return <FormField key={i} field_info={field} />
    });

    return (
      <div className='col-sm-6 col-sm-offset-3'>
        <form method='post' encType="multipart/form-data">
          {fields}
        </form>
      </div>
    );
  },
});


// @ifdef IS_NODE
module.exports = UserEdit;
// @endif
