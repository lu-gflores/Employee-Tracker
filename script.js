const inquirer = require('inquirer');
const mysql = require('mysql');

//connection 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_manager_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connect as id " + connection.threadId);
    mainPrompt();
})

//inquirer
const mainPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: 'userChoice',
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Add Employee",
                "Add Emloyee Role",
                "Add Employee Department",
                "Remove Employee",
                "Update Employee Role"
            ]
        }]).then(function (answer) {
        if (answer.userChoice === "View all employees") {
            selectAllEmployees();
        } else if (answer.userChoice === "View all roles") {
            selectAllRoles();
        } else if (answer.userChoice === "View all departments") {
            selectAllDepartments();
        } else if (answer.userChoice === "Add Employee") {
            addEmployee();
        }
    });
}
//Select all queries
const selectAllEmployees = () => {
    connection.query("SELECT * FROM employee", (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    mainPrompt();
}
const selectAllRoles = () => {
    connection.query("SELECT * FROM role", (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    mainPrompt();
}
const selectAllDepartments = () => {
    connection.query("SELECT * FROM department", (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    mainPrompt();
}
//adding items to tables
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter Employee's first name",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter Employee's last name",
            name: "lastName"
        }
    ]).then(function (answer) {
        let query = connection.query(
            "INSERT INTO employee SET first_name=?, last_name=?",
            [answer.firstName, answer.lastName],
            function(err, result) {
                if(err) throw err;
                console.log(result.affectedRows + " added as employee\n");
                mainPrompt();
            }
        )
    })
    
}