const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("db");
const connection = require("./db/connection");
require("console.table");

//inquirer will go here

init();

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Tracker" }).render();

  console.log(logoText);

  loadMainPrompts();
}

async function loadMainPrompts() {
  const { choice } = await prompt({
    name: "choice",
    type: "list",
    message: "What can we help you with?",
    choices: ["VIEW", "ADD", "UPDATE", "EXIT"],
  });

  switch (choice) {
    case "VIEW":
      return loadViewPrompts();
    case "ADD":
      return addPrompts();
    case "UPDATE":
      return updatePrompts();
    case "EXIT":
      quit();
  }
}

async function addPrompts() {
  const { choice } = await prompt({
    name: "choice",
    type: "list",
    message: "Which would you like to add to?",
    choices: ["Employee", "Role", "Department", "EXIT"],
  });

  switch (choice) {
    case "Employee":
      return AddEmployee();
    case "Role":
      return addRole();
    case "Department":
      return addDepartment();
    case "EXIT":
      quit();
  }
}

async function addPrompts() {
  const { choice } = await prompt({
    name: "choice",
    type: "list",
    message: "Which would you like to add to?",
    choices: ["Employee", "Role", "Department", "EXIT"],
  });

  switch (choice) {
    case "Employee":
      return AddEmployee();
    case "Role":
      return addRole();
    case "Department":
      return addDepartment();
    case "EXIT":
      quit();
  }
}

async function updatePrompts() {
  const { choice } = await prompt({
    name: "choice",
    type: "list",
    message: "Which would you like to update?",
    choices: ["Employee", "Role", "EXIT"],
  });

  switch (choice) {
    case "Employee":
      return updateEmployee();
    case "Role":
      return UpdateRole();
    case "EXIT":
      quit();
  }
}

//Adding Functions
// ----------------------------------------------------------------------------------------------
async function AddEmployee() {
  const managers = await db.getAllManagers();
  const roles = await db.getAllRoles();
  let {
    employee_first_name,
    employee_last_name,
    employee_role,
    managerChoice,
  } = await prompt([
    {
      name: "employee_first_name",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "employee_last_name",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "employee_role",
      type: "rawlist",
      message: "What is their role?",
      choices: roles.map((role) => role.title),
    },
    {
      name: "managerChoice",
      type: "rawlist",
      message: "Who is their manager?",
      choices: managers.map(
        (manager) => manager.first_name + " " + manager.last_name
      ),
    },
  ]);

  console.log("employee Role : " + employee_role);

  let [chosenManager] = managers.filter(
    (manager) => manager.first_name + " " + manager.last_name == managerChoice
  );
  let [chosenRole] = roles.filter(
    (role) => role.title == employee_role
  );
  console.log(
    "Manager: " + chosenManager.first_name + " " + chosenManager.last_name
  );
  await db.insertEmployee(
    employee_first_name,
    employee_last_name,
    chosenRole.id,
    chosenManager.role_id
  );
  console.log(
    `${employee_first_name} ${employee_last_name} added to the database!`
  );
  loadMainPrompts();
}
// ----------------------------------------------------------------------------------------------
async function addRole() {
  const departments = await db.getAllDepartments();
  let { title, salary, departmentChoice } = await prompt([
    {
      name: "title",
      type: "input",
      message: "What is the job title?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary of this position?",
    },
    {
      name: "departmentChoice",
      type: "rawlist",
      message: "Which department is this job in?",
      choices: departments.map((departmentItem) => departmentItem.name),
    },
  ]);
  console.log(title);
  console.log(salary);
  console.log(departmentChoice);
  salary = parseInt(salary);
  let [chosenDepartment] = departments.filter(
    (department) => department.name === departmentChoice
  );

  // console.log(chosenDepartment);
  console.log("Department: " + chosenDepartment.id);
  await db.insertRole(title, salary, chosenDepartment.id);
  console.log(`${title} (${chosenDepartment.id}) added to the database!`);
  loadMainPrompts();
}
// ----------------------------------------------------------------------------------------------
async function addDepartment() {
  let { name } = await prompt([
    {
      name: "name",
      type: "input",
      message: "What would you like to update the name to?",
    },
  ]);
  console.log(name);
  await db.insertDepartment(name);
  console.log(`${name} has been added to the database!`);
  loadMainPrompts();
}
// ----------------------------------------------------------------------------------------------
async function updateEmployee() {
  const employees = await db.getAllEmployees();
  const roles = await db.getAllRoles();

  let { employeeName, roleChoice } = await prompt([
    {
      name: "employeeName",
      type: "rawlist",
      message: "Which employee do you want to update?",
      choices: employees.map(
        (employeeItem) => employeeItem.first_name + " " + employeeItem.last_name
      ),
    },
    {
      name: "roleChoice",
      type: "rawlist",
      message: "What is the employee's new role?",
      choices: roles.map((roleItem) => roleItem.title),
    },
  ]);
  console.log(employeeName);
  let [chosenEmployee] = employees.filter(
    (employee) =>
      employee.first_name + " " + employee.last_name === employeeName
  );
  let [chosenRole] = roles.filter((role) => role.title === roleChoice);
  console.log(chosenEmployee.first_name);


  connection.query(
    `UPDATE employee SET role_id=${chosenRole.id} WHERE employee.id = ${chosenEmployee.id}`,
    function (err, res) {
      if (err) {
        console.log(err);
      }
    }
  );

  loadMainPrompts();
}
// ----------------------------------------------------------------------------------------------
async function UpdateRole() {
  const employees = await db.getAllEmployees();
  const roles = await db.getAllRoles();

  let { roleChoice, title, salary } = await prompt([
    {
      name: "roleChoice",
      type: "rawlist",
      message: "What role would you like to update?",
      choices: roles.map((roleItem) => roleItem.title),
    },
    {
      name: "title",
      type: "input",
      message: "What is the new title?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the updated salary?"
    },
  ]);

  let [chosenRole] = roles.filter((role) => role.title === roleChoice);

  
  connection.query(
    `UPDATE role SET title = "${title}" WHERE role.id = ${chosenRole.id}`,
    function (err, res) {
      if (err) {
        console.log(err);
      }
    }
  );
  connection.query(
    `UPDATE role SET salary= ${salary} WHERE role.id = ${chosenRole.id}`,
    function (err, res) {
      if (err) {
        console.log(err);
      }
    }
  );

  loadMainPrompts();
}

// ----------------------------------------------------------------------------------------------
//changed this to connection.end
function quit() {
  console.log("Goodbye!");
  process.exit();
}

//Load Functions
// ----------------------------------------------------------------------------------------------
async function loadViewPrompts() {
  const { choice } = await prompt({
    name: "choice",
    type: "list",
    message: "Which would you like to view?",
    choices: ["Employees", "Roles", "Departments"],
  });
  switch (choice) {
    case "Employees":
      return showEmployee();
    case "Roles":
      return showRolls();
    case "Departments":
      return showDepartments();
    case "EXIT":
      quit();
  }
}
// ----------------------------------------------------------------------------------------------
async function showEmployee() {
  const employees = await db.getAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}
// ----------------------------------------------------------------------------------------------

async function showDepartments() {
  const departments = await db.getAllDepartments();

  console.log("\n");
  console.table(departments);

  loadMainPrompts();
}
// ----------------------------------------------------------------------------------------------
async function showRolls() {
  const roles = await db.getAllRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}
