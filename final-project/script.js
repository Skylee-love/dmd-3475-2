//list of wardrobe items
const wardrobe = [
  { name: "Leather Jacket",
    image: "https://i.pinimg.com/1200x/76/68/75/766875fa94c48c9bfbd5fa591d00e1a0.jpg",
    tags: ["grunge", "outerwear", "black"]
   },
  { name: "Flower Shoes",
    image: "https://i.pinimg.com/1200x/0e/37/53/0e3753c034c2ba18c37cfb0cc2e5a193.jpg",
    tags: ["casual", "shoes"]
   },
  { name: "Ladybug Purse",
    image: "https://i.pinimg.com/1200x/35/65/8f/35658f79a3b3496b801951aeae9f72ab.jpg",
    tags: ["bag", "accessories"]
   }
];

let currentOutfit = [];

const wardrobeGrid = document.getElementById("wardrobeGrid");

// STEP 1: make a function that displays items
function renderWardrobe() {
  wardrobeGrid.innerHTML = "";

  //Go through the wardrobe list, and for each thing, call it item
  wardrobe.forEach(item => {

    let tagsHTML = "";

    item.tags.forEach(tag => {
      tagsHTML += `<span class="tag">#${tag}</span>`;
    });

    wardrobeGrid.innerHTML += `
      <div class="card">
        <img src="${item.image}" alt="${item.name}"/>
        <p>${item.name}</p>
        <div>${tagsHTML}</div>
        <button onclick="addToOutfit('${item.name}')">Add to Outfit</button>
      </div>
    `;
  });
}

// run it once
renderWardrobe();

//search function

//debug section -

//const searchInput = document.getElementById("searchInput");

//searchInput.addEventListener("input", () => {
//  console.log("filter starting");

//  const filteredItems = wardrobe.filter(item => {
//    console.log("checking item:", item.name);
//    return true;
//  });

//  renderFilteredItems(filteredItems);
//});

//const filteredItems = wardrobe.filter(item => {
//  console.log("inside filter");

//  const tagMatches = item.tags.some(tag => {
//    console.log("checking tag:", tag);
//    return true;
//  });

//  return tagMatches;
//});

//final search function

searchInput.addEventListener("input", () => {
 const searchValue = searchInput.value.toLowerCase();

const filteredItems = wardrobe.filter(item => {
   const nameMatches = item.name.toLowerCase().includes(searchValue);

 const tagMatches = item.tags.some(tag => {
   console.log("Checking tag:", tag);
   return tag.toLowerCase().includes(searchValue);
});

return nameMatches || tagMatches;
 });

renderFilteredItems(filteredItems);
});


function renderFilteredItems(items) {
  wardrobeGrid.innerHTML = "";

  if (items.length === 0) {
    wardrobeGrid.innerHTML = "<p>No items found.</p>";
    return;
  }

  items.forEach(item => {

    let tagsHTML = "";

    item.tags.forEach(tag => {
      tagsHTML += `<span class="tag">#${tag}</span>`;
    });

    wardrobeGrid.innerHTML += `
      <div class="card">
        <img src="${item.image}" alt="${item.name}"/>
        <p>${item.name}</p>
        <div>${tagsHTML}</div>
      </div>
    `;
  });
} 

function addToOutfit(itemName) {
  const selectedItem = wardrobe.find(item => item.name === itemName);

    currentOutfit.push(selectedItem);

    console.log("Added to outfit:", currentOutfit);
  
}

