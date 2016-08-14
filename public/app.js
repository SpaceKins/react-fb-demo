const Comment = React.createClass({
  rawMarkup:function(){
    var md= new Remarkable();
    var rawMarkup =md.render(this.props.children.toString());
    return {__html:rawMarkup};
  },

  render: function() {
    var md= new Remarkable();
    
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {md.render(this.props.author.toString())}

        </h2>
        <span 
            dangerouslySetInnerHTML={this.rawMarkup()}
            />
      </div>
    );
  }
});


const CommentList = React.createClass({
 render: function() {
   const commentNodes = this.props.data.map(function (comment) {
     return (
       <Comment
         author="Peter Piper"
       >
         ***Wow***, _so_awesome!
         coollllllll butterscotch!
         <Comment
           author="Peter Piper"
         >
           I am I am sam My man
         </Comment>
       </Comment>
     );
   })
   return (
     <div className="commentList">
       { commentNodes }
     </div>
   );
 }
});

const CommentList2 = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="test">***Hello***</Comment>
        <Comment author="test">I know right!</Comment>
        <Comment author="test">## I know right!</Comment>
      </div>
    );
  }
});

const CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
          Comment Form
      </div>
    );
  }
});

const data=[{  // Fix  //
  author:"tester",
  test: "tester"
},
{
  author:"test2",
  test: "test2"
}]

const CommentBox=React.createClass({
  render: function(){
    return (
        <div className="commentBox">
               <CommentList data={this.props.data}/>
               <CommentForm />         
      </div>
      );
  }
});



ReactDOM.render(
  <CommentBox />,
  document.getElementById('app')
  );
