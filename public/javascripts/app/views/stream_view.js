App.Views.Stream = Backbone.View.extend({
  events: {
    "click #paginate": "render"
  },

  initialize: function() {
    this.collection = this.collection || new App.Collections.Stream;
    this.collection.bind("add", this.appendPost, this);

    return this;
  },

  appendPost: function(post) {
    var postView = new App.Views.Post({ model: post });
    $(this.el).append(postView.render().el);
  },

  collectionFetched: function() {
    this.$("#paginate").remove();
    $(this.el).append($("<a>", {
      href: this.collection.url(),
      id: "paginate"
    }).text('Load more posts'));
  },

  render : function(evt) {
    if(evt) { evt.preventDefault(); }

    var self = this;
    self.addLoader();
    self.collection.fetch({
      add: true,
      success: $.proxy(this.collectionFetched, self)
    });

    return this;
  },

  addLoader: function(){
    if(this.$("#paginate").length == 0) {
      $(this.el).append($("<div>", {
        "id" : "paginate"
      }));
    }

    this.$("#paginate").html($("<img>", {
      src : "/images/static-loader.png",
      "class" : "loader"
    }));
  }
});
