// @ifdef IS_NODE
'use strict';

var React     = require('react'),
    _         = require('lodash'),
    FormField = require('../../../forms/components/build/form-field');
// @endif


var ArticleNew = React.createClass({
  getInitialState: function () {
    return {};
  },

  render: function() {
    var articleForm = this.state.articleForm ? this.state.articleForm : this.props.articleForm;

    var fields = _.map(articleForm, function (field, i) {
      return <FormField key={i} field_info={field} />
    });

    return (
      <div className='col-sm-6 col-sm-offset-3'>
        <form method='post'>
          {fields}
        </form>
      </div>
    );
  },
});

// @ifdef IS_NODE
module.exports = ArticleNew;
// @endif