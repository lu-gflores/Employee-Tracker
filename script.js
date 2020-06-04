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
        if(answer.userChoice === "View all employees"){
            selectAll();
        } else if (answer.userChoice === "View all employees by department") {
            
        }
    })
}

const selectAll = () => {
    connection.query("SELECT * FROM employee", (err, result) => {
        if (err) throw err;
        console.table(result);
    })
}
