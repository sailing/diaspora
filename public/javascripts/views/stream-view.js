$(function() {
  window.StreamView = Backbone.View.extend({

    el: $("#main_stream"),

    template: _.template($('#stream-element-template').html()),

    events: {
      "click #paginate": "loadMore"
    },

    initialize: function(){
      _.bindAll(this, "appendPost", "collectionFetched");

      this.collection = new window.BackboneStream;
      this.collection.bind("add", this.appendPost);
      this.loadMore();
    },

    appendPost: function(model) {
      $(this.el).append(this.template(model.toJSON()));
    },

    collectionFetched: function() {
      this.$(".details time").timeago();

      this.$("#paginate").remove();
      $(this.el).append($("<a>", {
        href: this.collection.url(),
        id: "paginate"
      }).text('more'));
    },

    loadMore: function(evt) {
      if(evt) {
        evt.preventDefault();
      }

      this.collection.fetch({
        add: true,
        success: this.collectionFetched
      });
    }
  });

  if(window.useBackbone) {
    window.stream = new window.StreamView;
  }
});
