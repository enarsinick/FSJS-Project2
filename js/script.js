/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const pageDiv = document.querySelector('.page');
const studentList = document.querySelectorAll('.student-item');
const studentsToShow = 10;

// Function to display certain amount of people on a page
const showPage = (list, page) => {
   // Creating the indexes for the pagination feature
   const startIndex = (page * studentsToShow) - studentsToShow;
   const endIndex = (page * studentsToShow) - 1;
   // Loop through all list elements and display whatever is within the indexes
   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i <= endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}

// Function that adds anchor links to the page to navigate through different pages
const appendPageLinks = (list) => {
   // Calc total pages
   let totalPages = list.length / studentsToShow;
   totalPage = parseInt(totalPages);

   // Dynamically creating elements for the page
   let div = document.createElement('div');
   div.classList.add('pagination');
   pageDiv.appendChild(div);
   let ul = document.createElement('ul');
   div.appendChild(ul);
   
   // Adding links depending on the amount of pages needed
   for(let i = 1; i < totalPages; i++) {
      let li = document.createElement('li');
      let anchor = document.createElement('a');
      anchor.innerHTML = i;
      li.appendChild(anchor);
      ul.appendChild(li);
   }
   ul.firstElementChild.firstElementChild.classList.add('active');
   const pageLinks = ul.querySelectorAll('a');

   // Loop over all page links and add event listeners to them
   for(let j = 0; j < pageLinks.length; j++) {
      pageLinks[j].addEventListener('click', (e) => {
         // Remove all active classes
         for (let f = 0; f < pageLinks.length; f++) {
            if(pageLinks[f].classList.contains('active')) {
               pageLinks[f].classList.remove('active');
            }
            event.target.classList.add('active');
            let pageNum = event.target.innerHTML;
            pageNum = parseInt(pageNum);
            showPage(studentList, pageNum);
         }
      })
   }
}

const appendSearch = () => {
   const pageHeader = document.querySelector('.page-header');
   const searchDiv = document.createElement('div');
   searchDiv.classList.add('student-search');
   const input = document.createElement('input');
   input.placeholder = 'Search for students...';
   const button = document.createElement('button');
   button.textContent = 'Search';
   pageHeader.append(searchDiv);
   searchDiv.append(input);
   searchDiv.append(button);

   button.addEventListener('click', () => {
      console.log('button clicked');
   })
}

// calling the functions
showPage(studentList, 1);
appendPageLinks(studentList);
appendSearch();