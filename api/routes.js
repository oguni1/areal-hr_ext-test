const express = require('express');
const { Organization, Role, Department, Employee, File, Passport, Registration, OperationHistory, Users } = require('./models');

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
        const updatedOrganization = await Organization.update({ ...req.body, id: req.params.id });
        if (!updatedOrganization) {
            const organization = await Organization.getById(req.params.id);
            if (!organization) {
                return res.status(404).json({ error: 'Organization not found' });
            }
            return res.json(organization);
        }
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
        const updatedRole = await Role.update({ ...req.body, id: req.params.id });
        if (!updatedRole) {
            const role = await Role.getById(req.params.id);
            if (!role) {
                return res.status(404).json({ error: 'Role not found' });
            }
            return res.json(role);
        }
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
        const updatedDepartment = await Department.update({ ...req.body, id: req.params.id });
        if (!updatedDepartment) {
            const department = await Department.getById(req.params.id);
            if (!department) {
                return res.status(404).json({ error: 'Department not found' });
            }
            return res.json(department);
        }
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

router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.getAll()
    res.json(employees)
  } catch (error) {
    console.error('Error fetching employees:', error)
    res.status(500).json({ message: 'Error fetching employees' })
  }
})

router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.getById(req.params.id)
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }
    res.json(employee)
  } catch (error) {
    console.error('Error fetching employee:', error)
    res.status(500).json({ message: 'Error fetching employee' })
  }
})

router.post('/employees', async (req, res) => {
  try {
    const employee = await Employee.create(req.body)
    res.status(201).json(employee)
  } catch (error) {
    console.error('Error creating employee:', error)
    res.status(500).json({ message: 'Error creating employee' })
  }
})

router.put('/employees/:id', async (req, res) => {
  try {
    const existingEmployee = await Employee.getById(req.params.id)
    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' })
    }

    const employee = await Employee.update(req.params.id, req.body)
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }
    res.json(employee)
  } catch (error) {
    console.error('Error updating employee:', error)
    res.status(500).json({ message: 'Error updating employee' })
  }
})

router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.delete(req.params.id)
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' })
    }
    res.json(employee)
  } catch (error) {
    console.error('Error deleting employee:', error)
    res.status(500).json({ message: 'Error deleting employee' })
  }
})

router.get('/files', async (req, res) => {
  try {
    const files = await File.getAll()
    res.json(files)
  } catch (error) {
    console.error('Error fetching files:', error)
    res.status(500).json({ message: 'Error fetching files' })
  }
})

router.get('/files/:id', async (req, res) => {
  try {
    const file = await File.getById(req.params.id)
    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }
    res.json(file)
  } catch (error) {
    console.error('Error fetching file:', error)
    res.status(500).json({ message: 'Error fetching file' })
  }
})

router.post('/files', async (req, res) => {
  try {
    const file = await File.create(req.body)
    res.status(201).json(file)
  } catch (error) {
    console.error('Error creating file:', error)
    res.status(500).json({ message: 'Error creating file' })
  }
})

router.put('/files/:id', async (req, res) => {
  try {
    const existingFile = await File.getById(req.params.id)
    if (!existingFile) {
      return res.status(404).json({ message: 'File not found' })
    }

    const file = await File.update(req.params.id, req.body)
    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }
    res.json(file)
  } catch (error) {
    console.error('Error updating file:', error)
    res.status(500).json({ message: 'Error updating file' })
  }
})

router.delete('/files/:id', async (req, res) => {
  try {
    const file = await File.delete(req.params.id)
    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }
    res.json(file)
  } catch (error) {
    console.error('Error deleting file:', error)
    res.status(500).json({ message: 'Error deleting file' })
  }
})

router.get('/passports', async (req, res) => {
  try {
    const passports = await Passport.getAll()
    res.json(passports)
  } catch (error) {
    console.error('Error fetching passports:', error)
    res.status(500).json({ message: 'Error fetching passports' })
  }
})

router.get('/passports/:id', async (req, res) => {
  try {
    const passport = await Passport.getById(req.params.id)
    if (!passport) {
      return res.status(404).json({ message: 'Passport not found' })
    }
    res.json(passport)
  } catch (error) {
    console.error('Error fetching passport:', error)
    res.status(500).json({ message: 'Error fetching passport' })
  }
})

