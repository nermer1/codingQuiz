function matchingPercent(str1, str2) {
    let sameWordCount = 0;
    const reg = /[`~!@#$%^&*()_=+[{};:'",.<>?/|\-\]\\ ]/gi;
    
    // removing special symbol & space
    str1 = str1.replace(reg, '');
    str2 = str2.replace(reg, '');
    
    // str1 length
    const str1Len = str1.length;
    // str1 to array
    const str1Array = [...str1];
    
    str1Array.map(ch => {
        let matchIndex = str2.indexOf(ch);
      if (matchIndex > -1) {
          str2 = str2.replace(ch, '');
        sameWordCount++;
      }
    });
    
    console.log('str1 문자열 길이: ' + str1Len);
    console.log('일치 문자 갯수: ' + sameWordCount);
    
      // return percent;
    return ((sameWordCount / str1Len) * 100).toFixed(2);
  }
  
  const str1 = 'RE: [유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내';
  const str2 = '[유니포스트] [풍산] 께서 요청하신 "PEACE 세금계산서 처리 오류 " 처리내역 안내';
  
  console.log('일치율: ' + matchingPercent(str1, str2) + '%');