document.addEventListener('DOMContentLoaded', function () {
  const bookmarkButton = document.getElementById('bookmarkButton');
  const questionsList = document.getElementById('questionsList');

  bookmarkButton.addEventListener('click', async function () {
    try {
      // Fetch a random LeetCode question (replace this URL with your backend or LeetCode API endpoint)
      const response = await fetch('https://api.example.com/random-question');
      const randomQuestion = await response.json();

      // Create a list item with the question title and link
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = randomQuestion.title;
      link.href = randomQuestion.link;
      link.target = '_blank';
      listItem.appendChild(link);

      // Add the list item to the questions list
      questionsList.appendChild(listItem);
    } catch (error) {
      console.error('Error fetching random question:', error);
    }
  });
});
