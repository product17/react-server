var isNode = typeof module !== 'undefined' && module.exports,
    React = isNode ? require('react') : window.React,
    ReactDOM = isNode ? require('react') : window.ReactDOM;

var ArticleContent = React.createClass({
    getInitialState: function () {
        return {};
    },

    useHtml: function (html) {
      return {__html: html};
    },

    render: function() {
        var article = this.state.article ? this.state.article : this.props.article;

        return (
          <div className='col-sm-12'>
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={this.useHtml(article.body)}></div>
          </div>
        );
    },
});

if (isNode) {
    exports.ArticleContent = ArticleContent;
} else {
    ReactDOM.render(<ArticleContent article={client_data} />, document.getElementById('react-root'));
}
