/* E2 Library - JS */

/*-----------------------------------------------------------*/
/* Starter code - DO NOT edit the code below. */
/*-----------------------------------------------------------*/

// global counts
let numberOfBooks = 0; // total number of books
let numberOfPatrons = 0; // total number of patrons

// global arrays
const libraryBooks = [] // Array of books owned by the library (whether they are loaned or not)
const patrons = [] // Array of library patrons.

// Book 'class'
class Book {
	constructor(title, author, genre) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.patron = null; // will be the patron objet

		// set book ID
		this.bookId = numberOfBooks;
		numberOfBooks++;
	}

	setLoanTime() {
		// Create a setTimeout that waits 3 seconds before indicating a book is overdue

		const self = this; // keep book in scope of anon function (why? the call-site for 'this' in the anon function is the DOM window)
		setTimeout(function() {
			
			console.log('overdue book!', self.title)
			changeToOverdue(self);

		}, 3000)

	}
}

// Patron constructor
const Patron = function(name) {
	this.name = name;
	this.cardNumber = numberOfPatrons;

	numberOfPatrons++;
}


// Adding these books does not change the DOM - we are simply setting up the 
// book and patron arrays as they appear initially in the DOM.
libraryBooks.push(new Book('Harry Potter', 'J.K. Rowling', 'Fantasy'));
libraryBooks.push(new Book('1984', 'G. Orwell', 'Dystopian Fiction'));
libraryBooks.push(new Book('A Brief History of Time', 'S. Hawking', 'Cosmology'));

patrons.push(new Patron('Jim John'))
patrons.push(new Patron('Kelly Jones'))

// Patron 0 loans book 0
libraryBooks[0].patron = patrons[0]
// Set the overdue timeout
libraryBooks[0].setLoanTime()  // check console to see a log after 3 seconds


/* Select all DOM form elements you'll need. */ 
const bookAddForm = document.querySelector('#bookAddForm');
const bookInfoForm = document.querySelector('#bookInfoForm');
const bookLoanForm = document.querySelector('#bookLoanForm');
const patronAddForm = document.querySelector('#patronAddForm');

/* bookTable element */
const bookTable = document.querySelector('#bookTable')
/* bookInfo element */
const bookInfo = document.querySelector('#bookInfo')
/* Full patrons entries element */
const patronEntries = document.querySelector('#patrons')

/* Event listeners for button submit and button click */

bookAddForm.addEventListener('submit', addNewBookToBookList);
bookLoanForm.addEventListener('submit', loanBookToPatron);
patronAddForm.addEventListener('submit', addNewPatron)
bookInfoForm.addEventListener('submit', getBookInfo);

/* Listen for click patron entries - will have to check if it is a return button in returnBookToLibrary */
patronEntries.addEventListener('click', returnBookToLibrary)

/*-----------------------------------------------------------*/
/* End of starter code - do *not* edit the code above. */
/*-----------------------------------------------------------*/


/** ADD your code to the functions below. DO NOT change the function signatures. **/


/*** Functions that don't edit DOM themselves, but can call DOM functions 
     Use the book and patron arrays appropriately in these functions.
 ***/

// Adds a new book to the global book list and calls addBookToLibraryTable()
function addNewBookToBookList(e) {
	e.preventDefault();

	// Add book book to global array
	const bookName = document.querySelector('#newBookName').value;
	const authorName = document.querySelector('#newBookAuthor').value;
	const bookGenre = document.querySelector('#newBookGenre').value;
	try{
		if (bookName!="" && authorName!="" && bookGenre!=""){
			const newBook = new Book(bookName, authorName, bookGenre);
			libraryBooks.push(newBook);

	// Call addBookToLibraryTable properly to add book to the DOM
			addBookToLibraryTable(newBook);
		}
	} catch(e) {
		console.log('Empty entry');
	}
}

