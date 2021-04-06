
export const page = document.querySelector(".page");
export const header = `<header>
<h1>Students List</h1>
<div class="search">
    <input id="search" type="search">
    <button>search</button>
</div>
</header>`;
export const studentTemplate = `<ul class="student-list"></ul>`;
export const pagination = `<ul class="pagination"></ul>`;

page.insertAdjacentHTML("afterbegin",header);
page.insertAdjacentHTML("beforeend",studentTemplate);
page.insertAdjacentHTML("beforeend",pagination);
