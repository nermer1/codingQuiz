
let str1 = 'RE: [유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내';
let str2 = '[유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내';


function def(val1, val2) {

    var reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;
    val1 = val1.replace(reg, '');
    val2 = val2.replace(reg, '');
    console.debug('val1', val1);
    console.debug('val2', val2);

    let defCount = 0;

    let val1Obj = {};
    for(let i = 0; i < val1.length; i++){
        if(!Object.keys(val1Obj).includes(val1.charAt(i))){
            val1Obj[val1.charAt(i)] = 1;
        }else{
            val1Obj[val1.charAt(i)] = val1Obj[val1.charAt(i)] + 1;
        }
    }
    console.debug('val1Obj', val1Obj);

    for(let i = 0; i < val2.length; i++){
        if(Object.keys(val1Obj).includes(val2.charAt(i))){
            val1Obj[val2.charAt(i)] = val1Obj[val2.charAt(i)] - 1;
        }
    }

    for (const value of Object.values(val1Obj)) {
        if(value > 0){
            defCount += value;
        }
    }

    let percent = Math.round((((val1.length - defCount) / val1.length) * 10000)) / 100;

    console.debug(percent + '% 일치');

}

def(str1, str2);