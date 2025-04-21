const express = require('express');
const { Organization, Role } = require('./models');

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
        const organizations = await Role.getAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/roles/:id', async (req, res) => {
    try {
        const role = await Role.getById(req.params.id);
        if (!role) return res.status(404).json({ error: 'Role not found' });
        res.json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;