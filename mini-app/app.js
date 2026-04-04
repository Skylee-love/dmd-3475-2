   
        //epic code

        //examples so the people know how to use it
        //the data
        //dont forget, 0,1,2
let items = ["(example) Apple", "(example) Banana", "(example) Orange"];

//honestly still trying to figure out what const means 
const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("itemList");
const count = document.getElementById("count");
const deleteAllBtn = document.getElementById("deleteAllBtn");


// 3. core of app (most important)
function renderList() {
    list.innerHTML = ""; // clear the list

    for (let i = 0; i < items.length; i++) { //i starts at 0
        const li = document.createElement("li"); //creates new li element thats not on page yet (like a possibility)
        li.textContent = (i + 1) + ". " + items[i]; // numbering feature, lets text inside

        // delete button for each item
        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.addEventListener("click", function () {
            items.splice(i, 1); // remove item
            renderList();       // re-render
        });

        li.appendChild(delBtn);
        list.appendChild(li); //takes what the user has inputed (li) and adds to ul
    }

    count.textContent = "Total items: " + items.length; //just counting element
}

// 4. Add item function
function addItem() {
    const text = input.value.trim(); //reads what user inputs, .trim just cleans it up if the user has unnessary spaces

    if (text === "") return; // prevent empty items

    items.push(text); // add to array
    input.value = ""; // clear input
    input.focus();    // refocus input
    renderList();     // update UI
}

// event listeners - when the add button is clicked, run the addItem function
addBtn.addEventListener("click", addItem);

deleteAllBtn.addEventListener("click", function () {
    items = []; // clear array
    renderList();
});

// 
renderList();