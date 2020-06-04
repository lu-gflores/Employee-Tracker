const inquirer = require('inquirer');
const mysql = require('mysql');

const mainPrompt = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: 'userChoice',
            choices: [
                "View all employees",
                "View all employees by department",
                "View all Employees by Manager",
                "Add Employee",
                "Add Emloyee Role",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role"
            ]
        }
    ]).then(function(answer) {
        
    })
}
mainPrompt();

