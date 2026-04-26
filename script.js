const canvas = new fabric.Canvas('certCanvas', {
    width: 600, 
    height: 400 
});

const imageLoader = document.getElementById('imageLoader');
const addBoxBtn = document.getElementById('addBoxBtn');
const nextStepBtn = document.getElementById('nextStepBtn');

let boxCounter = 1; 

imageLoader.addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const imgObj = new Image();
        imgObj.src = event.target.result;
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
        left: 0,
        top: 0,
        width: 200,
        height: 40,
        fill: 'rgba(0, 123, 255, 0.3)', 
        stroke: '#007bff',
        strokeWidth: 2
    });

    const text = new fabric.Text(boxName, {
        fontSize: 20,
        fill: '#000',
        left: 10,
        top: 10,
    });

    const group = new fabric.Group([rect, text], {
        left: 100 + (boxCounter * 30), 
        top: 100 + (boxCounter * 30),
        id: boxName, 
        cornerColor: 'red',
        cornerSize: 10,
        transparentCorners: false
    });

    canvas.add(group);
    canvas.setActiveObject(group);
    
    boxCounter++; 
});

nextStepBtn.addEventListener('click', function() {
    alert("In the next step, we will extract the X and Y coordinates of your boxes and switch to the CSV upload page!");
});