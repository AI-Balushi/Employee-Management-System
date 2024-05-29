import inquirer from 'inquirer';
import chalk from 'chalk';
// Function to print the header
function printHeader() {
    const lineLength = 50; // Adjustable line length
    const line = '-'.repeat(lineLength);
    const text = 'Code with Abdul Waheed';
    const paddedText = text.padStart((lineLength + text.length) / 2).padEnd(lineLength);
    console.log(chalk.yellow.bold(line));
    console.log(chalk.yellow.bold(paddedText));
    console.log(chalk.yellow.bold(line));
}
// Print the header
printHeader();
// Variable Initialization
let colectionOfEmployee = [];
// Array of Employee
let employeeList = [
    {
        employeeId: 1011,
        employeeName: 'Abdul Waheed',
        salary: 45000,
    },
    {
        employeeId: 1012,
        employeeName: 'Muhammad Amin',
        salary: 35000,
    },
    {
        employeeId: 1013,
        employeeName: 'Shariya Gul',
        salary: 55000,
    }
];
// Add Employees to Employee Database
for (let i = 0; i < employeeList.length; i++) {
    colectionOfEmployee.push(employeeList[i]);
}
// Function to add a new employee
async function addEmployee() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter Employee ID:', validate: (input) => !isNaN(parseInt(input)) },
        { type: 'input', name: 'employeeName', message: 'Enter Employee Name:' },
        { type: 'input', name: 'salary', message: 'Enter Employee Salary:', validate: (input) => !isNaN(parseFloat(input)) }
    ]);
    const newEmployee = {
        employeeId: parseInt(answers.employeeId),
        employeeName: answers.employeeName,
        salary: parseFloat(answers.salary)
    };
    colectionOfEmployee.push(newEmployee);
    console.log('Employee added successfully!');
}
// Function to update an employee
async function updateEmployee() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter Employee ID to update:', validate: (input) => !isNaN(parseInt(input)) },
        { type: 'list', name: 'key', message: 'Choose the field to update:', choices: ['employeeName', 'salary'] },
        { type: 'input', name: 'value', message: 'Enter the new value:' }
    ]);
    const employeeId = parseInt(answers.employeeId);
    const key = answers.key;
    const value = key === 'salary' ? parseFloat(answers.value) : answers.value;
    const employeeIndex = colectionOfEmployee.findIndex(employee => employee.employeeId === employeeId);
    if (employeeIndex !== -1) {
        colectionOfEmployee[employeeIndex][key] = value;
        console.log('Employee updated successfully!');
    }
    else {
        console.log('Employee not found.');
    }
}
// Function to delete an employee
async function deleteEmployee() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter Employee ID to delete:', validate: (input) => !isNaN(parseInt(input)) }
    ]);
    const employeeId = parseInt(answers.employeeId);
    const employeeIndex = colectionOfEmployee.findIndex(employee => employee.employeeId === employeeId);
    if (employeeIndex !== -1) {
        colectionOfEmployee.splice(employeeIndex, 1);
        console.log('Employee deleted successfully!');
    }
    else {
        console.log('Employee not found.');
    }
}
// Main function to show the menu and handle user input
async function mainMenu() {
    while (true) {
        const answers = await inquirer.prompt([
            { type: 'list', name: 'action', message: 'Choose an action:', choices: ['Add Employee', 'Update Employee', 'Delete Employee', 'View Employees', 'Exit'] }
        ]);
        switch (answers.action) {
            case 'Add Employee':
                await addEmployee();
                break;
            case 'Update Employee':
                await updateEmployee();
                break;
            case 'Delete Employee':
                await deleteEmployee();
                break;
            case 'View Employees':
                console.log(colectionOfEmployee);
                break;
            case 'Exit':
                return;
        }
    }
}
// Start the program
mainMenu();