router.post('/passports', async (req, res) => {
  try {
    const passport = await Passport.create(req.body)
    res.status(201).json(passport)
  } catch (error) {
    console.error('Error creating passport:', error)
    res.status(500).json({ message: 'Error creating passport' })
  }
})

router.put('/passports/:id', async (req, res) => {
  try {
    const existingPassport = await Passport.getById(req.params.id)
    if (!existingPassport) {
      return res.status(404).json({ message: 'Passport not found' })
    }

    const passport = await Passport.update(req.params.id, req.body)
    if (!passport) {
      return res.status(404).json({ message: 'Passport not found' })
    }
    res.json(passport)
  } catch (error) {
    console.error('Error updating passport:', error)
    res.status(500).json({ message: 'Error updating passport' })
  }
})

router.delete('/passports/:id', async (req, res) => {
  try {
    const passport = await Passport.delete(req.params.id)
    if (!passport) {
      return res.status(404).json({ message: 'Passport not found' })
    }
    res.json(passport)
  } catch (error) {
    console.error('Error deleting passport:', error)
    res.status(500).json({ message: 'Error deleting passport' })
  }
})

router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.getAll()
    res.json(registrations)
  } catch (error) {
    console.error('Error fetching registrations:', error)
    res.status(500).json({ error: 'Error fetching registrations' })
  }
})

router.get('/registrations/:id', async (req, res) => {
  try {
    const registration = await Registration.getById(req.params.id)
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' })
    }
    res.json(registration)
  } catch (error) {
    console.error('Error fetching registration:', error)
    res.status(500).json({ error: 'Error fetching registration' })
  }
})

router.post('/registrations', async (req, res) => {
  try {
    const registration = await Registration.create(req.body)
    res.status(201).json(registration)
  } catch (error) {
    console.error('Error creating registration:', error)
    res.status(500).json({ error: 'Error creating registration' })
  }
})

router.put('/registrations/:id', async (req, res) => {
  try {
    const existingRegistration = await Registration.getById(req.params.id)
    if (!existingRegistration) {
      return res.status(404).json({ error: 'Registration not found' })
    }
    const registration = await Registration.update(req.params.id, req.body)
    res.json(registration)
  } catch (error) {
    console.error('Error updating registration:', error)
    res.status(500).json({ error: 'Error updating registration' })
  }
})

router.delete('/registrations/:id', async (req, res) => {
  try {
    const existingRegistration = await Registration.getById(req.params.id)
    if (!existingRegistration) {
      return res.status(404).json({ error: 'Registration not found' })
    }
    await Registration.delete(req.params.id)
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting registration:', error)
    res.status(500).json({ error: 'Error deleting registration' })
  }
})

router.get('/operation-history', async (req, res) => {
  try {
    const history = await OperationHistory.getAll()
    res.json(history)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operation history' })
  }
})

router.get('/operation-history/:id', async (req, res) => {
  try {
    const history = await OperationHistory.getById(req.params.id)
    if (!history) {
      return res.status(404).json({ message: 'Operation history not found' })
    }
    res.json(history)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching operation history' })
  }
})

router.post('/operation-history', async (req, res) => {
  try {
    const history = await OperationHistory.create(req.body)
    res.status(201).json(history)
  } catch (error) {
    res.status(500).json({ message: 'Error creating operation history' })
  }
})

router.put('/operation-history/:id', async (req, res) => {
  try {
    const history = await OperationHistory.update(req.params.id, req.body)
    if (!history) {
      return res.status(404).json({ message: 'Operation history not found' })
    }
    res.json(history)
  } catch (error) {
    res.status(500).json({ message: 'Error updating operation history' })
  }
})

router.delete('/operation-history/:id', async (req, res) => {
  try {
    const history = await OperationHistory.delete(req.params.id)
    if (!history) {
      return res.status(404).json({ message: 'Operation history not found' })
    }
    res.json({ message: 'Operation history deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting operation history' })
  }
})

router.get('/users', async (req, res) => {
    try {
        const users = await Users.getAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await Users.getById(req.params.id)
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/users', async (req, res) => {
    try {
        const user = await Users.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.put('/users/:id', async (req, res) => {
    try {
        const user = await Users.update(req.params.id, req.body)
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await Users.delete(req.params.id)
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;