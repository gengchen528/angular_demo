var length=44;
var item= Math.floor(length),
    startAt= length%8,
    i=0;
do {
    switch (startAt){
        case 0:console.log(i++);
        case 7:console.log(i++);
        case 6:console.log(i++);
        case 5:console.log(i++);
        case 4:console.log(i++);
        case 3:console.log(i++);
        case 2:console.log(i++);
        case 1:console.log(i++);
    }
    startAt = 0;
} while (--item);