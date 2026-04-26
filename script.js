const canvas = new fabric.Canvas('certCanvas', {
    width: 600, 
    height: 400 
});

const imageLoader = document.getElementById('imageLoader');
const addBoxBtn = document.getElementById('addBoxBtn');
const nextStepBtn = document.getElementById('nextStepBtn');

const step1Div = document.getElementById('step1');
const step2Div = document.getElementById('step2');
const csvLoader = document.getElementById('csvLoader');
const generateBtn = document.getElementById('generateBtn');

let boxCounter = 1; 

let certificateData = {
    templateImage: null,
    boxes: {}
};

imageLoader.addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const imgObj = new Image();
        imgObj.src = event.target.result;
        
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

nextStepBtn.addEventListener('click', function() {
    const objects = canvas.getObjects();
    
    if (objects.length === 0) {
        alert("Please add at least one box before moving to the next step!");
        return;
    }

    objects.forEach(obj => {
        if (obj.id && obj.id.startsWith('n')) {
            certificateData.boxes[obj.id] = {
                x: Math.round(obj.left),
                y: Math.round(obj.top),
                width: Math.round(obj.width * obj.scaleX), 
                height: Math.round(obj.height * obj.scaleY)
            };
        }
    });

    console.log("Extracted Coordinates:", certificateData.boxes);

    step1Div.classList.add('hidden');
    step2Div.classList.remove('hidden');
});

csvLoader.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        generateBtn.disabled = false;
    }
});

generateBtn.addEventListener('click', function() {
    alert("In the next step, we will read the CSV and send all this data to our Python backend!");
});