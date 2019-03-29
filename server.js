var express = require('express');
var app = express();
const fs = require('fs');

/********** REGISTRATION **********/
app.get('/register/:username/:mod', function(req, res) {
    REG_DIR = __dirname+'/users/'+req.params.username+'/'
    if (!fs.existsSync(REG_DIR)){
        fs.mkdirSync(REG_DIR);
    }

    fs.writeFile(REG_DIR+'mod.txt', req.params.mod, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
    res.send('REGISTRATION OK');
});


/********** GET MODULUS **********/
app.get('/getmod/:username/', function(req, res) {
    REG_DIR = __dirname+'/users/'+req.params.username+'/'
    if (!fs.existsSync(REG_DIR)){
        res.send('USER NOT FOUND');
        return console.log("USER NOT FOUND");
    } else {
        fs.readFile(REG_DIR+'mod.txt', (err, mod) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(mod);
            res.end();
        });
    }
});


/********** INCOMING MESSAGE **********/
app.get('/send/:message/:time/:username', function(req, res) {
    REG_DIR = __dirname+'/users/'+req.params.username+'/'
    MSG_DIR = REG_DIR + 'messages/' 
    if (!fs.existsSync(REG_DIR)){
        res.send('USER NOT FOUND');
        return console.log("USER NOT FOUND");
    } else {
        if (!fs.existsSync(MSG_DIR)){
            fs.mkdirSync(MSG_DIR);
        } else {
            fs.writeFile(MSG_DIR+req.params.time+'.json', req.params.message, function(err) {
                if(err) {
                    return console.log(err);
                }
            }); 
            res.send('SEND OK');
        }
    }
});


/********** GET MESSAGE LIST **********/
app.get('/recv/list/:username', function(req, res) {
    REG_DIR = __dirname+'/users/'+req.params.username+'/'
    MSG_DIR = REG_DIR + 'messages/' 
    if (!fs.existsSync(REG_DIR)){
        res.send('USER NOT FOUND');
        return console.log("USER NOT FOUND");
    } else {
        if (!fs.existsSync(MSG_DIR)){
            fs.mkdirSync(MSG_DIR);
        } else {
            var list = {};
            fs.readdir(MSG_DIR, function (err, files) {
                //handling error
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                } 
                //listing all files using forEach
                // files.forEach(function (file) {
                // });
                res.json(files);
                console.log(files);
            });
            
        }
    }
});

/********** GET MESSAGE **********/
app.get('/recv/:time/:username', function(req, res) {
    REG_DIR = __dirname+'/users/'+req.params.username+'/'
    MSG_DIR = REG_DIR + 'messages/' 
    if (!fs.existsSync(REG_DIR)){
        res.send('USER NOT FOUND');
        return console.log("USER NOT FOUND");
    } else {
        if (!fs.existsSync(MSG_DIR)){
            fs.mkdirSync(MSG_DIR);
        } else {
            if (fs.existsSync(MSG_DIR+req.params.time+'.json')) {
                res.download(MSG_DIR+req.params.time+'.json')
            } else {
                res.send('FILE NOT FOUND');
            }

        }
    }
});





app.listen(3000);



