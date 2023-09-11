const db = require("../models");
const {USER} = require("../config/db.config");
const User = db.users;
const Phone = db.phones;

// controller for creating users
exports.createUser = (req, res) => {
    // here we validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // here we create user
    const user = {
        name: req.body.name,
        title: req.body.title,
    };

    // here we save created user in the db
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

// controller for creating phone numbers
exports.createPhone = (req, res) => {
    // here we validate request
    if (!req.body.phone_number) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // here we create user
    const phone_number = {
        phone_number: req.body.phone_number,
        phone_type: req.body.phone_type,
        userId: req.body.userId
    };

    // here we save created user in the db
    Phone.create(phone_number)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the phone number."
            });
        });
};

// controller for get all users with associated phone numbers
exports.findAll = (req, res) => {
    User.findAll({ include: ["phones"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving phonebook."
            });
        });
};

// controller for updating information about entry in phonebook
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Entry was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update entry with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating entry with id=" + id
            });
        });
}

// here we define controller for deletion of the phonebook entry
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Entry was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete entry with id=${id}. Maybe this entry doesn't exist!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete entry with id=" + id
            });
        });
};

// here we define controller for getting a single entry from the phonebook
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {include: ["phones"]})
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find entry with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving entry with id=" + id
            });
        });
};

// here we define controller for deleting specified contact
exports.deleteContact = (req, res) => {
    const id = req.params.id;

    Phone.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contact was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete contact with id=${id}. Maybe this contact doesn't exist!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete contact with id=" + id
            });
        });
};