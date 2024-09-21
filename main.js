// My JS code.

// Declare the button and input field in JS.
const button = document.querySelector('button');
const input = document.querySelector('input');

// Declare the ul element from the HTML-file in JS.
const list = document.querySelector('ul');

// Declare variables, that will show the number of completed tasks.
let completedTasks = document.getElementById('completedTasks');
let tasks = 0;
completedTasks.innerHTML = tasks;

// Declare an array that will contain the todo-list objects.
const listArray = [];

// Add an onclick event when button is pressed.
button.addEventListener(
    'click',
    addItem
);

// Function that appends the text from input field to a list in HTML.
function addItem()
{   
    // Declare two elements that will be created in this function.
    const item = document.createElement('li');
    const check = document.createElement('span');
    const trash = document.createElement('i');
    const itemLabel = document.createElement('span');

    // Declare a text variable that will be contained in the span element, that was created.
    const text = input.value;
    itemLabel.innerText = text;

    // Checkbox sign.
    check.setAttribute('id', 'check');
    check.innerHTML = '☑';

    // Sets an imported class attribute for the trash can.
    trash.setAttribute('class', 'fa fa-trash-o');

    // An if statement that makes sure the input field is NOT empty.
    if (text.length == 0)
    {
        document.querySelector('#error').innerText = 'Input must not be empty';
        return;
    } 
    else
    {   
        // Append the list- and span-element to the DOM.
        list.appendChild(item);
        item.appendChild(itemLabel);
        item.appendChild(check);
        item.appendChild(trash);

        // Pushes the span objects into the declared array.
        listArray.push(itemLabel);

        // A click event that marks the ToDo tasks: complete.
        check.addEventListener(
            'click',
            function() 
            { 
                if (itemLabel.getAttribute('class') == 'completed')
                {
                    completedTasks.innerHTML = --tasks;
                    itemLabel.setAttribute('class', '');
                }
                else
                {
                    completedTasks.innerHTML = ++tasks;
                    itemLabel.setAttribute('class', 'completed');
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
                    listArray.pop();
                    item.remove();
                }
                else
                {
                    listArray.pop();
                    item.remove();
                }
            }
        );

        // Empties the input field and the error message, of all text.
        document.querySelector('#error').innerText = '';
        input.value = '';
        return;
    }
};