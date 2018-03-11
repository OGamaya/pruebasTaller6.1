function randomPalette(){
    var color = new Array(3);
    var colorHex = new Array(5);
    color[0] = Math.floor((Math.random() * 255));
    color[1] = Math.floor((Math.random() * 255));
    color[2] = Math.floor((Math.random() * 255));
    var hsv = rgbToHsv(color[0], color[1], color[2]);
    /* La documentación de Color.js asume que el valor de entrada en H está 
       entre 0 y 1, la variación de 5 colores que pide el ejercicio corresponde
       a un incremento de 0.2 */ 
    
    for (var i= 1; i <= 5; i++) {
        if (hsv[0] + (0.2) > 1) {
            var inc = (0.2)-1+hsv[0];
            hsv[0] = inc;
        }
        else 
            hsv[0] += (0.2);
        var rgb = hsvToRgb(hsv[0], hsv[1], hsv[2])
        normalizeToFloor(rgb);
        colorHex[i-1] = rgbToHex(rgb[0], rgb[1], rgb[2]).toUpperCase();
        $("#color"+i).css("background-color", "rgb("+rgb[0]+", "+rgb[1]+", "+rgb[2]+")");
       
    }
    generateRules (colorHex);
        
}

function normalizeToFloor(toNormalize){
    for (var index = 0; index < toNormalize.length; index++) {
        toNormalize[index] = Math.floor(toNormalize[index]);
    }
}

function clearPalette(){
    for (var i= 1; i <= 5; i++) {
        $("#color"+i).css("background-color", "rgb(255, 255, 255)");
    }
    var colorHex = new Array(5);
    colorHex[0] = "#FFFFFF";
    colorHex[1] = "#FFFFFF";
    colorHex[2] = "#FFFFFF";
    colorHex[3] = "#FFFFFF";
    colorHex[4] = "#FFFFFF";
    generateRules(colorHex);
}

function generateRules(color){
    var end = ";}";
    var pageBackground = ".website-background{ color: "+color[0]+end;
    var elementText = ".element-text{ color: "+color[1]+end;
    var elementBorder = ".element-border{ border-color: "+color[2]+end;
    var elementBackground = ".element-background{ background-color: "+color[3]+end;
    var header = ".header{ color: "+color[4]+end;
   
    $("#css-rules").text("\n"+
        pageBackground +"\n\n"+
        elementText  +"\n\n"+
        elementBorder +"\n\n"+
        elementBackground +"\n\n"+
        header
    );
}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
