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
const page = document.querySelector('.page');
const studentList = document.getElementsByTagName('ul')[0];
const list = [];
const students = document.querySelectorAll('.student-item');
for (let i = 0; i <= students.length; i += 1) {
  let student_avatar = students[i].querySelector('.avatar').attributes[1].value;
  let student_name = students[i].querySelector('h3').innerText;
  let student_email = students[i].querySelector('.email').innerText;
  let student_joined = students[i].querySelector('.joined-details').innerText.split(' ')[1];
  let student = {
    avatar: student_avatar,
    name: student_name,
    email: student_email,
    joined: student_joined
  };
  list.push(student);
}

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
const showPage = (list, pages) => {

}



/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = list => {
  
  page.appendChild();
}



// Remember to delete the comments that came with this file, and replace them with your own code comments.
