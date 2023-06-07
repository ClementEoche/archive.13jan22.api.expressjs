module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        weight: String,
        size: String,
        power: String,
        impactsize: String,
        dateOfRelease: String,
        country:String,
        shippingTime: String,
        price: Number,
        quantity:Number,
        description:String,
        subcatId: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Product = mongoose.model("product", schema);
    return Product;
  };
  