/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// find all students on the page and save data into array
const originalList = document.getElementsByTagName('ul')[0];
const students = document.querySelectorAll('.student-item');

const studentList = [];
students.forEach(student => {
  const student_avatar = student.querySelector('.avatar').attributes[1].value;
  const student_name = student.querySelector('h3').innerText;
  const student_email = student.querySelector('.email').innerText;
  const student_joined = student.querySelector('.joined-details').innerText.split(' ')[1];
  const studentInfo = {
    avatar: student_avatar,
    name: student_name,
    email: student_email,
    joined: student_joined
  };
  studentList.push(studentInfo);
});

//add search input and button
const pageHeader = originalList.previousElementSibling;
const searchDiv = document.createElement('div');

searchDiv.classList.add('student-search');
searchDiv.innerHTML = `
  <input placeholder="Search for students...">
  <button>Search</button>
`;
pageHeader.appendChild(searchDiv);

//get search input to evaluate list of students
const searchInput = document.querySelector('.student-search');
const studentSearch = (element, eventTypes) => {
  let events = eventTypes.split(' ');
  let searchList = [];
  events.forEach(event => element.addEventListener(event, (e) => {
    studentList.forEach(student => {
      let name = student.name.toLowerCase();
      let email = student.email.toLowerCase();
      if(e.target.tagName === 'INPUT') {
        let currentSearch = e.target.value.toLowerCase();
      }else if(e.target.tagName === 'BUTTON') {
        let currentSearch = e.target.previousElementSibling.value.toLowerCase();
      }
      if(name.indexOf(currentSearch) >= 0 || email.indexOf(currentSearch) >= 0) {
        searchList.push(student);
      }
    });


  }));

}

studentSearch(searchInput, "keyup click")

searchInput.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON') {
    studentSearch();
  }
});


//showPage function
const showPage = (list, page) => {
  // find in list array of students needed to be shown on the page
  const greatest = page * 10;
  const least = greatest - 10;
  const newList = list.slice(least, greatest);

  //format list for new page list
  let studentPageList = '';
  newList.forEach(student => {
    studentPageList += `
      <li class="student-item cf">
        <div class="student-details">
          <img class="avatar" src="${student.avatar}">
          <h3>${student.name}</h3>
          <span class="email">${student.email}</span>
        </div>
        <div class="joined-details">
          <span class="date">Joined ${student.joined}</span>
        </div>
      </li>
    `;
  });

  originalList.innerHTML = studentPageList;
};

//start page with page 1
showPage(studentList, 1);

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

//appendPageLinks function
const appendPageLinks = list => {
  const pageDiv = originalList.parentNode;

  //calculate number of buttons(pages) needed
  let totalPages = 1;
  if(list.length % 10 > 0) {
    totalPages = Math.round(list.length / 10) + 1;
  } else {
    totalPages = Math.round(list.length / 10)
  };

  //create list of button numbers
  let buttonDiv = document.createElement('div');
  buttonDiv.classList.add("pagination");

  let paginationButtons = '<ul>'
  for (let i = 5; i >= 0; i -= 1){
    let pageNumber = totalPages - i;
    paginationButtons += `
      <li>
        <a href="#${pageNumber.toString()}">${pageNumber.toString()}</a>
      </li>
    `;
  };
  paginationButtons += '</ul>';
  buttonDiv.innerHTML = paginationButtons;

  pageDiv.appendChild(buttonDiv);

  //listening for clicked events to post page number
  const pageButtonsList = document.querySelector('.pagination');
  let selection = 1;
  pageButtonsList.addEventListener('click', (e) => {
    if(e.target.tagName === 'A') {
      selection = parseInt(e.target.innerText, 10);
    }
    showPage(list, selection);
  });
}


appendPageLinks(studentList);
