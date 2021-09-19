const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }
  getAllEmployees() {
    return this.connection.query("SELECT * FROM employee");
  }
  getAllManagers() {
    return this.connection.query("SELECT * FROM employee WHERE role_id = 1");
  }
  getAllRoles() {
    return this.connection.query("SELECT * FROM role");
  }
  getAllDepartments() {
    return this.connection.query("SELECT * FROM department");
  }

  insertEmployee(first_name, last_name, role_id, manager_id) {
    return this.connection.query("INSERT INTO employee SET ?", {
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id,
    });
  }
  insertRole(title, salary, department_id) {
    return this.connection.query("INSERT INTO role SET ?", {
      title: title,
      salary: salary,
      department_id: department_id,
    });
  }
  insertDepartment(name) {
    return this.connection.query("INSERT INTO department SET ?", {
            name: name
        });
    }
}

module.exports = new DB(connection);
