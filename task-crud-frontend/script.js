const API_URL = "http://localhost:5000/api/tasks";
const addBtn = document.getElementById("addBtn");
const tableBody = document.querySelector("#crudTable tbody");

let editIndex = null;

// Load records
async function loadRecords() {
    tableBody.innerHTML = "";

    try {
        const res = await fetch(API_URL);
        const records = await res.json();

        if (!records.length) {
            tableBody.innerHTML = `<tr><td colspan="14" style="text-align:center;">No records yet.</td></tr>`;
            return;
        }

        records.forEach((record, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${record.name}</td>
                <td>${record.email}</td>
                <td>${record.age}</td>
                <td>${record.phone}</td>
                <td>${record.address}</td>
                <td>${record.city}</td>
                <td>${record.state}</td>
                <td>${record.country}</td>
                <td>${record.zip}</td>
                <td>${record.dob}</td>
                <td>${record.gender}</td>
                <td>${record.occupation}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editRecord('${record._id}')">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteRecord('${record._id}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error("Error loading records:", err);
    }
}

// Get form data
function getFormData() {
    return {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        age: document.getElementById("age").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        state: document.getElementById("state").value.trim(),
        country: document.getElementById("country").value.trim(),
        zip: document.getElementById("zip").value.trim(),
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        occupation: document.getElementById("occupation").value.trim(),
    };
}

// Clear form
function clearForm() {
    document.querySelectorAll(".crud-form input, .crud-form select").forEach(el => el.value = "");
    editIndex = null;
    addBtn.textContent = "Add Record";
}

// Add or update record
addBtn.addEventListener("click", async () => {
    const record = getFormData();

    if (!record.name || !record.email) {
        alert("Name and Email are required.");
        return;
    }

    try {
        if (editIndex) {
            await fetch(`${API_URL}/${editIndex}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            });
        }
        clearForm();
        loadRecords();
    } catch (err) {
        console.error("Error saving record:", err);
    }
});

// Delete record
async function deleteRecord(id) {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadRecords();
    } catch (err) {
        console.error("Error deleting record:", err);
    }
}

// Edit record
async function editRecord(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const record = await res.json();

        document.getElementById("name").value = record.name;
        document.getElementById("email").value = record.email;
        document.getElementById("age").value = record.age;
        document.getElementById("phone").value = record.phone;
        document.getElementById("address").value = record.address;
        document.getElementById("city").value = record.city;
        document.getElementById("state").value = record.state;
        document.getElementById("country").value = record.country;
        document.getElementById("zip").value = record.zip;
        document.getElementById("dob").value = record.dob;
        document.getElementById("gender").value = record.gender;
        document.getElementById("occupation").value = record.occupation;

        editIndex = id;
        addBtn.textContent = "Update Record";
    } catch (err) {
        console.error("Error fetching record for edit:", err);
    }
}

// Initial load
document.addEventListener("DOMContentLoaded", loadRecords);
