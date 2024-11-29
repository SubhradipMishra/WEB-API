document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting
  
    const username = document.getElementById('username').value; // Get the username entered
    const repoList = document.getElementById('repo-list'); // Get the repo list container
  
    // Clear previous list items if any
    repoList.innerHTML = '';
  
    // Fetch GitHub repositories for the entered username
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        // Display repositories as a list
        if (data.length === 0) {
          repoList.innerHTML = '<li>No repositories found for this user.</li>';
        } else {
          data.forEach(repo => {
            const listItem = document.createElement('li');
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.target = '_blank'; // Open link in a new tab
            repoLink.textContent = repo.name; // Display repo name
  
            listItem.appendChild(repoLink);
            repoList.appendChild(listItem);
          });
        }
      })
      .catch(error => {
        repoList.innerHTML = `<li>${error.message}</li>`; // Handle errors (e.g., user not found)
      });
  });
  