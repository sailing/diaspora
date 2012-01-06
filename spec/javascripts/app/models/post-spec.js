describe("app.models.Post", function() {
  describe("createdAt", function() {
    var post = new app.models.Post();
    it("returns the post's created_at as an integer", function() {
      var date = new Date;
      post.set({ created_at: +date * 1000 });

      expect(typeof post.createdAt()).toEqual("number");
      expect(post.createdAt()).toEqual(+date);
    });
  });
});
