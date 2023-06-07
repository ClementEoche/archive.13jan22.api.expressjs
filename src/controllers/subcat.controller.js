const db = require("../models");
const Subcat = db.subcat;

// Create and Save a new Subcat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.titlesc) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a Subcat
    const subcat = new Subcat({
        //done: req.body.done ? req.body.done : false
        titlesc: req.body.titlesc,
        catId:req.body.catId
    });

    // Save Subcat in the database
    subcat
        .save(subcat)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the subcat."
            });
        });
};

// Retrieve all Subcats from the database.
exports.findAll = (req, res) => {
    const titlesc = req.query.titlesc;
    var condition = titlesc ? {titlesc: {$regex: new RegExp(titlesc), $options: "i"}} : {};

    Subcat.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving subcats."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Subcat.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Subcat with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Subcat with id=" + id});
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

    Subcat.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Subcat with id=${id}. Maybe Subcat was not found!`
                });
            } else res.send({message: "Subcat was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Subcat with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Subcat.findByIdAndRemove(id, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Subcat with id=${id}. Maybe Subcat was not found!`
                });
            } else {
                res.send({
                    message: "Subcat was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Subcat with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Subcat.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Subcats were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all subcats."
            });
        });
};

// Find all published Tutorials
exports.findAllDone = (req, res) => {
    Subcat.find({done: true})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Subcats."
            });
        });
};