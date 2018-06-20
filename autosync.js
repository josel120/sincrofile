var fs   = require("fs");
var path = require("path");
var ncp = require('ncp').ncp;
ncp.limit = 16;


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
/*
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

function filesCopy(filesTodo, urlTodoSource, urlTodoDestination){            
    //let pedazos = filesTodo.split('.');
    let fileSi = filesTodo[0];
    let filesNo = filesTodo[1];
    
    filesNo.forEach(element => {
        let pedazos = element.split('.');  
        if(pedazos[1]){
            fs.createReadStream(config.source+'\\'+element).pipe(fs.createWriteStream(config.destination+'\\'+element));
            //console.log('archivo normal');
        }
        else{
            //console.log('carpeta');
            
            urlTodoSource = urlTodoSource+'\\'+pedazos[0];
            urlTodoDestination = urlTodoDestination+'\\'+pedazos[0];
            console.log('urlTodoSource', urlTodoSource);
            console.log('urlTodoDestination', urlTodoDestination);
            fs.mkdirSync(urlTodoDestination);
            let filesTodo = crearArchivos(sourceFiles, sourceFiles);        
            
            filesCopy(filesTodo, urlTodoSource, urlTodoDestination);
            //fs.mkdirSync(config.destination+'\\'+pedazos[0]);
        }
    });
}
*/
console.log('config.source',config.source);
console.log('config.destination',config.destination);

var srcPath = config.source; //current folder
var destPath = config.destination; //Any destination folder
console.log('srcPath',srcPath);
console.log('destPath',destPath);
console.log('Copying files...');
ncp(srcPath, destPath, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('Copying files complete.');
  process.exit();
});

/*
if(pedazos[1]){
    fs.createReadStream(config.source+'\\'+element).pipe(fs.createWriteStream(config.destination+'\\'+element));
    //console.log('archivo normal');
}
else{
    //console.log('carpeta');
    urlTodo = config.destination+'\\'+pedazos[0];
    fs.mkdirSync(urlTodo);
    //fs.mkdirSync(config.destination+'\\'+pedazos[0]);
}
/*
fs.readdir(config.source, function (err, sourceFiles) {
    if (err) throw err;    
    fs.readdir(config.destination, function (err, destFiles) {
        if (err) throw err;    
        let files = dups(sourceFiles, destFiles);
        
        let filesTodo = crearArchivos(sourceFiles, destFiles);
        
       // let fileSi = filesTodo[0];
       // let filesNo = filesTodo[1];
        
        let urlTodo = '';
        console.log('sourceFiles',sourceFiles);
        console.log('destFiles',destFiles);
        //process.exit()
        filesCopy(filesTodo, config.source, config.destination);
        /*
        filesNo.forEach(element => {
            let pedazos = element.split('.');  
            if(pedazos[1]){
                fs.createReadStream(config.source+'\\'+element).pipe(fs.createWriteStream(config.destination+'\\'+element));
                //console.log('archivo normal');
            }
            else{
                //console.log('carpeta');
                urlTodo = config.destination+'\\'+pedazos[0];
                fs.mkdirSync(urlTodo);
                //fs.mkdirSync(config.destination+'\\'+pedazos[0]);
            }
                        
        });
        */
        /*
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
*/