function reverse(elements) {
    let splitArr = elements.split('');     
    let length = splitArr.length;
    let answer = [];
    for(let i = 0; i<length; i++){
        let popStr = splitArr.pop();
        answer.push(popStr);
    }
    return answer.join('');
}

console.log(reverse('ab cd'));
console.log(reverse('hy u nj un'));
