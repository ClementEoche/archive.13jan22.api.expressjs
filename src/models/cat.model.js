module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      titlec: String,
      img: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Subcat = mongoose.model("cat", schema);
  return Subcat;
};
