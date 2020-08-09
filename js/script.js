/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const pageDiv = document.querySelector('.page');
const studentList = document.querySelectorAll('.student-item');
let noResultsDiv = document.createElement('div');
let h1 = document.createElement('h1');
noResultsDiv.append(h1);
pageDiv.append(noResultsDiv);
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
   for(let i = 0; i < totalPages; i++) {
      let li = document.createElement('li');
      let anchor = document.createElement('a');
      anchor.innerHTML = (i + 1);
      li.appendChild(anchor);
      ul.appendChild(li);
   }
   if (ul.childNodes.length > 0) {
      ul.firstElementChild.firstElementChild.classList.add('active');
   }
   
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


// Function to add search ability to the page
const appendSearch = (list) => {

   // Creating and appending relevant HTML elements
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

   // Click event listener for the button
   button.addEventListener('click', () => {
      let searchValue = input.value.toUpperCase();
      let searchResults = [];
      // Loop through the list and check if search value is in it
      for(let i = 0; i < list.length; i++) {
         let studentName = list[i].firstElementChild.childNodes[3].innerHTML.toUpperCase()
         if(studentName.indexOf(searchValue) > -1) {
            studentList[i].style.display = '';
            searchResults.push(studentList[i]);
         } else {
            studentList[i].style.display = 'none';
         }
      }
      document.querySelector('.pagination').remove();
      showPage(searchResults, (searchResults.length / studentsToShow));
      appendPageLinks(searchResults);

      // Add or remove text inside the no results h1 within the page
      if (searchResults.length > 0 && noResultsDiv.childNodes.length > 0) {
         h1.innerHTML = ' ';
      } else {
         h1.innerHTML = 'No results';
      }
   })

   // Key up event listener for the input field
   input.addEventListener('keyup', () => {
      let searchValue = input.value.toUpperCase();
      let searchResults = [];
      for(let i = 0; i < list.length; i++) {
         let studentName = list[i].firstElementChild.childNodes[3].innerHTML.toUpperCase()
         if(studentName.indexOf(searchValue) > -1) {
            studentList[i].style.display = '';
            searchResults.push(studentList[i]);
         } else {
            studentList[i].style.display = 'none';
         }
      }
      document.querySelector('.pagination').remove();
      showPage(searchResults, (searchResults.length / studentsToShow));
      appendPageLinks(searchResults);

      if (searchResults.length > 0 && noResultsDiv.childNodes.length > 0) {
         h1.innerHTML = ' ';
      } else {
         h1.innerHTML = 'No results';
      }
   })
}



// calling the functions
showPage(studentList, 1);
appendPageLinks(studentList);
appendSearch(studentList);