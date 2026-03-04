/*
HubSpot Employee Directory Filter
- Text search
- Department dropdown filter
- Uses data-name and data-department
- Used with HubDB
*/



document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("employeeSearch");
  const deptFilter = document.getElementById("departmentFilter");
  const employees = document.querySelectorAll(".employee-card");

  function filterEmployees() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const deptValue = deptFilter.value.toLowerCase();

    employees.forEach(emp => {

      const name = emp.dataset.name;
      const dept = emp.dataset.department;

      const matchesSearch =
        name.includes(searchValue) ||
        dept.includes(searchValue);

      const matchesDept =
        !deptValue || dept === deptValue;

      emp.style.display = (matchesSearch && matchesDept)
        ? "block"
        : "none";

    });

  }

  searchInput.addEventListener("input", filterEmployees);
  deptFilter.addEventListener("change", filterEmployees);

});
</script>

<select id="departmentFilter">
  <option value="">All Departments</option>

  {% for dept in departments %}
    <option value="{{ dept|lower }}">{{ dept }}</option>
  {% endfor %}
