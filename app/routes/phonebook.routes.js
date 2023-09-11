module.exports = app => {
    const phonebook = require("../controllers/phonebook.controller");

    let router = require("express").Router();

    // here we define route for new user creation
    router.post("/create_user", phonebook.createUser);

    // here we define route for new phone number creation
    router.post("/create_phone", phonebook.createPhone)

    // here we define route for viewing our phonebook in a whole
    router.get("/", phonebook.findAll)

    // here we define route for updating entry in our phonebook
    router.put("/:id", phonebook.update)

    // here we define route for deleting entry from phonebook
    router.delete("/:id", phonebook.delete)

    // here we define route for getting a single entry from the phonebook
    router.get("/:id", phonebook.findOne)

    // here we define route for deleting a specified phone number
    router.delete('/contact/:id', phonebook.deleteContact)

    app.use('/api/phonebook', router);
};