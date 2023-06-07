module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        titlesc: String,
        catId: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Subcat = mongoose.model("subcat", schema);
    return Subcat;
  };
  