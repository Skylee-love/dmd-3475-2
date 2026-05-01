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
   },
   {
      name: "Denim Skirt with Sequins",
      image: "https://i.pinimg.com/736x/e2/43/78/e24378da0e3b73926ba66557ebc84b59.jpg",
      tags: ["casual", "skirt", "sequins", "patching", "bottoms"]
   },
   {
      name: "Pink Ruffle Top",
      image: "https://i.pinimg.com/736x/bc/74/b2/bc74b2f48955472a009bdac83731744c.jpg",
      tags: ["feminine", "top", "pink", "ruffles", "tops"]
   },
   {
    name: "Denim Jacket",
    image: "https://i.pinimg.com/1200x/31/d1/1e/31d11eefd1089519fa8d0b909fe4c057.jpg",
    tags: ["casual", "outerwear", "denim"]
   },
   {
    name: "Ladybug Tee",
    image: "https://i.pinimg.com/736x/c6/2f/62/c62f629bc17d9ca7abbcf055b1267ac8.jpg",
    tags: ["casual", "top", "ladybug", "red", "white", "tops"]
   },
   {
    name: "Leather Boots",
    image: "https://i.pinimg.com/736x/b9/92/71/b992710e30f483ec3a0f4f497e996238.jpg",
    tags: ["grunge", "shoes", "leather", "black"]
   },
   {
    name: "Jeans",
    image: "https://i.pinimg.com/736x/1e/77/dd/1e77dd145366be05eaa5bb60a30f26e6.jpg",
    tags: ["casual", "pants", "denim", "bottoms"]
   }
]

let currentOutfit = [];

let savedOutfits = [];

const savedOutfit = localStorage.getItem("currentOutfit");

if (savedOutfit) {
  currentOutfit = JSON.parse(savedOutfit);
}

const wardrobeGrid = document.getElementById("wardrobeGrid");
const searchInput = document.getElementById("searchInput");
const outfitArea = document.getElementById("outfitArea");
const saveOutfitBtn = document.getElementById("saveOutfitBtn");
const outfitNameInput = document.getElementById("outfitName");
const savedOutfitsGrid = document.getElementById("savedOutfitsGrid");

let inspoItems = [];

// grab inspo
const loadInspoBtn = document.getElementById("loadInspoBtn");
const inspoGrid = document.getElementById("inspoGrid");

// FETCH 
loadInspoBtn.addEventListener("click", () => {
  fetch("https://dummyjson.com/products/category/womens-dresses")
    .then(response => response.json())
    .then(data => {
      inspoItems = [];

      data.products.forEach(product => {
        const inspoItem = {
          name: product.title,
          image: product.thumbnail,
          category: product.category,
          color: "unknown",
          tags: [product.category, "inspo"]
        };

        inspoItems.push(inspoItem);
      });

      renderInspoItems();
    });
});

// RENDER INSPO CArds
function renderInspoItems() {
  inspoGrid.innerHTML = "";

  inspoItems.forEach(item => {
    inspoGrid.innerHTML += `
      <div class="inspo-card">
        <img src="${item.image}" alt="${item.name}" />
        <p>${item.name}</p>
      </div>
    `;
  });
}

const clearOutfitBtn = document.getElementById("clearOutfitBtn");
clearOutfitBtn.addEventListener("click", () => {
  currentOutfit = [];
  localStorage.setItem("currentOutfit", JSON.stringify(currentOutfit));
  renderOutfit();
});

const sortNameBtn = document.getElementById("sortNameBtn");
sortNameBtn.addEventListener("click", () => {
  wardrobe.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  renderWardrobe();
});