// Changes book patron information, and calls 
function loanBookToPatron(e) {
	e.preventDefault();

	// Get correct book and patron
	const bookId = document.querySelector('#loanBookId').value;
	const cardNumber = document.querySelector('#loanCardNum').value;

	// Add patron to the book's patron property
	try{
		if (bookId!="" && cardNumber!=""){
			libraryBooks[bookId].patron = patrons[cardNumber];

	// Add book to the patron's book table in the DOM by calling addBookToPatronLoans()
			addBookToPatronLoans(libraryBooks[bookId]);

	// Start the book loan timer.

			libraryBooks[bookId].setLoanTime();
		}
	} catch(e) {
		console.log('Empty entry');
	}
}

// Changes book patron information and calls returnBookToLibraryTable()
function returnBookToLibrary(e){
	e.preventDefault();
	// check if return button was clicked, otherwise do nothing.
	try{
		if(e.target.classList.contains('return')){
			console.log('return book');
			const row = e.target.parentElement.parentElement;
			const entries = row.querySelectorAll('td');
			const bookId = parseInt(entries[0].innerText);
	// Call removeBookFromPatronTable()
			removeBookFromPatronTable(row);
	// Change the book object to have a patron of 'null'
			libraryBooks[bookId].patron = null;
		}
	} catch(e) {
		console.log('Empty entry');
	}

}

// Creates and adds a new patron
function addNewPatron(e) {
	e.preventDefault();

	// Add a new patron to global array
	const patronName = document.querySelector('#newPatronName').value;
	try{
		if (patronName != ""){
			const newPatron = new Patron(patronName);
			patrons.push(newPatron);


	// Call addNewPatronEntry() to add patron to the DOM
			addNewPatronEntry(newPatron);
		}
	} catch(e) {
		console.log('Empty entry');
	}

}

// Gets book info and then displays
function getBookInfo(e) {
	e.preventDefault();

	// Get correct book
	const bookId = document.querySelector('#bookInfoId').value;


	// Call displayBookInfo()
	try{
		if (bookId != ""){
			displayBookInfo(libraryBooks[bookId]);
		}
	}catch(e){
		console.log('Empty entry');
	}

}


/*-----------------------------------------------------------*/
/*** DOM functions below - use these to create and edit DOM objects ***/

// Adds a book to the library table.
function addBookToLibraryTable(book) {
	// Add code here
	const tableRow = document.createElement('tr');

	const tableBookID = document.createElement('td');
	tableBookID.appendChild(document.createTextNode(book.bookId));
	
	const tableTitle = document.createElement('td');
	const strongTitle = document.createElement('strong');
	strongTitle.appendChild(document.createTextNode(book.title));
	tableTitle.appendChild(strongTitle);

	const tablePatronCard = document.createElement('td');
	if(book.patron != null){
		tablePatronCard.appendChild(document.createTextNode(book.patron.cardNumber));
	}

	tableRow.appendChild(tableBookID);
	tableRow.appendChild(tableTitle);
	tableRow.appendChild(tablePatronCard);

	const tbody = document.createElement('tbody');
	tbody.appendChild(tableRow);

	bookTable.appendChild(tbody);


}


// Displays deatiled info on the book in the Book Info Section
function displayBookInfo(book) {
	// Add code here
	const info = bookInfo.querySelectorAll('span');
	info[0].innerText = book.bookId;
	info[1].innerText = book.title;
	info[2].innerText = book.author;
	info[3].innerText = book.genre;
	if(book.patron ==null){
		info[4].innerText = 'N/A';
	}else{
		info[4].innerText = book.patron.name;
	}

}

