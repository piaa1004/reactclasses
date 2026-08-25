import React from "react";
import Scrollbars from 'react-scrollbars-custom'

const FancyScrollbar = () => {
    return (


        // { length: 50 }는 Array-Like임
        // :length라는 0 이상의 정수형 숫자 프로퍼티를 가지고 있어서 "몇 개의 요소가 있는지"를 나타낼 수 있으면 array-like로 취급할 수 있습니다.
        //  Array.from()이 이것을 처리할 때는 length를 보고 3개의 배열 index가 있다고 간주합-> 실제 엘리먼트들은 없음!!!   
        <Scrollbars style={{ height: 500}}>
            {Array.from({ length: 50 }, (_, i) => (
                <p key={i}>항목 {i + 1}</p>
            ))}
        </Scrollbars>
    )

}

export default FancyScrollbar;