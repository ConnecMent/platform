export function isUsernameValid(userName){
    let len =  userName.length;

    
    if(len<6){
        return false;
    }
    
    //first character should not to ba a digit
    let check = 0;
    for( let i=0;i<10;++i){
        if(userName[0] == String(i)){
            check = 1;
            break;
        }
    }
    if(check == 1){
        return false;
    }

    return true;

}

export function isPasswordValid(password){
    let len =  password.length;

    if(len<5){
        return false;
    }

    let symbol = ['@','#','$','&','*','(',')','-','_','{','}','[',']',':',';','~'];
    let countOfSymbol = 0; //@#$%^&*()!
    let countOfNumber = 0; //0-9
    let countOfchar = 0;//a-z A-Z

    for(let i=0;i<password.length;++i){
        
        //check number
        for( let j=0;j<10;++j){
            if(password[i] == String(j)){
                ++countOfNumber;
                break;
            }
        }

        //check symbol
        for(let key of symbol){
            if(key==password[i]){
                ++countOfSymbol;
                break;
            }
        }

    }

    countOfchar = password.length - (countOfSymbol+countOfNumber);

    if(countOfNumber === password.length)
        return false;
    
    if(countOfSymbol === password.length)
        return false;

    if(countOfchar === password.length)
        return false;
    
    if(countOfNumber > 0 || countOfSymbol > 0)
        return true;


}

export function isAmountValid(number){
    if(number>0)
        return true;
    else{
        return false;
    }
}


