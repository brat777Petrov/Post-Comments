// *** function *************

  function Main () {
    httpGetRequest (url,'/posts', function(err, response) {
      if(err) {
        console.error(err);
        alert('error');
      } else {
        start(null, response);
      }
    })
  }

  function httpGetRequest(url, params, callback) {
    const fullUrl = url + params;
    let x = new XMLHttpRequest();
    x.open("GET", fullUrl);
    x.send();



    x.onload = () => {
      const data = JSON.parse(x.response);
      callback(null, data);
     };
    x.onerror = () => {
      callback(error);
    };                  
  }

  function start(err,data) {
    shortPosts(data);
    main.addEventListener('click', () => {
    const postId = openPost(data);
     
    } )
  };

  function shortPosts(data) {
    data.map((currentValue,i) => {
      let arrWords = [];
      const post = document.createElement('div');
      post.classList = (`post`);
      post.setAttribute("data-id",`${i}`);
      main.append(post);
      arrWords = data[i].body.split(' ');
      
      const  fiveWords = arrWords.slice(0,4).join(' ');

      const postNumber = document.createElement('p');
      const postTitle = document.createElement('p');
      const postBody = document.createElement('p');
      postNumber.className = `postNumber ${i}`;
      postTitle.className =`postTitle ${i}`;
      postBody.className = `postBody ${i}`;

      postNumber.innerHTML = data[i].id + ' ';
      postTitle.innerHTML = data[i].title + "<br/><b>";
      postBody.innerHTML =  fiveWords +    "...";

      post.append(postNumber);
      post.append(postTitle);
      post.append(postBody);
    })
  }

  function openPost (data) {
    const el = event.target.closest('.post');
   
    if (el) {
      const postId = el.getAttribute("data-id");
      if (postId) {
        const checkPanel = document.getElementById('panelComments');
        if (checkPanel) {
          clearComments();
        }
        addCommentBtn(postId);
        const onePost = document.createElement('div');
        onePost.classList = ('onePost');
        onePost.innerHTML = data[postId].body;
        main.append(onePost);
      }
      return postId;
    }
  }

  function addCommentBtn(postId) {
    const commentBtn = document.createElement('button');
    commentBtn.className = ('commentBtn');
    commentBtn.innerHTML = ('Показать коментарии')
    main.append(commentBtn);
    commentBtn.addEventListener('click', () => {
      
       httpGetRequest(url,`/posts/${+postId+1}/comments`, (err,comments) => {
         addComments(postId, comments);
       });

    } )
  }

  function addComments(postId, comments) {
    flagRemovePanel = true;
    const panelComments = document.createElement('div');
    panelComments.id = ('panelComments');
    main.append(panelComments);
     
    comments.forEach(el => {
      const comment = document.createElement('div');
      comment.className = ('comment');
      comment.innerHTML = (el.body);
      panelComments.append(comment);
    });
    
   
  }

  function clearComments() {
   document.getElementById('panelComments').remove();
  }

  // ******** end function **************

  const url = 'https://jsonplaceholder.typicode.com';
  const main = document.querySelector('main');
  let flagRemovePanel = false;
  
  Main();