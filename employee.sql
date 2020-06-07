DROP DATABASE IF EXISTS employee_manager_db;

CREATE DATABASE employee_manager_db;
USE employee_manager_db;

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
id INTEGER AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER,
manager_id INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employee(id)
);
-- Inserting data to tables
-- Department
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Engineering");

-- ROLE
INSERT INTO role (title, salary, department_id)
VALUES ("Engineering", 60000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales", 45000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Financing", 55000, 3);

-- Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leo", "Hope", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Smith", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Danielson", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Juan", "Lopez", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Poppins", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Sue", 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Wick", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Martha", "Stevens", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Donovan", "Love", 3, null);
select * from employee;