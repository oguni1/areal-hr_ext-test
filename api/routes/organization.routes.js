module.exports = app => {
  const organizations = require("../controllers/organization.controller.js");

  var router = require("express").Router();

  // Create a new organization
  router.post("/", organizations.create);

  // Fetch all organizations
  router.get("/", organizations.findAll);

  // Fetch a single organization by id
  router.get("/:id", organizations.findOne);

  // Update organization by id
  router.put("/:id", organizations.update);

  // Delete organization by id
  router.delete("/:id", organizations.delete);


  app.use("/api/organizations", router);
};