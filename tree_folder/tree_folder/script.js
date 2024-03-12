const folderStructure = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 3.txt", type: "file" }],
    },
  ],
};

function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);
  if (item.type === "folder" && item.children) {
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      element.appendChild(childElement);
    });
  }
  return element;
}

const folderTree = document.getElementById("folderTree");
const treeElement = createTreeElement(folderStructure);
folderTree.appendChild(treeElement);

// Add button for adding a new folder
const newFolderBtn = document.getElementById("newFolderBtn");
newFolderBtn.addEventListener("click", () => {
  const folderName = prompt("Enter folder name:");
  if (folderName) {
    const currentFolder = treeElement.querySelector(".folder");
    const newFolder = { name: folderName, type: "folder", children: [] };
    const newFolderElement = createTreeElement(newFolder);
    currentFolder.appendChild(newFolderElement);
    addRemoveHandler(newFolderElement, "folder");
  }
});

// Add button for renaming a folder
const renameBtn = document.getElementById("renameBtn");
renameBtn.addEventListener("click", () => {
  const folderToRename = prompt("Enter the name of the folder to rename:");
  if (folderToRename) {
    const folderElement = treeElement.querySelector(
      `.folder:contains(${folderToRename})`
    );
    if (folderElement) {
      const newFolderName = prompt("Enter the new name for the folder:");
      if (newFolderName) {
        folderElement.textContent = newFolderName;
      }
    } else {
      alert("Folder not found!");
    }
  }
});

// Show file add section when a folder is clicked
folderTree.addEventListener("click", (event) => {
  const target = event.target;
  if (
    target &&
    (target.classList.contains("folder") || target.classList.contains("file"))
  ) {
    const confirmationModal = document.getElementById("confirmationModal");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const itemType = target.classList.contains("folder") ? "folder" : "file";
    confirmationMessage.textContent = `Remove "${target.textContent}"?`;
    const confirmRemoveBtn = document.getElementById("confirmRemoveBtn");
    confirmRemoveBtn.onclick = () => {
      target.remove();
      confirmationModal.modal("hide");
    };
    $("#confirmationModal").modal("show");
  }
});

// Function to add a remove handler to an element
function addRemoveHandler(element, itemType) {
  element.addEventListener("click", () => {
    const confirmationModal = document.getElementById("confirmationModal");
    const confirmationMessage = document.getElementById("confirmationMessage");
    confirmationMessage.textContent = `Remove "${element.textContent}"?`;
    const confirmRemoveBtn = document.getElementById("confirmRemoveBtn");
    confirmRemoveBtn.onclick = () => {
      element.remove();
      confirmationModal.modal("hide");
    };
    $("#confirmationModal").modal("show");
  });
}
