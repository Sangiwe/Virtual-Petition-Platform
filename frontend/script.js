let petitions = [];

document.addEventListener('DOMContentLoaded', () => {
  // Get the petition form and list elements
  const petitionForm = document.getElementById('new-petition-form');
  const petitionList = document.getElementById('petition-list-ul');

  // Add event listener to the petition form submission
  petitionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let goal = document.getElementById('goal').value;

    createPetition(title, description, goal);
  });

  // Function to create a new petition
  function createPetition(title, description, goal) {
    let petition = {
      title: title,
      description: description,
      goal: goal
    };

    petitions.push(petition);
    updatePetitionList();
    clearForm();
  }

  // Function to update the petition list
  function updatePetitionList() {
    petitionList.innerHTML = '';

    petitions.forEach((petition, index) => {
      let li = document.createElement('li');
      li.innerHTML = `
        <span>${petition.title}</span>
        <button class="delete-petition" data-index="${index}">Delete</button>
        <section class="petition-details">
          <h2>${petition.title}</h2>
          <p>${petition.description}</p>
          <p>Goal: ${petition.goal}</p>
        </section>
      `;
      petitionList.appendChild(li);
    });

    // Add event listener to delete buttons
    let deleteButtons = document.querySelectorAll('.delete-petition');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        let index = e.target.getAttribute('data-index');
        deletePetition(index);
      });
    });
  }

  // Function to clear the form fields
  function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('goal').value = '';
  }

  // Function to delete a petition
  function deletePetition(index) {
    petitions.splice(index, 1);
    updatePetitionList();
  }
});

