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
});
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
                "Add Employee Role",
                "Add Employee Department",
                "Remove Employee",
                "Update Employee Role",
                "Exit"
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
            } else if (answer.userChoice === "Add Employee Role") {
                addRole();
            } else if (answer.userChoice === "Add Employee Department") {
                addDept();
            } else if (answer.userChoice === "Update Employee Role") {
                updateEmployeeRole();
            } else if(answer.userChoice === 'Remove Employee') {
                removeEmployee(0);
            }
            
            else {
                connection.end();
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
            function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " added as employee\n");
                mainPrompt();
            }
        )
    })
}
const addRole = () => {
    //store departments to display as choices
    let deptArray = [];
    //retrieving departments name to push into array
    connection.query(
        "SELECT * FROM department", function (err, result) {
            if (err) throw err;
            for (let i = 0; i < result.length; i++) {
                deptArray.push(result[i].name)
            }
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter Role: ",
                    name: "role"
                },
                {
                    type: "input",
                    message: "Enter role salary: ",
                    name: "salary"
                },
                {
                    type: 'list',
                    message: "Select department to add role to:",
                    name: "dept",
                    choices: deptArray
                }
            ]).then(function (answer) {
                let deptID;
                for (let n = 0; n < deptArray.length; n++) {
                    if (result[n].name == answer.dept) {
                        deptID = result[n].id;
                    }
                }
                let query = connection.query(
                    "INSERT INTO role SET title=?, salary=?, department_id=?",
                    [answer.role, answer.salary, answer.deptID],
                    function (err, result) {
                        if (err) throw err;
                        console.log(result.affectedRows + " added in roles\n");
                        mainPrompt();
                    }
                )
            })
        });
}
const addDept = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter Department Name: ",
            name: "deptName"
        },
    ]).then(function (answer) {
        let query = connection.query(
            "INSERT INTO department SET name=?",
            [answer.deptName],
            function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " added in department\n");
                mainPrompt();
            }
        )
    })
}
//update Employee roles
const updateEmployeeRole = () => {
    //need to get current employees and their roles
    //created array to store current employees to display in prompt so that user can select one

    //query employees to display in prompt
connection.query(
"SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you to like to update their role?",
            name: "updateRole",
            choices: function () {
                let currentEmployees = [];
                for (let i = 0; i < result.length; i++) {
                    currentEmployees.push(result[i].id + " " + result[i].first_name + " " + result[i].last_name)
                }
                return currentEmployees;
            }
        }, {
            type: "input",
            message: "Enter their new role: ",
            name: "newRole"
        }
    ]).then(function (answer) {
        let empId;
        for(let i = 0; i < result.length; i++) {
            if(result[i].id === answer.updateRole) {
                empId = result[i];
            }
        }
        connection.query(
            "UPDATE employee SET role_id=? WHERE id=?",
            [answer.newRole, empId],
            function (err, result) {
                if (err) throw err;
                console.table(result);
                mainPrompt();
            }
        )
    });
});
}
const removeEmployee = () => {
    connection.query("SELECT * FROM employee", function (err, result) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee would you like to remove?',
                name:'delEmployee',
                choices: function () {
                    let employeeArr = [];
                    for(let i = 0; i < result.length; i++) {
                        employeeArr.push(result[i].id + " " + result[i].first_name + " " + result[i].last_name)
                    }
                    return employeeArr;
                }
            }
        ]).then(function (answer) {
            let choice = parseInt(answer.delEmployee.split(" ")[0]);
            connection.query("DELETE FROM EMPLOYEE WHERE id=?",
            [choice], 
            function(err) {
                if (err) throw err;
                console.log(answer.delEmployee + " has been removed from database.")
                mainPrompt();
            }
            )
        })
    })
}