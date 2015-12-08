// @ifdef IS_NODE
'use strict';

var React     = require('react'),
    _         = require('lodash');
// @endif


var ArticleIndex = React.createClass({
  getInitialState: function () {
    return {};
  },

  renderArticle: function (article, key) {
    return <p key={key}>{article.title}</p>
  },

  render: function() {
    var list = this.state.list ? this.state.list : this.props.list;

    var articles = _.map(list.data, this.renderArticle);

    return (
      <div className='col-sm-12'>
        <h1>List of Articles:</h1>
        {articles}
      </div>
    );
  },
});

// @ifdef IS_NODE
module.exports = ArticleIndex;
// @endif