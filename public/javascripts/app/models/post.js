App.Models.Post = Backbone.Model.extend({
  url: function(){
    return "/posts/" + this.id;
  },

  initialize: function() {
    this.comments = new App.Collections.Comments(this.get("last_three_comments"));

    this.likes = new App.Collections.Likes(this.get("user_like")); // load in the user like initially
    this.likes.url = '/posts/' + this.id + '/likes';
  },

  createdAt: function(){
    return +new Date(this.get("created_at")) / 1000;
  }
});
