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
       <h1>
        { /* md.render(this.props.hobby.toString()) */}
       </h1>
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
       <Comment author={comment.author} key={comment.author} hobby={comment.hobby}>
                 {comment.text}
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
  getInitialState() {
      return {
          author:'',
          text:''  
      };
  },
    handleTextChange:function(e){
    this.setState({
      text:e.target.value
    });
  },
  handleAuthorChange:function(e){
    this.setState({
      author:e.target.value
    });
  },
  handleSubmit:function(e){
    e.preventDefault();
    let author = this.state.author.trim();
    let text= this.state.text.trim();

    if(!text || !author){
      return;
    }

    this.props.onCommentSubmit({author:author, text:text});
    this.setState({author:'',text:''});
  },
 render: function() {

   return (
     <form className="commentForm" onSubmit={this.handleSubmit} >
       <input type="text" 
        placeholder="enter name" 
        value={this.state.text} 
        onChange={this.handleTextChange}
        />
       <input type="text" placeholder="Say something " value={this.state.author} 
        onChange={this.handleAuthorChange} 
        />
       <input type="submit" value="Post" />
       <h1>{this.state.author}</h1>
       <h1>{this.state.text}</h1>
     </form>
   );
 }
});

const data = [
 {
   author: "Hi Ho",
   text: "***Wow***, _so_awesome!",
   hobby: "Test"
 },
 {
   author: "My Brother",
   text: "Yasss!",
   hobby: "Run"
 },
]

const CommentBox = React.createClass({
  loadCommentsFromServer: function(){
        $.ajax({url:this.props.url,
          dataType: 'json',
         cache: false,
         success: function(data){
          this.setState({data:data});  // key data is from getInitialState key data
         }.bind(this),
         error: function(xhr, status,err){
          console.error(this.props.url,status, err.toString());
         }.bind(this)
       })
  },
  handleCommentSubmit:function(comment){
    $.ajax({
      //url:this.props.url,
     // host:"10.0.1.14:3000",
      url:this.props.url, //"10.0.1.14:3000"
      dataType: 'json',
      type:"Post",
      data:comment,
      sucess:function(data){
        this.setState({data:data});
      }.bind(this),
      error:function(xhr,status,err){
        console.error(this.props.url,status,err.toString());
      }.bind(this)
    })
  },
  getInitialState: function() {
      return {
            data:[]
      };
  },
  componentDidMount:function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer,this.props.pollInterval);
  },
 render: function() {
   return (
     <div className="commentBox">
       <h1>Comments</h1>
       <CommentList
         data={this.state.data}
       />
       <CommentForm data={this.props.data} onCommentSubmit={this.handleCommentSubmit}/>
     </div>
   );
 }
});

ReactDOM.render(  //  Can only be one element  this is the main container
 <CommentBox url="/api/comments"  pollInterval="2000" />,  //data={data} url="/api/comments"
 document.getElementById('app')
);
