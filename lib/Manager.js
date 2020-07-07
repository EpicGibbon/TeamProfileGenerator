// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, email, id, officeNum) {
        super(name, email, id);
        this.officeNum = officeNum;
    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNum;
    }
}

module.exports = Manager;