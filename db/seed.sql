use employeeTracker;
INSERT INTO department (name) VALUES ("Managment");
INSERT INTO department (name) VALUES ("Property");
INSERT INTO department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Manager", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("Document Review Specialist", 35000, 2);
INSERT into role (title, salary, department_id) VALUES ("Claims Admin", 40000, 2);
INSERT into role (title, salary, department_id) VALUES ("HR Rep", 40000, 3)	;

-- Auto Department
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Adam", "Allen", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Everrett", "e", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("April", "lay", 3, 1);

-- Property Department
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Earhart", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Diana", "Miller", 2, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Terri", "Fort", 3, 2);


-- HR Department
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kawsar", "Chaudry", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Gus", "Ceja", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Josh", "Heaston", 4, 3);