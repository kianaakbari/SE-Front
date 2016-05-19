
var a=[];
a.push(1);
a.push(2);
a.push("");
a.push(undefined);
delete a[1];
for(i=0;i<4;i++) {
    if(a[i]!=undefined)
    console.log(a[i]);
}