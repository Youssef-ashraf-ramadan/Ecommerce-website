const questions = document.querySelectorAll('.faq__question');

questions.forEach(question => {
  question.addEventListener('click', function() {
    this.classList.toggle('show-answer');
    const answer = question.nextElementSibling;
    const questionIcon = question.querySelector('i');
    questionIcon.classList.toggle('fa-plus-square');
    questionIcon.classList.toggle('fa-minus-square');

    if (question.classList.contains('show-answer')) {
      answer.style.height = `${answer.scrollHeight}px`;
    } else {
      answer.style.height = 0;
    }
  });
});
