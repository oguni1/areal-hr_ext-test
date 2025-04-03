const db = require("../models");
const Organization = db.organizations;
const Op = db.Sequelize.Op;

// Create and Save a new Organization
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const organization = {
    name: req.body.name,
    comment: req.body.comment,
  };

  // Save Organization in the database
  Organization.create(organization)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Organization."
      });
    });
};

// Retrieve all Organizations from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Organization.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organizations."
      });
    });
};

// Find a single Organization with an id
exports.findOne = (req, res) => {
  const organization_id = req.params.organization_id;

  Organization.findByPk(organization_id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Organization with organization_id=${organization_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Organization with id=" + organization_id
      });
    });
};

// Update a Organization by the id in the request
exports.update = (req, res) => {
  const organization_id = req.params.organization_id;

  Organization.update(req.body, {
    where: { organization_id: organization_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Organization was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Organization with organization_id=${organization_id}. Maybe Organization was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Organization with id=" + organization_id
      });
    });
};

// Delete a Organization with the specified id in the request
exports.delete = (req, res) => {
  const organization_id = req.params.organization_id;

  Organization.destroy({
    where: { organization_id: organization_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Organization was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Organization with organization_id=${organization_id}. Maybe Organization was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Organization with id=" + organization_id
      });
    });
};

