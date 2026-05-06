const arr = [1,2,3,0,4];
// const db = []
arr.reduce((db , currentNum) => {
    if(currentNum > 0){
        db[currentNum] = currentNum;
    }
},{})