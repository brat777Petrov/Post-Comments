
  const url = 'https://jsonplaceholder.typicode.com';
  const main = document.querySelector('main');
  let flagRemovePanel = false;
    
  httpGetRequest(url,'/posts', start);
  
  function httpGetRequest(url, params, callback) {
    const fullUrl = url + params;
    let x = new XMLHttpRequest();
    x.open("GET", fullUrl);
    x.send();
    x.onload = () => {
      let data = x.response;
      callback(null, data);
     };
    x.onerror = () => {
      callback(error);
    };                  
  }

  function start(z,response) {
    const data = JSON.parse(response);
    shortPosts(100, data);
    main.addEventListener('click', () => {
     const postId = openPost(data);
     
    } )
  };

  function shortPosts(n, data) {
     for ( let i = 0; i < n; i++ ) {
      let arrWords = [];
      const post = document.createElement('div');
      main.append(post);
      post.classList = (`post ${i}`);
      arrWords = data[i].body.split(' ');
      
      let fiveWords = '';
      for ( let j = 0; j < 4; j++ ) {
        fiveWords += arrWords[j] + ' ';
      }

      const postNumber = document.createElement('p');
      const postTitle = document.createElement('p');
      const postBody = document.createElement('p');
      postNumber.className = `postNumber ${i}`;
      postTitle.className =`postTitle ${i}`;
      postBody.className = `postBody ${i}`;

      post.append(postNumber);
      post.append(postTitle);
      post.append(postBody);

      postNumber.innerHTML = data[i].id + ' ';
      postTitle.innerHTML = data[i].title + "<br/><b>";
      postBody.innerHTML =  fiveWords +    "...";
    }
  }

  function openPost (data) {
    const postId = event.target.classList[1];
    if (postId) {
      const checkPanel = document.getElementById('panelComments');
      if (checkPanel) {
        clearComments();
      }
        addCommentBtn(postId);
        const onePost = document.createElement('div');
        main.append(onePost);
        onePost.classList = ('onePost');
        onePost.innerHTML = data[postId].body;
    }
    return postId;
  }

  function addCommentBtn(postId) {
    const commentBtn = document.createElement('button');
    main.append(commentBtn);
    commentBtn.className = ('commentBtn');
    commentBtn.innerHTML = ('Показать коментарии')
    commentBtn.addEventListener('click', () => {
      
       httpGetRequest(url,'/comments', (z,response) => {
        const comments = JSON.parse(response);
        addComments(postId, comments);
       });

    } )
  }

  function addComments(postId, comments) {
    flagRemovePanel = true;
    const panelComments = document.createElement('div');
    main.append(panelComments);
    panelComments.id = ('panelComments');
    const arrCommit = comments.filter( (el) => {
      return el.postId === ( +postId+1 );
    })
   
    for ( let i = 0; i < arrCommit.length; i++) {
      const comment = document.createElement('div');
      main.append(panelComments);
      panelComments.append(comment);
      comment.className = ('comment');
      comment.innerHTML = (arrCommit[i].body);
    }
  }

  function clearComments() {
   const x = document.getElementById('panelComments');
   console.log(x);
    x.remove();
  }