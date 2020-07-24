const postContainer = document.querySelector(".post-container");
const loader = document.querySelector(".loader");
const loading = document.querySelector(".loading");
const filter = document.querySelector("input");
let limit = 5;
let page = 1;
async function getApi() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}
async function showApiOnDom() {
  const posts = await getApi();
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("post");
    postContainer.appendChild(div);
    div.innerHTML = `<div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>`;
  });
}

let isLoading = false;
async function loadPost() {
  if (isLoading) {
    return;
  }
  page++;
  isLoading = true;
  loader.classList.add("show");
  await showApiOnDom();
  isLoading = false;
  loader.classList.remove("show");
}
// 놀랍게도 isLoading을 밑에 애보다 먼저 정의해주니까 오류 안 생김. 순서 중요
showApiOnDom();
window.addEventListener("scroll", scrollNew);
function scrollNew() {
  const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    loadPost();
  }
}
// function loadPost() {
//   loader.classList.add("show");
//   setTimeout(() => {
//     loader.classList.remove("show");
//     setTimeout(() => {
//       page++;
//       showApiOnDom();
//     }, 300);
//   }, 1500);
// }

filter.addEventListener("input", filterWords);
function filterWords(e) {
  const val = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const postTitle = post.querySelector(".post-title").innerText.toUpperCase();
    const postBody = post.querySelector(".post-body").innerText.toUpperCase();
    if (postTitle.indexOf(val) > -1 || postBody.indexOf(val) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}
