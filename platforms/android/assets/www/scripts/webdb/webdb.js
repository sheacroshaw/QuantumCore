(function(window){
    
    function webdb(){
        var dbSize = 5 * 1024 * 1024; // 5MB      
        
        //name, version, description and the size of the database
        this.db = openDatabase("qdb", "1", "lets save some settings", dbSize);

        this.db.transaction(function(tx) {
          tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                        "settings(ID INTEGER PRIMARY KEY ASC, settings TEXT)", []);
          tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                        "shift_detail(ID INTEGER PRIMARY KEY ASC, shift_detail TEXT)", []);
          tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                        "codes(ID INTEGER PRIMARY KEY ASC, codes TEXT)", []);

          tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                        "assets(ID INTEGER PRIMARY KEY ASC, assets TEXT)", []);
          tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                        "login(ID INTEGER PRIMARY KEY ASC, login TEXT)", []);
          tx.executeSql("CREATE TABLE IF NOT EXISTS " +
                        "locals(ID INTEGER PRIMARY KEY ASC, locals TEXT)", []);
        });     


    };//end fn declaration webdb

    webdb.prototype.statements = {
        "insert_settings"       : "INSERT INTO settings(settings) VALUES (?)",
        "insert_shift_detail"   : "INSERT INTO shift_detail(shift_detail) VALUES (?)",
        "insert_codes"          : "INSERT INTO codes(codes) VALUES (?)",
        "insert_assets"         : "INSERT INTO assets(assets) VALUES (?)",
        "insert_login"          : "INSERT INTO login(login) VALUES (?)",
        "insert_locals"          : "INSERT INTO locals(locals) VALUES (?)",

        "clear_settigns"        : "DELETE FROM settings",
        "clear_shift_detail"    : "DELETE FROM shift_detail",
        "clear_codes"           : "DELETE FROM codes",
        "clear_assets"          : "DELETE FROM assets",
        "clear_login"           : "DELETE FROM login",
        "clear_locals"          : "DELETE FROM locals",

        "select_settings"       : "SELECT * FROM settings",
        "select_detail"         : "SELECT * FROM shift_detail",
        "select_codes"          : "SELECT * FROM codes",
        "select_assets"         : "SELECT * FROM assets",
        "select_login"          : "SELECT * FROM login",
        "select_locals"          : "SELECT * FROM locals"

    };


    /***
        the basic function that handle CRUD operations 
    ***/
    webdb.prototype.insert = function(statement,setObj,cb){
        if (!cb) {
            var cb = function(){}
        }
        this.db.transaction(function(tx){
            tx.executeSql(statement,
                [JSON.stringify(setObj)],
                function(){
                    cb(JSON.stringify(setObj))
                },
                function(t,e){console.log('nope',e)});
        });
    }; // end insert

    webdb.prototype.select = function(statement, cb){
        this.db.transaction(function(tx) {
            tx.executeSql(statement, [], cb,
                function(t,e){console.log('nope',e)});
        });
    }; // end select

    webdb.prototype.clear = function  (statement, callback) {
        if (!callback)
            callback = function(){};

        this.db.transaction(function(tx) {
            tx.executeSql(statement, [], callback,
                function(t,e){console.log('nope',e)});
        });
    }; // end clearSettings




    /***
        Convenience wrappers for the crud stuff
    ***/

    //codes
    webdb.prototype.setCodes = function(setObj, cb){
        var stmt = this.statements['insert_codes'];
        this.insert(stmt,setObj);
    }; // end setCodes
    webdb.prototype.clearCodes = function (callback){
        var stmt = this.statements['clear_codes'];
        this.clear(stmt, callback);
    }; // end clearCodes
    webdb.prototype.getCodes = function(callback){
        var stmt = this.statements['select_codes'];
        this.select(stmt, callback);
    }; // end getCodes
    

    //assets
    webdb.prototype.setAssets = function(setObj, callback){
        var stmt = this.statements['insert_assets'];
        this.insert(stmt,setObj,callback);
    }; // end setCodes
    webdb.prototype.clearAssets = function (callback){
        var stmt = this.statements['clear_assets'];
        this.clear(stmt, callback);
    }; // end clearCodes
    webdb.prototype.getAssets = function(callback){
        var stmt = this.statements['select_assets'];
        //console.log('ill ask for', stmt)
        this.select(stmt, callback);
    }; // end getCodes


    //settings
    webdb.prototype.setSettings = function(setObj, cb){
        var stmt = this.statements['insert_settings'];
        this.insert(stmt, setObj, cb);
    }; // end setSettings
    webdb.prototype.clearSettings = function  (callback) {
        
        var stmt = this.statements['clear_settigns'];
        this.clear(stmt, callback);
    }; // end clearSettings   
    webdb.prototype.getSettings = function(callback){
        var stmt = this.statements['select_settings'];
        this.select(stmt, callback);
    }; // end getSettings


    //shift details
    webdb.prototype.setShiftDetails = function(setObj, cb){
        console.log('this is the setObj',setObj);
        var stmt = this.statements['insert_shift_detail'];
        this.insert(stmt, setObj,cb);
    };    
    webdb.prototype.clearDetail = function  (callback) {     
        console.log('clearing');   
        var stmt = this.statements['clear_shift_detail'];
        this.clear(stmt, callback);
    };     
    webdb.prototype.getDetail = function(callback){
        var stmt = this.statements['select_detail'];
        this.select(stmt, callback);
    }; // end getSettings


    //login info 
    webdb.prototype.setLogin = function(setObj, cb){
        console.log('this is the setObj',setObj);
        var stmt = this.statements['insert_login'];
        this.insert(stmt, setObj,cb);
    };    
    webdb.prototype.clearLogin = function  (callback) {     
        console.log('clearing');   
        var stmt = this.statements['clear_login'];
        this.clear(stmt, callback);
    };     
    webdb.prototype.getLogin = function(callback){
        var stmt = this.statements['select_login'];
        this.select(stmt, callback);
    }; // end getSettings


    //locals info 
    webdb.prototype.setLocals = function(setObj, cb){
        console.log('this is the setObj',setObj);
        var stmt = this.statements['insert_locals'];
        this.insert(stmt, setObj,cb);
    };    
    webdb.prototype.clearLocals = function  (callback) {     
        console.log('clearing');   
        var stmt = this.statements['clear_locals'];
        this.clear(stmt, callback);
    };     
    webdb.prototype.getLocals = function(callback){
        var stmt = this.statements['select_locals'];
        this.select(stmt, callback);
    }; // end getSettings    
    

    // attach the the webdb to the window so we can get to it
    // anywhere in the angular app 
    window.webdb = new webdb();

})(window)