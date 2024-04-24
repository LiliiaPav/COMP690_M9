import init from "./modules/init.js";

// GET DOM ELEMENTS
let empTable = document.querySelector("#employees");
let empCount = document.querySelector("#empCount");

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid(init);

// DELETE EMPLOYEE
empTable.addEventListener("click", (e) => {
  let updated = document.querySelector("#empCount").value;
  console.log(updated.slice(0, 1));
  if (updated.slice(0, 1) === "(") {
    //remove ()
    updated = updated.slice(1, updated.length - 1);
  }
  if (e.target.classList.contains("delete")) {
    // CONFIRM THE DELETE
    if (confirm("Are you sure you want to delete this employee?")) {
      // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
      let rowIndex = e.target.parentNode.parentNode.rowIndex;
      // REMOVE EMPLOYEE FROM ARRAY
      empTable.deleteRow(rowIndex);
      empCount.value = updated - 1;
    }
  }
});

// BUILD THE EMPLOYEES GRID
function buildGrid(data) {
  // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
  empTable.lastElementChild.remove();
  // REBUILD THE TBODY FROM SCRATCH
  let tbody = document.createElement("tbody");
  // LOOP THROUGH THE ARRAY OF EMPLOYEES
  // REBUILDING THE ROW STRUCTURE

  data
    .then((json) => {
      let count = 0;
      console.log(json);
      for (let employee of json) {
        tbody.innerHTML += `
                <tr>
                    <td>${employee.id}</td>
                    <td><strong>${employee.name}</strong></td>
                    <td>${employee.ext}</td>
                    <td><a href="mailto:${employee.email}">${employee.email}</a></td>
                    <td>${employee.title}</td>
                    <td><button class="btn btn-sm btn-danger delete">X</button></td>
                </tr>
                `;
        count += 1;
      }
      // UPDATE EMPLOYEE COUNT
      empCount.value = `(${count})`;
    })
    .catch((err) => console.error(err));

  // BIND THE TBODY TO THE EMPLOYEE TABLE
  empTable.appendChild(tbody);
}
