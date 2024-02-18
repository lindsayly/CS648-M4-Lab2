// CREATE AN ARRAY OF EMPLOYEES
var employees = [];
employees[0] = {id: 11111111, name: "Lindsay Ly", extension: 1111, email: "ly@gmail.com", department: "Executive"};
employees[1] = {id: 22222222, name: "Jake Denver", extension: 2222, email: "den@hotmail.com", department: "Engineering"};
employees[2] = {id: 33333333, name: "Mary Sue", extension: 3333, email: "sue@gmail.com", department: "Administrative"};
employees[3] = {id: 55555555, name: "John Doe", extension: 5555, email: "doe@yahoo.com", department: "Administrative"};
employees[4] = {id: 66666666, name: "Olivia Benson", extension: 6666, email: "benson@yahoo.com", department: "QA"};

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
window.addEventListener("load", (e) => {
    "use strict";
    if(localStorage.getItem("employee")) {
        employees = JSON.parse(localStorage.getItem("employee"));
    }
    buildGrid();
});

// GET DOM ELEMENTS
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
}
var form = $("addForm");
var empTable = $("empTable");
var id = $("id");
var name = $("name");
var extension = $("extension");
var email = $("email");
var department = $("department");
var empCount = $("empCount");

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    "use strict";
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    
    // GET THE VALUES FROM THE TEXT BOXES
    id = parseInt(id.value, 10);
    name = $("name").value;
    extension = parseInt(extension.value, 10);
    email = email.value;
    department = department.value;
    
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    var newEmp = {id: id, name: name, extension: extension, email: email, department: department};
    
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmp);
    
    // BUILD THE GRID
    buildGrid();
    
    // RESET THE FORM
    form.reset()
    
    // SET FOCUS BACK TO THE ID TEXT BOX
    $("id").focus();
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    "use strict";
    // CONFIRM THE DELETE
    var toDelete = window.confirm("Are you sure you want to delete this employee?");
    if (toDelete) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let i = e.target.parentNode.parentNode.rowIndex;
        
        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(i - 1, 1);
        
        // BUILD THE GRID
        buildGrid();
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    let tbody = empTable.tBodies[0];
    tbody.innerHTML = "";
    
    // REBUILD THE TBODY FROM SCRATCH
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let employee of employees) {
        let row = window.document.createElement("tr");
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.extension}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td><button>X</button></td>
        `;
        tbody.appendChild(row);        
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE

    // UPDATE EMPLOYEE COUNT
    empCount.textContent = "(" + employees.length + ")";
    
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem("employees", JSON.stringify(employees));
};