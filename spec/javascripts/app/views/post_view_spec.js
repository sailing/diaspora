describe("app.views.Post", function(){

  describe("#render", function(){
    beforeEach(function(){
      // should be jasmine helper
      window.current_user = app.user({name: "alice", avatar : {small : "http://avatar.com/photo.jpg"}});

      var posts = $.parseJSON(spec.readFixture("multi_stream_json"))["posts"][0];

      this.collection = new app.collections.Stream(posts);
      this.statusMessage = this.collection.models[0];
    })

    it("contains a '.like_action' link", function(){
      var view = new app.views.Post({model : this.statusMessage}).render();
      var statusElement = $(view.el);

      expect(statusElement.find(".like_action").html()).not.toBeNull();
    })

    context("NSFW", function(){
      it("contains a shield element", function(){
        this.statusMessage.set({text : "this is safe for work. #sfw"});

        var view = new app.views.Post({model : this.statusMessage}).render();
        var statusElement = $(view.el)

        expect(statusElement.find(".shield").html()).toBeNull();
      })

      it("does not contain a shield element", function(){
        this.statusMessage.set({text : "nudie magazine day! #nsfw"});

        var view = new app.views.Post({model : this.statusMessage}).render();
        var statusElement = $(view.el)

        expect(statusElement.find(".shield").html()).toNotBe(null);
      })
    })

    context("Reshare link", function(){
      it("is present if the post is public", function(){
        var view = new app.views.Post({model : this.statusMessage}).render();
        this.statusMessage.set({"public" : true});

        var statusElement = $(view.el)

        expect(statusElement.find(".reshare_action")).toNotBe(null);
      })

      it("is not present if the post is not public", function(){
        this.statusMessage.set({"public" : false});

        var view = new app.views.Post({model : this.statusMessage}).render();
        var statusElement = $(view.el)

        expect(statusElement.find(".reshare_action").html()).toBeNull();
      })
    })
  })
})
