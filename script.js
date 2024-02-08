document.addEventListener('DOMContentLoaded', function() {
    // Call loadTasks() once the page content is loaded
    loadTasks();
});


// Function to save task data to local storage
function saveTasks() {
  
    const tasks = Array.from(document.getElementById('output').children)
        .filter(node => node.tagName === 'DIV');

    // First, filter out text nodes from each div in the tasks array
    const textNodesInDivs = tasks.map(div => Array.from(div.childNodes).filter(node => node.nodeType === Node.TEXT_NODE));

    // Next, extract text content from each text node and flatten the resulting array
    const textContentArray = textNodesInDivs.flatMap(textNodes => textNodes.map(node => node.textContent.trim()));

    console.log(textContentArray);
    
    //console.log(text)
    localStorage.setItem('tasks', JSON.stringify(textContentArray));

    const completed = Array.from(document.getElementById('completed').children)
    .filter(node => node.tagName === 'DIV');

    // First, filter out text nodes from each div in the tasks array
    const textNodesIncomp = completed.map(div => Array.from(div.childNodes).filter(node => node.nodeType === Node.TEXT_NODE));

    // Next, extract text content from each text node and flatten the resulting array
    const textContentIncomp = textNodesIncomp.flatMap(textNodes => textNodes.map(node => node.textContent.trim()));

    //console.log(text)
    localStorage.setItem('complete', JSON.stringify(textContentIncomp));
}

// Function to load task data from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => printInput(task));

    const complete = JSON.parse(localStorage.getItem('complete')) || [];
    tasks.forEach(complete => complete_task(complete));
}

function printInput(text) {

    let input = text
    console.log(input);

    if (text == '') {
        input = document.getElementById('task').value;
    } 
    //const input = document.getElementById('task');
    const output = document.getElementById('output');
    const newDiv = document.createElement('div');
    
    /*
    i did not do input.value neechay because i did input.value uper
    inside the if block
    because undoTask say value jo arahi hay wo directly text hay or .value yahan
    karnay say masla hojaye ga
    */

    newDiv.innerHTML = input;
          // yar isay css file may dalo
    newDiv.style.backgroundColor = 'pink';
    newDiv.style.padding = '10px';
    newDiv.style.marginBottom = '5px';
    newDiv.style.display = 'flex';

        // Create a new button element
    const deleteButton = document.createElement('button');
    const completeButton = document.createElement('button');

    deleteButton.innerHTML = '❌'; // Button text
    completeButton.innerHTML = '✔️'; 
        // isko bhi
    deleteButton.style.marginLeft = 'auto'; // Push the button to the right
    completeButton.style.marginLeft = 'auto';

    deleteButton.onclick = delete_task;
    completeButton.onclick = complete_task;
    
    newDiv.appendChild(deleteButton);
    newDiv.appendChild(completeButton);
    
    // Append the new div to the output container
    output.insertBefore(newDiv, output.firstChild);

    // Clear the input field after printing
    input.value = "";

    // Save tasks to local storage after printing
    saveTasks();

}

function delete_task() {
    parent_div = this.parentNode.parentNode;
    console.log(parent_div.id)
    //x = 'output'
    // Add functionality to delete the corresponding div
    const output = document.getElementById(parent_div.id)
    output.removeChild(this.parentNode);

    saveTasks();
};

function complete_task() {
    const oldDiv = this.parentNode;
    const text = Array.from(oldDiv.childNodes).filter(node => node.nodeType === Node.TEXT_NODE)
    console.log(text[0]);
    const output = document.getElementById('completed');
    const newDiv = document.createElement('div');
    const undoButton = document.createElement('button'); 

    //newDiv.innerHTML = '<s>' + text[0].data + '</s>';
    newDiv.innerHTML = text[0].data;

    undoButton.innerHTML = '🔄'; 
        // isko bhi
    undoButton.style.marginLeft = 'auto'; // Push the button to the right
    undoButton.onclick = undoTask;

    // Get the innerHTML of the temporary container, which now only contains the parent's HTML content
    newDiv.appendChild(undoButton);
    
    
            // Set the content of the div to the input value
    //newDiv.innerHTML = oldDiv.innerHTML;
            // yar isay css file may dalo
    newDiv.style.backgroundColor = 'pink';
    newDiv.style.padding = '10px';
    newDiv.style.marginBottom = '5px';
    newDiv.style.display = 'flex';

    output.insertBefore(newDiv, output.firstChild);
    delete_task.call(this);
    
    saveTasks();
};


function undoTask() {
    console.log(this);
    const oldDiv = this.parentNode;
    console.log(oldDiv)
    const text = Array.from(oldDiv.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
    console.log(text[0].data)
    printInput(text[0].data)
    delete_task.call(this);

    saveTasks();
}

