

function printInput(text) {

    let input = text
    if (text == '') {
        input = document.getElementById('task');
    } 
    //const input = document.getElementById('task');
    const output = document.getElementById('output');
    const newDiv = document.createElement('div');
    
    // Set the content of the div to the input value
    newDiv.innerHTML = input.value;
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

}

function delete_task() {
    // Add functionality to delete the corresponding div
    const output = document.getElementById('output')
    output.removeChild(this.parentNode);
};

function complete_task() {

    const oldDiv = this.parentNode;
    const text = Array.from(oldDiv.childNodes).filter(node => node.nodeType === Node.TEXT_NODE)
    const output = document.getElementById('completed');
    const newDiv = document.createElement('div');
    const undoButton = document.createElement('button'); 

    undoButton.innerHTML = '🔄'; 
        // isko bhi
    undoButton.style.marginLeft = 'auto'; // Push the button to the right

    // Get the innerHTML of the temporary container, which now only contains the parent's HTML content
    newDiv.innerHTML = '<s>' + text[0].data + '</s>';
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

    undoButton.onclick = undoTask;
};


function undoTask() {
    const oldDiv = this.parentNode;
    const text = Array.from(oldDiv.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
    printInput(text[0].data);
}

