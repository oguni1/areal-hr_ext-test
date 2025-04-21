const express = require('express');
const { Organization, Role, Department} = require('./models');

const router = express.Router();

router.get('/organizations', async (req, res) => {
    try {
        const organizations = await Organization.getAll();
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/organizations/:id', async (req, res) => {
    try {
        const organization = await Organization.getById(req.params.id);
        if (!organization) return res.status(404).json({ error: 'Organization not found' });
        res.json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/organizations', async (req, res) => {
    try {
        const newOrganization = await Organization.create(req.body);
        res.status(201).json(newOrganization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/organizations/:id', async (req, res) => {
    try {
        const updatedOrganization = await Organization.update(req.params.id, req.body);
        if (!updatedOrganization) return res.status(404).json({ error: 'Organization not found' });
        res.json(updatedOrganization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/organizations/:id', async (req, res) => {
    try {
        await Organization.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






router.get('/roles', async (req, res) => {
    try {
        const roles = await Role.getAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/roles/:id', async (req, res) => {
    try {
        const Role = await Role.getById(req.params.id);
        if (!Role) return res.status(404).json({ error: 'Role not found' });
        res.json(Role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/roles', async (req, res) => {
    try {
        const newRole = await Role.create(req.body);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/roles/:id', async (req, res) => {
    try {
        const updatedRole = await Role.update(req.params.id, req.body);
        if (!updatedRole) return res.status(404).json({ error: 'Role not found' });
        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/roles/:id', async (req, res) => {
    try {
        await Role.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});








router.get('/departments', async (req, res) => {
    try {
        const departments = await Department.getAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/departments/:id', async (req, res) => {
    try {
        const Department = await Department.getById(req.params.id);
        if (!Department) return res.status(404).json({ error: 'Department not found' });
        res.json(Department);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/departments', async (req, res) => {
    try {
        const newDepartment = await Department.create(req.body);
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/departments/:id', async (req, res) => {
    try {
        const updatedDepartment = await Department.update(req.params.id, req.body);
        if (!updatedDepartment) return res.status(404).json({ error: 'Department not found' });
        res.json(updatedDepartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/departments/:id', async (req, res) => {
    try {
        await Department.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;