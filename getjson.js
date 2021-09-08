getJSON('story.json').then(function(story) {
  addHtmlToPage(story.heading);

  return story.chapterUrls.reduce(function(sequence, chapterUrl) {
    return sequence.then(function() {
      // …запросим следующую главу
      return getJSON(chapterUrl);
    })
    .then(function(chapter) {
      // и добавим её на страницу
      addHtmlToPage(chapter.html);
    });
  }, Promise.resolve());
})


.then(function() {
  // Всё успешно загрузилось!
  addTextToPage("Всё ок");
})
.catch(function(err) {
  // Перехватываем любую ошибку, произошедшую в процессе
  addTextToPage("Что-то сломалось: " + err.message);
})
.then(function() {
  // И всегда прячем индикатор в конце
  document.querySelector('.spinner').style.display = 'none';
});