var fs   = require("fs");
var path = require("path");


var configFile = "example.json";
if (process.argv.length == 3) {
    configFile = process.argv[2];
}
var config = JSON.parse(fs.readFileSync(configFile, "UTF-8"));

config.repatterns = [];
for (var i = 0; i < config.patterns.length; i++) {
    config.repatterns.push(new RegExp(config.patterns[i], "i"));    
}


console.log("------------------------------------------");
console.log("Autosync - Revision");
console.log("------------------------------------------");
console.log("Source:      " + config.source);
console.log("Destination: " + config.destination);
console.log("Patterns:    " + config.repatterns);
console.log("------------------------------------------");

function crearArchivos(a,b){
    var r = [];
    var debeCrear = [];
    for(let key in a){
        for(let key2 in b){
            if(a[key] === b[key2]){
                r.push(a[key]);
                break;            
            }else{
                if(key2 == (b.length -1)){
                    debeCrear.push(a[key]);
                }
            }
        }
    }
    return [r,debeCrear];
}

function dups(a, b) {
    var i = 0;
    var j = 0;
    var r = [];   
    
    a.sort();
    b.sort();
    
    while (i < a.length && j < b.length) {
        if (a[i] == b[j]) {
            r.push(a[i]);
            i++;
            j++;
        }
        else {
            if (a[i] < b[j]){
                i++;
            }
            else{
                j++;
            }           
        }        
    }    
    return r;
}

function copy(source, dest, cb) {
    var rs = fs.createReadStream(source);
    var ws = fs.createWriteStream(dest);
    
    rs.pipe(ws);
    ws.on("end", cb);
}

function watchFile(source, dest) {
    var file = path.basename(source);
    console.log("watching " + file);
    console.log("fuente " + source);
    console.log("destino " + dest);
    fs.watchFile(source, function (curr, prev) {
        copy(source, dest, function (err) {            
            if (err) {
                console.log("failed to copy " + file);
                // TODO retry?
            }
            else {
                console.log("copied " + file);
            }
        });
    });
}

fs.readdir(config.source, function (err, sourceFiles) {
    if (err) throw err;    
    fs.readdir(config.destination, function (err, destFiles) {
        if (err) throw err;    
        var files = dups(sourceFiles, destFiles);
        var filesTodo = crearArchivos(sourceFiles, destFiles);
        let fileSi = filesTodo[0];
        let filesNo = filesTodo[1];

        filesNo.forEach(element => {
            //console.log('element',element);
            let pedazos = element.split('.') 
            if(pedazos[1]){
                fs.createReadStream(config.source+'\\'+element).pipe(fs.createWriteStream(config.destination+'\\'+element));
                //console.log('archivo normal');
            }
            else{
                //console.log('carpeta');
                fs.mkdirSync(config.destination+'\\'+pedazos[0]);
            }
                        
        });
        for (var i = 0; i < files.length; i++) {
            for (var j = 0; j < config.repatterns.length; j++) {
                if (files[i].match(config.repatterns[j])) {
                    var sourceFile = path.join(config.source, files[i]);
                    var destFile = path.join(config.destination, files[i]);
                    watchFile(sourceFile, destFile);
                }
            }
        }        
    });
});