// STEP 1: make a function that displays items
function renderWardrobe() {
  wardrobeGrid.innerHTML = "";

  
  wardrobe.forEach(item => {

    let tagsHTML = "";

    item.tags.forEach(tag => {
      tagsHTML += `<span class="tag">#${tag}</span>`;
    });

    wardrobeGrid.innerHTML += `
      <div class="card">
        <img src="${item.image}" alt="${item.name}"/>
        <p>${item.name}</p>
        <div class="tags-container">${tagsHTML}</div>
        <button onclick="addToOutfit('${item.name}')">Add to Outfit</button>
      </div>
    `;
  });
}


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
        <button onclick="addToOutfit('${item.name}')">Add to Outfit</button>
      </div>
    `;
  });
} 

function addToOutfit(itemName) {
  const selectedItem = wardrobe.find(item => item.name === itemName);

  const alreadyInOutfit = currentOutfit.some(item => item.name === itemName);

  if (alreadyInOutfit) {
    alert("This item is already in your outfit!");
    return;
  }

    currentOutfit.push(selectedItem);

    localStorage.setItem("currentOutfit", JSON.stringify(currentOutfit));

    renderOutfit();
  
}



function renderOutfit() {
  outfitArea.innerHTML = "";

  currentOutfit.forEach((item, index) => {
    outfitArea.innerHTML += `
      <div class="outfit-item">
        <img src="${item.image}" alt="${item.name}" />
        <p>${item.name}</p>
        <button onclick="removeFromOutfit(${index})">Remove</button>
      </div>
    `;
  });
}

function renderSavedOutfits() {
  savedOutfitsGrid.innerHTML = "";

  savedOutfits.forEach(outfit => {
    let outfitItemsHTML = "";

    outfit.items.forEach(item => {
      outfitItemsHTML += `
        <img src="${item.image}" alt="${item.name}" />
      `;
    });

    savedOutfitsGrid.innerHTML += `
      <div class="saved-outfit-card">
        <h4>${outfit.name}</h4>
        <div class="saved-outfit-images">
          ${outfitItemsHTML}
        </div>
      </div>
    `;
  });
}

saveOutfitBtn.addEventListener("click", () => {
  if (currentOutfit.length === 0) {
    alert("Add items before saving an outfit!");
    return;
  }

  const savedOutfit = {
    name: outfitNameInput.value || "Untitled Outfit",
    items: [...currentOutfit]
  };

  savedOutfits.push(savedOutfit);

  renderSavedOutfits();

  currentOutfit = [];
  localStorage.setItem("currentOutfit", JSON.stringify(currentOutfit));
  outfitNameInput.value = "";
  renderOutfit();
});

function removeFromOutfit(index) {
  currentOutfit.splice(index, 1);

  localStorage.setItem("currentOutfit", JSON.stringify(currentOutfit));

  renderOutfit();
}

renderWardrobe();
renderOutfit();


//add item feature!!!!

const itemNameInput = document.getElementById("itemName");
const itemColorInput = document.getElementById("itemColor");
const itemImageInput = document.getElementById("itemImage");
const itemTagsInput = document.getElementById("itemTags");
const itemCategoryInput = document.getElementById("itemCategory");

const saveItemBtninput = document.getElementById("saveItemBtn");

saveItemBtninput.addEventListener("click", () => {

const name = itemNameInput.value;
const color = itemColorInput.value;
const image = itemImageInput.value;
const category = itemCategoryInput.value;
const tags = itemTagsInput.value.split(",").map(tag => tag.trim());

const newItem = {
  name: name,
  color: color,
  image: image,
  tags: tags,
  category: category
};

wardrobe.push(newItem);

renderWardrobe();

itemNameInput.value = "";
itemImageInput.value = "";
itemColorInput.value = "";
itemCategoryInput.value = "tops"; // default
itemTagsInput.value = "";

});


addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    saveItemBtninput.click();
  }
});

const filterButtons = document.querySelectorAll("[data-filter]");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filterValue = button.dataset.filter;

    if (filterValue === "all") {
      renderWardrobe();
      return;
    }

    const filteredItems = wardrobe.filter(item => {
      return item.category === filterValue || item.tags.includes(filterValue);
    });

    renderFilteredItems(filteredItems);
  });
});

