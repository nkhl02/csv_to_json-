const readline = require('readline');
const fs = require('fs');
let aggregate=[];
let commercial_count=0;
var result_particulars=[];
var result_particulars_Foodgrains=[]; 
var result_particulars_Commercial=[];
var result_2013=[];  
var result_2013_Foodgrains=[];      
var result_2013_Commercial=[];  
var result_2013_sort=[];
var result_2013_sort_Foodgrains=[];   
var result_2013_sort_Commercial=[];
var result_year_Commercial=[];
let arr,Rice=[],states=[],head=[],particulars,out=[],year;
let writeOutput=fs.createWriteStream('../JSON/json_aggri_Oilseeds.json');
let writeOutput2=fs.createWriteStream('../JSON/json_aggri_Foodgrains.json');
let writeOutput3=fs.createWriteStream('../JSON/Commercial_Aggregate.json');
let writeOutput4=fs.createWriteStream('../JSON/Rice.json');
const rl = readline.createInterface({
  input: fs.createReadStream('../CSV/prod.csv','utf8')
});
rl.on('line', (line)=>{
arr=line.split(/,(?![^"]*"(?:(?:[^""]*"){2})*[^"]*$)/);
  if(/Rice/.test(arr[0])){
    if((/Tamil Nadu/.test(arr[0]))||(/Kerala/.test(arr[0]))||(/Andhra Pradesh/.test(arr[0]))||(/Karnataka/.test(arr[0]))){
      Rice.push(arr[0]);
      states.push(arr);
    }
  }
 if(/Particulars/.test(arr[0])) {
    head = arr;
  }
if(arr.includes("Particulars"))
particulars=arr.indexOf("Particulars");
if(arr.includes(" 3-2013"))
year=arr.indexOf(" 3-2013");
if(/Commercial/.test(arr[0])) {
       aggregate.push(arr);
       commercial_count++;
  }
if(/Oilseeds/.test(arr[particulars]))
{
result_particulars.push(arr[particulars]);
if(arr[year]=="NA")
 {
  result_2013.push(0);
  fun=result_2013;
}
else
{
result_2013.push(arr[year]);
}
}
if(/Foodgrains/.test(arr[particulars]))
{
result_particulars_Foodgrains.push(arr[particulars]);
if(arr[year]=="NA")
 {
  result_2013_Foodgrains.push(0);
 }
else
{
result_2013_Foodgrains.push(arr[year]);
}

  }
});
rl.on('close', function()
{
 let len=result_2013.length;
let len2=result_2013_Foodgrains.length;
let temp =0,sum=0,output=[],i;
    for(i=3;i<aggregate[0].length;i++){
    while(temp<aggregate.length) {
      if(aggregate[temp][i]!="NA") {
      sum = sum + parseFloat(aggregate[temp][i]);
    }
      temp++;
    }
sum=sum;
output.push({
        year : head[i],
        value : sum
      })
    temp=0;
    sum=0;
    }

    writeOutput3.write(JSON.stringify(output,null,2),'UTF-8');

    for(let i=0;i<len2;i++)
{
  result_2013_sort_Foodgrains.push(parseFloat(result_2013_Foodgrains[i]));
}
for(let i=0;i<len2;i++)
{

for(let j=0;j<=len2-i;j++)
  {
  if(result_2013_sort_Foodgrains[j]<result_2013_sort_Foodgrains[j+1])
    {
       let temp=result_2013_sort_Foodgrains[j];
       result_2013_sort_Foodgrains[j]=result_2013_sort_Foodgrains[j+1];
       result_2013_sort_Foodgrains[j+1]=temp;
       let temp1=result_particulars_Foodgrains[j];
       result_particulars_Foodgrains[j]=result_particulars_Foodgrains[j+1];
       result_particulars_Foodgrains[j+1]=temp1;
        }}}

for(let i=0;i<len;i++){  result_2013_sort.push(parseFloat(result_2013[i]));}
for(let i=0;i<len;i++){

for(let j=0;j<=len-i;j++)
  {
 if(result_2013_sort[j]<result_2013_sort[j+1])
    {
       let temp=result_2013_sort[j];
       result_2013_sort[j]=result_2013_sort[j+1];
       result_2013_sort[j+1]=temp;
       let temp1=result_particulars[j];
       result_particulars[j]=result_particulars[j+1];
       result_particulars[j+1]=temp1;
  } 
    }
}
console.log(states[1][3]);
console.log(Rice.length);
 for(i=3;i<head.length;i++){
    	out.push({"year":head[i],
 "Andhra_Pradesh": ((states[0][i]+states[4][i]+states[8][i])=='NANANA')?0:parseFloat(states[0][i]+states[4][i]+states[8][i]),
 "Karnataka": ((states[1][i]+states[5][i]+states[9][i])=='NANANA')?0:parseFloat(states[1][i]+states[5][i]+states[9][i]),
 "Kerala": ((states[2][i]+states[6][i]+states[10][i])=='NANANA')?0:parseFloat(states[2][i]+states[6][i]+states[10][i]),
 "Tamil_Nadu": ((states[3][i]+states[7][i]+states[11][i])=='NANANA')?0:parseFloat(states[3][i]+states[7][i]+states[11][i]),
 })
}
writeOutput4.write(JSON.stringify(out,null,2),'UTF-8');
  writeOutput.write("[");
for(var l=0;l<len;l++)
{
  var mystring=JSON.stringify({"particulars": result_particulars[l], "production": result_2013_sort[l]},null,2);
writeOutput.write(mystring);
  if(l!=len-1)
  {
  writeOutput.write(",");
  }
}
 writeOutput.write("]");
writeOutput2.write("[");
for(var l=0;l<len2;l++)
{
  var mystring=JSON.stringify({"particulars": result_particulars_Foodgrains[l], "production": result_2013_sort_Foodgrains[l]},null,2);
writeOutput2.write(mystring);
  if(l!=len2-1)
  {
  writeOutput2.write(",");
  }
}
 writeOutput2.write("]");
});

