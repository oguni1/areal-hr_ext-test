CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    comment TEXT
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER,
    department_id INTEGER,
    name VARCHAR(255),
    comment TEXT
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(255),
    first_name VARCHAR(255),
    patronym VARCHAR(255),
    birth_date DATE,
    passport INTEGER,
    registration INTEGER,
    scan INTEGER
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    path TEXT,
    employee_id INTEGER
);

CREATE TABLE passports (
    id SERIAL PRIMARY KEY,
    series VARCHAR(255),
    number VARCHAR(255),
    date DATE,
    code VARCHAR(255),
    issued_by VARCHAR(255)
);

CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    state VARCHAR(255),
    city VARCHAR(255),
    street VARCHAR(255),
    house INTEGER,
    building INTEGER,
    apartment INTEGER
);

CREATE TABLE operation_history (
    id SERIAL PRIMARY KEY,
    changed_by INTEGER,
    object_entity CHAR(50),
    obj_entity_id INTEGER,
    changed_fields TEXT,
    type TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    surname VARCHAR(255),
    name VARCHAR(255),
    patronym VARCHAR(255),
    login VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
); 