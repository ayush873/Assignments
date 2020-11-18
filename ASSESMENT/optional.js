// Validation of subject keys and student id's
var subjects = 3;
var students =3;
var sub_code=["HIN", "ENG","MAT","COU","PHY","BIO","CHE","HIS","GEO"];
var data = '{ "HIN": [ { "ABc034": 60},{ "QWE056": 70 }, { "TYU100": 80 } ], "ENG": [ {  "ABc034": 40 }, { "QWE056": 60 }, { "TYU067": 80 } ], "MAT": [ { "ABc034": 30 }	, { "QWE056": 50 }, { "ABc034": 70} ] }';
var data_obj=JSON.parse(data);


// subject id validation

for(var i in data_obj){
    
    if(!(sub_code.includes(String(i)))){
        console.log("WRONG SUBJECT ID.");
        throw new Error("WRONG SUBJECT ID.");
    }
}


// Student ID validation
var re = /[a-zA-Z]{3}?[0][0-9]{2}|[100]/;
for(var i in data_obj){
    for(var j of data_obj[i]){
        for(k in j){
            var p = String(k);
           
            if(!(re.test(p))){
                console.log("WRONG STUDENT ID.");
                throw new Error("WRONG STUDENT ID.");
            }

        }
    }
}

console.log(" ALL SUBJECT IDS AND STUDENT IDS ARE FINE");
