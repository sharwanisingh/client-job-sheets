// viewPage.js
document.addEventListener("DOMContentLoaded", function() {
    const printBtn = document.getElementById("print-btn");
    printBtn.addEventListener("click", function() {
      // print the jobsheet
      window.print();
    });
  });
  
  // editPage.js
  document.addEventListener("DOMContentLoaded", function() {
    const editForm = document.getElementById("edit-form");
    const saveBtn = document.getElementById("save-btn");
  
    saveBtn.addEventListener("click", function(event) {
      event.preventDefault();
      // get the updated values from the form
      const name = document.getElementById("name").value;
      // add more fields as needed
  
      // send a request to the server to update the jobsheet
      fetch("/update-jobsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, /* add more fields as needed */ }),
      })
        .then(response => response.json())
        .then(data => {
          console.log("Jobsheet updated successfully!");
        })
        .catch(error => {
          console.error("Error updating jobsheet:", error);
        });
    });
  });