// Adds a book to a patron's book list with a status of 'Within due date'. 
// (don't forget to add a 'return' button).
function addBookToPatronLoans(book) {
	// Add code here
	const tableRow = document.createElement('tr');

	const tableBookID = document.createElement('td');
	tableBookID.appendChild(document.createTextNode(book.bookId));

	const tableTitle = document.createElement('td');
	const strongTitle = document.createElement('strong');
	strongTitle.appendChild(document.createTextNode(book.title));
	tableTitle.appendChild(strongTitle);

	const tableStatus = document.createElement('td');
	const statusSpan = document.createElement('span');
	statusSpan.className = 'green';
	statusSpan.appendChild(document.createTextNode('Within due date'));
	tableStatus.appendChild(statusSpan);

	const tableReturn = document.createElement('td');
	const returnButton = document.createElement('button');
	returnButton.className = 'return';
	returnButton.appendChild(document.createTextNode('return'));
	tableReturn.appendChild(returnButton);

	tableRow.appendChild(tableBookID);
	tableRow.appendChild(tableTitle);
	tableRow.appendChild(tableStatus);
	tableRow.appendChild(tableReturn);

	const patrons = document.querySelectorAll('.patron');
	const table = patrons[book.patron.cardNumber].querySelector('.patronLoansTable');
	const tbody = table.firstElementChild;
	tbody.appendChild(tableRow);

	const books = bookTable.querySelectorAll('tr');
	const entries = books[book.bookId+1].querySelectorAll('td');
	entries[2].innerText = book.patron.cardNumber;

}

// Adds a new patron with no books in their table to the DOM, including name, card number,
// and blank book list (with only the <th> headers: BookID, Title, Status).
function addNewPatronEntry(patron) {
	// Add code here
	const patronDiv = document.createElement('div');
	patronDiv.className = 'patron';

	const nameP = document.createElement('p');
	nameP.appendChild(document.createTextNode('Name: '));
	const nameSpan = document.createElement('span');
	nameSpan.className = 'bold';
	nameSpan.appendChild(document.createTextNode(patron.name));
	nameP.appendChild(nameSpan);

	const cardP = document.createElement('p');
	cardP.appendChild(document.createTextNode('Card Number: '));
	const cardSpan = document.createElement('span');
	cardSpan.className = 'bold';
	cardSpan.appendChild(document.createTextNode(patron.cardNumber));
	cardP.appendChild(cardSpan);

	const loan = document.createElement('h4');
	loan.appendChild(document.createTextNode('Books on loan:'));

	const table = document.createElement('table');
	table.className = 'patronLoansTable';
	const tableBody = document.createElement('tbody');
	const tableRow = document.createElement('tr');

	const headBookId = document.createElement('th');
	headBookId.appendChild(document.createTextNode('BookID'));

	const headTitle = document.createElement('th');
	headTitle.appendChild(document.createTextNode('Title'));

	const headStatus = document.createElement('th');
	headStatus.appendChild(document.createTextNode('Status'));

	const headReturn = document.createElement('th');
	headReturn.appendChild(document.createTextNode('Return'));

	tableRow.appendChild(headBookId);
	tableRow.appendChild(headTitle);
	tableRow.appendChild(headStatus);
	tableRow.appendChild(headReturn);

	tableBody.appendChild(tableRow);
	table.appendChild(tableBody);

	patronDiv.appendChild(nameP);
	patronDiv.appendChild(cardP);
	patronDiv.appendChild(loan);
	patronDiv.appendChild(table);

	patronEntries.appendChild(patronDiv);
}


// Removes book from patron's book table and remove patron card number from library book table
function removeBookFromPatronTable(book) {
	// Add code here
	//remove from patron's book table
	const tbody = book.parentElement;
	tbody.removeChild(book);
	const entries = book.querySelectorAll('td');
	const bookId = parseInt(entries[0].innerText);

	//remove patron card number
	const books = bookTable.querySelectorAll('tr');
	const entriesBook = books[bookId+1].querySelectorAll('td');
	entriesBook[2].innerText = null;

}

// Set status to red 'Overdue' in the book's patron's book table.
function changeToOverdue(book) {
	//Add code here
	const patrons = patronEntries.children;
	for(let i = 0; i < patrons.length; i++){
		const table = patrons[i].lastElementChild;
		const tbody = table.firstElementChild;
		let curRow = tbody.children;
		for(let j = 0; j < curRow.length; j++){
			if(curRow[j].children.length > 1 && parseInt(curRow[j].children[0].innerText) === book.bookId){
				curRow[j].children[2].firstElementChild.className = 'red';
				curRow[j].children[2].firstElementChild.innerText = 'Overdue';
			}
		}
	}


}

