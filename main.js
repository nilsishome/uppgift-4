// My JS code.

// Declare the button and input field in JS.
const button = document.querySelector('button');
const input = document.querySelector('input');

// Declare the ul element from the HTML-file in JS.
const list = document.querySelector('ul');

// Declare variables, that will show the number of completed tasks.
const completedTasks = document.getElementById('completedTasks');
let tasks = 0;
completedTasks.innerHTML = tasks;

// Declare an array that will contain the todo-list objects.
const listArray = [];
let listId = 1;

// Add an onclick event when button is pressed.
button.addEventListener(
    'click',
    addItem
);

// Make an option to press 'enter' on the keyboard, instead of button.
input.addEventListener(
    'keypress',
    e => (e.key === 'Enter') ? addItem() : null
);

// Function that edits the completion status on the objects, in the array.
function listStatus(text, status)
{
    let index = listArray.map(l => l.name).indexOf(text);
    listArray[index].completed = status;
};

// Function that removes an object in the array.
function removeElement(text)
{
    let index = listArray.map(l => l.name).indexOf(text);
    listArray.splice(index, 1);
};

// Function that appends the text from input field to a list in HTML.
function addItem()
{   
    // Declare two elements that will be created in this function.
    const item = document.createElement('li');
    const check = document.createElement('span');
    const trash = document.createElement('span');
    const itemLabel = document.createElement('span');

    // Declare a text variable that will be contained in the span element, that was created.
    const text = input.value;
    itemLabel.innerText = text;

    // Checkbox sign.
    check.setAttribute('class', 'check');
    check.innerHTML = '☑';

    // Sets a class attribute for the trash can.
    trash.setAttribute('class', 'trashcan');
    trash.innerHTML = '&#128465;';

    // An if statement that makes sure the input field is NOT empty.
    if (text.length == 0)
    {
        document.querySelector('#error').innerText = 'Input must not be empty';
        return;
    } 
    else
    {   
        // Empties the input field and the error message, of all text.
        document.querySelector('#error').innerText = '';
        input.value = '';
    }

    // Append the list- and span-element to the DOM.
    list.appendChild(item);
    item.appendChild(itemLabel);
    item.appendChild(check);
    item.appendChild(trash);

    // Pushes the lists as objects into the declared array.
    let status = false;
    const listObjects = {id: listId, name: text, completed: status};
    listArray.push(listObjects);
    listId++;

    // A click event that marks the ToDo tasks: complete.
    check.addEventListener(
        'click',
        function() 
        { 
            if (itemLabel.getAttribute('class') == 'completed')
            {
                completedTasks.innerHTML = --tasks;
                itemLabel.setAttribute('class', '');
                let listText = item.firstChild.textContent;
                listStatus(listText, false);
            }
            else
            {
                completedTasks.innerHTML = ++tasks;
                itemLabel.setAttribute('class', 'completed');
                let listText = item.firstChild.textContent;
                listStatus(listText, true);
            }
        }
    );

    // A click event that removes a ToDo task completely.
    trash.addEventListener(
        'click',
        function() 
        { 
            if (itemLabel.getAttribute('class') == 'completed')
            {
                completedTasks.innerHTML = --tasks;
                let listText = item.firstChild.textContent;
                removeElement(listText);
                item.remove();
            }
            else
            {
                let listText = item.firstChild.textContent;
                removeElement(listText);
                item.remove();
            }
        }
    );
};