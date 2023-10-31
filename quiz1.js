function matchingPercent(str1, str2){

    var count = 0;

    var string1 = str1.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gm, "");//정규식 검색..
    var string2 = str2.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gm, "");//정규식 검색..

    var arr1 = string1.split(" ");
    var arr2 = string2.split(" ");

    for(var i=0; i<arr2.length; i++){
        for(var j=0; j<arr1.length; j++){
            if(arr1[j]===arr2[i]){
                count++;
                arr1[j]="*"+count;//겹치지 않는 값
            }
        }
    }

    // 100 * (일치하는 배열/문자열1 배열 길이)
    var percent = (100*count/arr1.length).toFixed(2);//toFixed() 검색..

    return percent+"%";
}

var a = 'RE: [유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내';
var b = '[유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내';

matchingPercent(a, b);