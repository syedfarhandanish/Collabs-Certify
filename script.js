const canvas = new fabric.Canvas('certCanvas', {
    width: 600, 
    height: 400 
});

const imageLoader = document.getElementById('imageLoader');
const addBoxBtn = document.getElementById('addBoxBtn');
const nextStepBtn = document.getElementById('nextStepBtn');

// Step 2 Elements
const step1Div = document.getElementById('step1');
const step2Div = document.getElementById('step2');
const csvLoader = document.getElementById('csvLoader');
const generateBtn = document.getElementById('generateBtn');

let boxCounter = 1; 

// We will store the exact positions of n1, n2, n3 here
let certificateData = {
    templateImage: null,
    boxes: {}
};

// 1. Image Upload Logic
imageLoader.addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const imgObj = new Image();
        imgObj.src = event.target.result;
        
        // Save the image data string so we can send it to Python later
        certificateData.templateImage = event.target.result;

        imgObj.onload = function () {
            const image = new fabric.Image(imgObj);
            canvas.setWidth(image.width);
            canvas.setHeight(image.height);
            canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
            
            addBoxBtn.disabled = false;
            nextStepBtn.disabled = false;
        }
    }
    reader.readAsDataURL(e.target.files[0]);
});

// 2. Add Box Logic
addBoxBtn.addEventListener('click', function() {
    if (boxCounter > 3) {
        alert("You have already added all 3 boxes (n1, n2, n3)!");
        return;
    }

    const boxName = `n${boxCounter}`; 
    
    const rect = new fabric.Rect({
        left: 0, top: 0, width: 200, height: 40,
        fill: 'rgba(0, 123, 255, 0.3)', 
        stroke: '#007bff', strokeWidth: 2
    });

    const text = new fabric.Text(boxName, {
        fontSize: 20, fill: '#000', left: 10, top: 10,
    });

    const group = new fabric.Group([rect, text], {
        left: 100 + (boxCounter * 30), 
        top: 100 + (boxCounter * 30),
        id: boxName, 
        cornerColor: 'red', cornerSize: 10, transparentCorners: false
    });

    canvas.add(group);
    canvas.setActiveObject(group);
    
    boxCounter++; 
});

// 3. Move to Step 2 (Extract Coordinates)
nextStepBtn.addEventListener('click', function() {
    const objects = canvas.getObjects();
    
    // Check if they added at least one box
    if (objects.length === 0) {
        alert("Please add at least one box before moving to the next step!");
        return;
    }

    // Loop through all items on the canvas and extract their positions
    objects.forEach(obj => {
        if (obj.id && obj.id.startsWith('n')) {
            certificateData.boxes[obj.id] = {
                x: Math.round(obj.left),
                y: Math.round(obj.top),
                width: Math.round(obj.width * obj.scaleX), // Account for resizing
                height: Math.round(obj.height * obj.scaleY)
            };
        }
    });

    console.log("Extracted Coordinates:", certificateData.boxes);

    // Hide Step 1, Show Step 2
    step1Div.classList.add('hidden');
    step2Div.classList.remove('hidden');
});

// 4. CSV Upload Logic
csvLoader.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        generateBtn.disabled = false;
    }
});

generateBtn.addEventListener('click', function() {
    alert("In the next step, we will read the CSV and send all this data to our Python backend!");
});