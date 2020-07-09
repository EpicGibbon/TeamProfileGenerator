//These are the 3 subclasses outside of Employee
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//Packages/Dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//Redirects the created file from the CLI
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const { endianness } = require("os");
let manager = false;

//example of how its supposed to look
const emptyArray = [];

//Using the Inquirer package to prompt the and figure what type of user we're dealing with
function empList() {
    inquirer
        .prompt = ([
            {
                type: "list",
                message: "Which of the following would you like to add to your team?",
                name: "empList",
                choices: [
                    "Engineer",
                    "Manager",
                    "Intern"
                ]
            },
        ]).then((answers) => {
            if (answers.empList === "Manager") {
                if (manager === false) {
                    manager = true;
                    addMgr();
                } else {
                    console.log("It seems like you will require at least one Manager");
                    empList();
                }
            } else if (answers.empList === "Engineer") {
                addEngineer();
            } else if (answers.empList === "intern") {
                addIntern();
            }
            else {
                render(emptyArray)
                end();
            }
        });
}

function addMgr() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your manager's office number??",
                name: "officenum"
            },
            {
                type: "input",
                message: "What is your managers name?",
                name: "MgrName"
            },
            {
                type: "input",
                message: "What is your manager email?",
                name: "MgrEmail"
            },
            {
                type: "input",
                message: "What is your Manager ID?",
                name: "MgrID"
            }
        ])
        .then((answers) => {
            const mgr = new Manager(answers.officenum, answers.MgrName, answers.MgrEmail, answers.MgrID)
            emptyArray.push(mgr);
            empList();
        })
}

function addIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Where did your Intern go to school??",
                name: "intschool"
            },
            {
                type: "input",
                message: "What is your Intern's name?",
                name: "intName"
            },
            {
                type: "input",
                message: "What is your Intern's email?",
                name: "intEmail"
            },
            {
                type: "input",
                message: "What is your Intern's ID?",
                name: "intID"
            }
        ])
        .then((answers) => {
            const int = new Intern(answer.intschool, answers.intName, answers.intEmail, answer.intID)
            emptyArray.push(int);
            empList();
        })
}

function addEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your Engineer's Github???",
                name: "engGit"
            },
            {
                type: "input",
                message: "What is your Engineer's name?",
                name: "engName"
            },
            {
                type: "input",
                message: "What is your Engineer's email?",
                name: "engEmail"
            },
            {
                type: "input",
                message: "What is your Engineer's ID?",
                name: "engID"
            }
        ])
        .then((answers) => {
            const eng = new Engineer(answers.engGit, answers.engName, answers.engEmail, answers.engID)
            emptyArray.push(eng);
            empList();
        }
        )
}
const HTML = render(emptyArray);

fs.writeFile(outputPath, HTML, (err) => {
    console.log(`You've successfully created the employee summary file!`);
    if (err) {
        return err;
    }
});


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
