/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const studentList = document.getElementsByTagName('ul')[0];
const list = [];
const students = document.querySelectorAll('.student-item');

// find all students on the page and save data into array
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

/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/


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

  studentList.innerHTML = studentPageList;
};

showPage(list, 1);

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
  const pageDiv = studentList.parentNode;

  //calculate number of buttons(pages) needed
  let totalPages = 1;
  if(list.length % 10 > 0) {
    totalPages = Math.round(list.length / 10) + 1;
  } else {
    totalPages = Math.round(list.length / 10)
  };

  //create list of button numbers
  let div = document.createElement('div');//'<div class="pagination"><ul>';
  div.classList.add("pagination");

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
  div.innerHTML = paginationButtons;

  pageDiv.appendChild(div);

  const pageButtonsList = document.querySelector('.pagination');
  let selection = 1;
  pageButtonsList.addEventListener('click', (e) => {
    if(e.target.tagName === 'A') {
      selection = parseInt(e.target.innerText, 10);
    }
    showPage(list, selection);
  });
}

appendPageLinks(list);

// Remember to delete the comments that came with this file, and replace them with your own code comments.
