const Comment = React.createClass({
 rawMarkup: function() {
   var md = new Remarkable();
   const rawMarkup = md.render(this.props.children.toString());
   return { __html: rawMarkup };
 },
 render: function() {
   var md = new Remarkable();
   return (
     <div className="comment">
       <h2 className="commentAuthor">
         { md.render(this.props.author.toString()) }
       </h2>
       <span
        dangerouslySetInnerHTML={ this.rawMarkup() }
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

const CommentForm = React.createClass({
 render: function() {
   return (
     <div className="commentForm">
       Hello, world! I am a CommentForm.
     </div>
   );
 }
});

const data = [
 {
   author: "Christie",
   text: "***Wow***, _so_awesome!"
 },
 {
   author: "My Brother",
   text: "Yasss!"
 },
]

const CommentBox = React.createClass({
 render: function() {
   return (
     <div className="commentBox">
       <h1>Comments</h1>
       <CommentList
         data={data}
       />
       <CommentForm />
     </div>
   );
 }
});

ReactDOM.render(
 <CommentBox />,
 document.getElementById('app')
);
