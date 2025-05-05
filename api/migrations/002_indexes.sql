CREATE INDEX idx_organizations_name ON organizations(name);

CREATE INDEX idx_roles_name ON roles(name);

CREATE INDEX idx_departments_organization_id ON departments(organization_id);
CREATE INDEX idx_departments_name ON departments(name);

CREATE INDEX idx_employees_last_name ON employees(last_name);
CREATE INDEX idx_employees_first_name ON employees(first_name);
CREATE INDEX idx_employees_passport ON employees(passport);
CREATE INDEX idx_employees_registration ON employees(registration);

CREATE INDEX idx_files_employee_id ON files(employee_id);
CREATE INDEX idx_files_name ON files(name);

CREATE INDEX idx_passports_series_number ON passports(series, number);

CREATE INDEX idx_registrations_state_city ON registrations(state, city);

CREATE INDEX idx_operation_history_changed_by ON operation_history(changed_by);
CREATE INDEX idx_operation_history_object_entity ON operation_history(object_entity);
CREATE INDEX idx_operation_history_obj_entity_id ON operation_history(obj_entity_id);
CREATE INDEX idx_operation_history_type ON operation_history(type);

CREATE INDEX idx_users_login ON users(login);
CREATE INDEX idx_users_role ON users(role); 