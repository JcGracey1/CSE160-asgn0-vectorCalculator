const scale = 20;
let canvas, ctx;
function main() {
    canvas = document.getElementById('example');
    if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
    }

    ctx = canvas.getContext('2d');
    const v1 = new Vector3([3,3,0]);
    
    // Black square
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    drawVector(v1, "red");
}

function handleDrawEvent() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    let x = document.getElementById("x").value;
    let y = document.getElementById("y").value;
    const v1 = new Vector3([x,y,0]);
    drawVector(v1,"red");

    let x2 = document.getElementById("x2").value;
    let y2 = document.getElementById("y2").value;
    const v2 = new Vector3([x2,y2,0]);
    drawVector(v2,"blue");

    // third line based on input from selector:
    let operation = document.getElementById("operation-select").value;

    let v3 = new Vector3([0,0,0]);
    if (operation == "add") {
        v3 = v1.add(v2);
        drawVector(v3,"green");

    } else if (operation == "sub") {
        v3 = v1.sub(v2);
        drawVector(v3,"green");

    }
    let scalar = document.getElementById("scalar").value;
    let v4 = new Vector3([0,0,0]);
    if (operation == "mul") {
        v3 = v1.mul(scalar);
        v4 = v2.mul(scalar);
        drawVector(v3,"green");
        drawVector(v4,"green");
        console.log(scalar);

    } else if (operation == "div") {
        v3 = v1.div(scalar);        
        v4 = v2.div(scalar);
        drawVector(v3,"green");
        drawVector(v4,"green");

    }
    if (operation == "normalize"){
        v1.normalize();
        v2.normalize();
        drawVector(v1,"green");
        drawVector(v2,"green");
    }
    if (operation == "magnitude"){
        console.log("Magnitude V1: " + v1.magnitude());
        console.log("Magnitude V2: " + v2.magnitude());
    }
    if (operation == "angleBetween"){
        console.log("Angle between V1 and V2: " + angleBetween(v1,v2));
    }
    if (operation == "area"){
        console.log("Area between V1 and V2: " + areaTriangle(v1,v2));
    }
}

function drawVector(v, color) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(
        canvas.width / 2 + v.elements[0] * scale,
        canvas.height / 2 - v.elements[1] * scale
    );
    ctx.strokeStyle = color;
    ctx.stroke(); // draw the line
}

function angleBetween(v1, v2){
    //dot product dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha)
    angle = 0;
    angle = Math.acos(Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude()));
    // make this degrees not radians:
    angle = angle * (180 / Math.PI);
    return angle;
}

// ||v1 x v2]]  equals to the area of the parallelogram that the vectors span
function areaTriangle(v1, v2){
    area = 0;
    area = (1/2) * Vector3.cross(v1, v2).magnitude();
    return area;
}