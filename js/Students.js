
import {page,header,studentTemplate,pagination} from './html.js';
import {data} from './data.js';
class Students{
    constructor(data){
        this.data = data;
        this.numberOfListPerPage = 9;
        this.showPage(data,1);
        this.addPagination(data);
        this.search(data);
    }


    showPage(list,page) {
        if(list.length == 0){
            document.querySelector(".student-list").innerHTML = "Student Not Found";
            return;
        }
        
        let studentList = document.querySelector(".student-list");
        let startList = (page * this.numberOfListPerPage) - this.numberOfListPerPage;
        let endList = page * this.numberOfListPerPage;
        studentList.innerHTML = "";
        for(let i=0; i<list.length; i++){
            if(i >= startList && endList > i){
                let template = this.getTemplate(list[i]);
                studentList.insertAdjacentHTML("beforeend",template);
            }
        }
        
    }



    getTemplate(listItem) {
        return `<li class="list-item">
            <img src="${listItem.picture.medium}" alt="" class="avatar">
            <h1 class="name"><a href="#">${listItem.name.title} ${listItem.name.first} ${listItem.name.last}</a></h1>
            <p class="email">${listItem.email}</p>
            <hr>
            <p class="join-date">${listItem.registered.date}</p>
        </li>`;
    }



    addPagination(list){
        let numberOfButtons = Math.ceil(list.length / this.numberOfListPerPage);
        let pagination = document.querySelector(".pagination");
        pagination.innerHTML = "";
        for(let i=1;i<=numberOfButtons;i++){
            let active = "";
            if(i==1){
                active = "active";
            }
            let listTemplate = `<li class="list-item "><button class="button ${active}">${i}</button></li>`;
            pagination.insertAdjacentHTML("beforeend",listTemplate);
        }
    
        pagination.addEventListener("click",(e)=>{
            if(e.target.tagName === 'BUTTON'){
                const activeButton = document.querySelector(".button.active");
                activeButton.className = "button";
                e.target.className = "button active";
                this.showPage(this.data,e.target.textContent);
            }
        });
    
    }


    search(data){
        const searchField = document.querySelector("#search");
        searchField.addEventListener("keyup",()=>{
            let student_list = [];
            let keyword = searchField.value.trim();
            for(let i=0; i < data.length; i++){
                const stdInfo = `${data[i].name.title} ${data[i].name.first} ${data[i].name.last}`;
                const match =  stdInfo.toLowerCase().includes(keyword.toLowerCase());
                if(match){
                    student_list.push(data[i]);
                }
            }
            this.showPage(student_list,1);
            this.addPagination(student_list);
        });
    
    }
    



}

new Students(data);