const db = require("../models");
const Cat = db.cat;

// Create and Save a new Cat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.titlec) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a Cat
    const cat = new Cat({
        titlec: req.body.titlec,
        img: req.body.img,
    });

    // Save Cat in the database
    cat
        .save(cat)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the cat."
            });
        });
};

// Retrieve all Cats from the database.
exports.findAll = (req, res) => {
    const titlec = req.query.titlec;
    var condition = titlec ? {titlec: {$regex: new RegExp(titlec), $options: "i"}} : {};

    Cat.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cats."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cat.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Cat with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Cat with id=" + id});
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Cat.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Cat with id=${id}. Maybe Cat was not found!`
                });
            } else res.send({message: "Cat was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Cat with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Cat.findByIdAndRemove(id, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Cat with id=${id}. Maybe Cat was not found!`
                });
            } else {
                res.send({
                    message: "Cat was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Cat with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Cat.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Cats were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all cats."
            });
        });
};

// Find all published Tutorials
exports.findAllDone = (req, res) => {
    Cat.find({done: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Cats."
            });
        });
};