/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//find all students on the page and save data into array
const ulList = document.getElementsByTagName('ul')[0];
const students = document.querySelectorAll('.student-item');

//array saved in const studentList
const createStudentList = () => {
  const list = [];
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
    list.push(studentInfo);
  });
  return list;
}
const createdList = createStudentList();

//add search input and button
const addSearchField = () => {
  const pageHeader = ulList.previousElementSibling;
  const searchDiv = document.createElement('div');

  searchDiv.classList.add('student-search');
  searchDiv.innerHTML = `
    <input placeholder="Search for students...">
    <button>Search</button>
  `;
  pageHeader.appendChild(searchDiv);
}
//add search field
addSearchField();

// get search input to evaluate list of students
// const evaluateSearch = list => {
//   let searchList = [];
//   let searchInput = '';
//
//   list.forEach(student => {
//     let name = student.name.toLowerCase();
//     let email = student.email.toLowerCase();
//
//     const div = document.querySelector('.student-search');
//     div.addEventListener('keyup', (e) => {
//       if(e.target.tagName === 'INPUT') {
//         searchInput = e.target.value.toLowerCase();
//       }
//     });
//     div.addEventListener('click', (e) => {
//       if(e.target.tagName === 'BUTTON') {
//         searchInput = e.target.previousElementSibling.value.toLowerCase();
//       }
//     });
//
//     if(name.indexOf(searchInput) >= 0 || email.indexOf(searchInput) >= 0) {
//       searchList.push(student);
//     }
//   });
// };
// const evaluatedList = evaluateSearch(createdList);

//showPage function
const showPage = (list, page) => {
  // find in list array of students needed to be shown based on the page
  const greatest = page * 10;
  const least = greatest - 10;
  const newList = list.slice(least, greatest);

  //format array list for new page list
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
  ulList.innerHTML = studentPageList;
};
showPage(createdList, 1);

//appendPageLinks function
const pageDiv = ulList.parentNode;
const appendPageLinks = list => {
  //create list of button numbers
  let buttonDiv = document.createElement('div');
  buttonDiv.classList.add("pagination");

  //calculate number of buttons(pages) needed
  let pages = 1;
  let arrayTotal = list.length;
  if(arrayTotal % 10 > 0) {
    pages = Math.round(arrayTotal / 10) + 1;
  } else {
    pages = Math.round(arrayTotal / 10)
  }

  //create button format
  let paginationButtons = '<ul>';
  for (let i = 5; i >= 0; i -= 1){
    let totalNumber = pages - i;
    paginationButtons += `
      <li>
        <a href="#${totalNumber.toString()}">${totalNumber.toString()}</a>
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
    let parent = e.target.parentNode.parentNode;
    let buttons = parent.querySelectorAll('li a');
    buttons.forEach(button => button.classList.remove('active'));
    if(e.target.tagName === 'A') {
      selection = parseInt(e.target.innerText, 10);
      e.target.classList.add("active");
      showPage(list, selection);
    }
  });
}

appendPageLinks(createdList);
