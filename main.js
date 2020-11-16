const input = document.querySelector('.search-input');
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');

let limit = 5;
let page = 1;

async function getPosts() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const data = await response.json();
  // console.log(data);
  return data;
};

async function showPosts() {
  const posts = await getPosts();
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post-container');
    postEl.innerHTML = `
    <p class="post-number">${post.id}</p>
    <h3 class="post-title">${post.title}</h3>
    <p class="post-text">${post.body}</p>
    `;
    postsContainer.appendChild(postEl);
  });
  // console.log(posts);
}

function filterPosts(e) {
  const word = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post-container');
  // console.log(posts);

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const text = post.querySelector('.post-text').innerText.toUpperCase();


    if (title.indexOf(word) > -1 || text.indexOf(word) > -1) {
      post.style.display = 'inline';
    } else {
      post.style.display = 'none';

    }
  });

}

function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    loading.classList.remove('show')
    page++;
    showPosts();
  }, 1000);
}

showPosts();

window.addEventListener("scroll", function () {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading()
  }
});

input.addEventListener('input', filterPosts);
