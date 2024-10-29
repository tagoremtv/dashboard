document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("userList");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    let users = [];

    // Fetch user data from API
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => {
            users = data;
            displayUsers(users);
        })
        .catch(error => console.error("Error fetching data:", error));

    // Display user cards
    function displayUsers(userArray) {
        userList.innerHTML = "";
        userArray.forEach(user => {
            const userCard = document.createElement("div");
            userCard.className = "col-12 col-md-4 mb-3";
            userCard.innerHTML = `
                <div class="card user-card">
                    <div class="card-body">
                        <h5 class="card-title">${user.name}</h5>
                        <p class="card-text">@${user.username}</p>
                        <button class="btn btn-primary view-details-btn" onclick="viewUserDetails(${user.id})">
                            View Details
                        </button>
                    </div>
                </div>
            `;
            userList.appendChild(userCard);
        });
    }

    // Search users by name or username
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm) || user.username.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    });

    // Sort users by name or username
    sortSelect.addEventListener("change", () => {
        const sortBy = sortSelect.value;
        let sortedUsers = [...users];
        if (sortBy === "name") {
            sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "username") {
            sortedUsers.sort((a, b) => a.username.localeCompare(b.username));
        }
        displayUsers(sortedUsers);
    });

    // Show user details in modal
    window.viewUserDetails = function(id) {
        const user = users.find(user => user.id === id);
        if (user) {
            document.getElementById("modalBody").innerHTML = `
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            `;
            $('#userModal').modal('show');
        }
    };
});
