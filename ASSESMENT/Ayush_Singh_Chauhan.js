// INPUTS
var subjects = 3;
var students =3;
var data = { "SubjectCode1":[ { "StudentId1": 60},{ "studentId2": 70 }, { "studentId3": 80 } ], "SubjectCode2": [ {  "StudentId1": 40 }, { "studentId2": 60 }, { "studentId3": 80 } ], "SubjectCode3": [ { "StudentId1": 30 }	, { "studentId2": 50 }, { "studentId3": 70} ] };
var num_obj = new Object(),average1=[];
var output=new Object();
data=JSON.stringify(data);

//FUNCTIONS
// check for duplicate subject
function subjectDuplicate(a,b){
    var ar = b.split("");
    for(var i in a){
      if(!(ar.indexOf(i)==ar.lastIndexOf(i))){
          return false;
      }
    } 
    return true;

}
// check student count for studentID mismatch
function checkStudentcount(frequency){
    
    for(var i in frequency){
        if(frequency[i]!=students){
            return false;
        }
    }
    return true;
}

// sorting the data
function sorting(output){
    const final={};
      const sortedKeys=Object.keys(output).sort((a,b)=>{
        const a1 =a.toLowerCase();
        const a2 =b.toLowerCase();
        if(a1<a2)return -1;
        if(a1>a2)return 1;
        return 0;
      });
      for(var i of sortedKeys){
        final[i]=output[i];
      }
      
      
      for(var i in final){
      final[i].sort((a,b)=>{
        const b1=Object.keys(a).toString().toLowerCase();
        const b2=Object.keys(b).toString().toLowerCase();
          if (b1 < b2) return -1;
          if (b1 > b2) return 1;
          return 0;
      })
    }
      return final;
  }
      
// testing duplicate student ids
function studentDuplicate(data){
    let flag = false;
    for (var i in data) {
        
      const frequency = {};
      data[i].forEach((val) => {
        const key = Object.keys(val);
        
        if (key in frequency) {
          frequency[key] += 1;
          flag = true;
        } else {
          frequency[key] = 1;
        }
        
      });
    }
    if (flag) {
      return false;
    } else {
      return true;
    }
   }

// Check Student ID mismatch  
function studentIdMismatch(data){
    let flag = false;
    const frequency = {};
    for (let i in data) {
      data[i].forEach((val) => {
        const key = Object.keys(val);
        
        if (key in frequency) {
          frequency[key] += 1;
          flag = true;
        } else {
          frequency[key] = 1;
        }
        
      });
    }
    if(frequency.length>students){
        return false;
    }
    else if(!(checkStudentcount(frequency))){
        return false;
    }
    else{
        return true;
    }
   }

//check wheather student is passed or not
function check_marks(a,b){
    var i,c=0,count=0;
    for(i of a){
        const [key] = Object.keys(i);
        
        if(i[key]<b[count]){
            c=1;
        }
        count++;
    }
    if(c==0){
        return true;
    }
    return false;
}

// To calculate average marks and create student object

function avg(){
    var k,m=0,n=0;
    for(var i in data_obj){
        k=0;
        
        for(var j of data_obj[i]){
            
            for(var l in j){
                
                k=k+j[l];
                var obj = new Object();
                obj[i] = j[l];
                
                num_obj[l][m]= obj;               
            }
            
        }
        m++;
        average1[n]=k/students;n++;      
        }
    }
// to validate json object
function isJsonObject(obj) {
    try {
        JSON.parse(obj);
        
    } catch (e) {
        return false;
    }
    return true;
}



// Checking value limit.
if(!(subjects<=5 && students<=100)){
    console.log("SUBJETS MUST BE LESS THAN 6 AND STUDENTS MUST BE LESS THAT 101");
    throw new Error("SUBJETS MUST BE LESS THAN 6 AND STUDENTS MUST BE LESS THAT 101");
    
} 

    
// validating json object
if(!(isJsonObject(data))){
    console.log("INVALID JSON input");
    throw new Error("INVALID JSON input");
}

// validating number of subjects
var data_obj = JSON.parse(data);   // parsing json data

if(!(subjects==Object.keys(data_obj).length)){
    console.log("Number of Subject Mismatch");
    throw new Error("Number of Subject Mismatch");
}

// validating number of students
var key;

for(key in data_obj){
    if(!(data_obj[key].length == students)){
        console.log("Number of Student Mismatch");
        throw new Error("Number of Student Mismatch");
    }
}

// validating duplicate subjects ids
var data_str = String(data);
if(!(subjectDuplicate(data_obj,data_str))){
    console.log("Duplicate Subjects");
    throw new Error("Duplicate Subjects");
}

// validating intra duplicate students ids
if(!(studentDuplicate(data_obj))){
    console.log("Duplicate StudentId");
    throw new Error("Duplicate StudentId");

}

// validating inter duplicate students ids
if(!(studentIdMismatch(data_obj))){
    console.log("StudentId mismatch");
    throw new Error("StudentId mismatch");

}


//printing output

//Flow of program starts here

const [firstKey] = Object.keys(data_obj); // initializing student object's key's value with empty array.
for(var i of data_obj[firstKey]){
     for(var j in i){
         num_obj[j]=[];
     }
 }
 


avg(data_obj);  // this method is creating student object  and average array of all subjects.



for(var i in num_obj){
    
    if(check_marks(num_obj[i],average1)){       //checkmarks function checks whether student is passed in all subjects or not
        
        output[i]=num_obj[i];
    }
    
}
output= sorting(output);
output = JSON.stringify(output);  // converting the data in JSON format.
console.log(output);