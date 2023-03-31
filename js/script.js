//assigning the elements
const start_btn= document.querySelector(".start_btn button");
const info_box= document.querySelector(".info_box");
const exit_btn= info_box.querySelector(".buttons .quit");
const continue_btn= info_box.querySelector(".buttons .restart");
const quiz_box= document.querySelector(".quiz_box");
const timeCount= quiz_box.querySelector(".timer .time_sec");


//If start button is clicked
//classlist syntax: var.classList.add/rem("item class")
start_btn.onclick =()=>{
    info_box.classList.add("activeInfo");//show the info box
}

//If exit button is clicked
exit_btn.onclick =()=>{
    info_box.classList.remove("activeInfo");//hide d info box
}

//If continue button is clicked
continue_btn.onclick =()=>{
    info_box.classList.remove("activeInfo");//hide d info box
    quiz_box.classList.add("activeQuiz");//show d quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(60);
}
//let is used for var values that changes while
//const is used for var values that doesnt change
let que_count= 0;
let que_num= 1;
let counter;
let timeValue= 60;
let userScore = 0
//the onclick method is to button while the  class List method is to classes or pages
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
//result_box botton sect
quit_quiz.onclick=()=>{
    window.location.reload();  //when quit btn is clicked, it returns to d original page
}
restart_quiz.onclick=()=>{
    info_box.classList.add("activeInfo");//
    result_box.classList.remove("activeResult");//hide d info box    let que_count= 0;
    let que_count= 0;
    let que_num= 1;
    let timeValue= 60;
    let userScore = 0;
    que_count++;
    que_num++;
    showQuestions(que_count);
    queCounter(que_num);
    clearInterval(counter);
    next_btn.style.display= "none";
}

//If next button is clicked
next_btn.onclick=()=>{
    if(que_count < questions.length -1){
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        next_btn.style.display = "none"// for every fresh question the next button does not display
        
    }else{
        console.log("Questions completed");
        showResultBox();
    }
}

//getting questions and options from array
    showQuestions =(index)=>{
        const que_text = document.querySelector(".que_text");
        const option_list = document.querySelector(".option_list");
        let que_tag = '<span>'+ questions[index].number+". "+questions[index].question+'</span>';
        let option_tag ='<div class="option">'+ questions[index].options[0]+ '<span></span></div>'
                        +'<div class="option">'+ questions[index].options[1]+ '<span></span></div>'
                        +'<div class="option">'+ questions[index].options[2]+ '<span></span></div>'
                        +'<div class="option">'+ questions[index].options[3]+ '<span></span></div>';
        que_text.innerHTML = que_tag;
        option_list.innerHTML = option_tag;

        const option = option_list.querySelectorAll(".option");
        for (let i = 0; i < option.length; i++) {
            option[i].setAttribute("onclick","optionSelected(this)");            
        }
    }

    function optionSelected(answer){
        const option_list = document.querySelector(".option_list");
        let userAns = answer.textContent;
        let correctAns = questions[que_count].answer;
        let alloptions = option_list.children.length;
        
        if (userAns == correctAns) {
            answer.classList.add("ticked");
            console.log("Answer is correct");
            userScore +=1;
            console.log(userScore)

        }else{
            answer.classList.add("ticked");
            console.log("Answer is wrong");
        }
        //once user selected, disable all options
        for (let i = 0; i < alloptions; i++) {
            option_list.children[i].classList.add("disabled");            
        }
        next_btn.style.display = "block"; //shows the next button after clicked
    }



queCounter=(index)=>{
const bottom_ques_counter = quiz_box.querySelector(".total_que");
let totalQuesCountTag = '<span><p>'+ index + '</p>of<p>' +questions.length+ '</p>Questions</span>';
bottom_ques_counter.innerHTML = totalQuesCountTag;
}
function showResultBox(){
    info_box.classList.remove("activeInfo");//hide d info box
    quiz_box.classList.remove("activeQuiz");//hide d quiz box
    result_box.classList.add("activeResult");//show d info resultbox
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        let scoreTag ='<span>Congrats!, You got only<p>'+ userScore +'</p>out of<p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
        else if(userScore > 1){
            let scoreTag ='<span>oops, You got only<p>'+ userScore +'</p>out of<p>'+questions.length+'</p></span>';
            scoreText.innerHTML = scoreTag;
        }      
        else{
            let scoreTag ='<span>Olodo!, You got only<p>'+ userScore +'</p>out of<p>'+questions.length+'</p></span>';
            scoreText.innerHTML = scoreTag;
        }
    
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent= time;
        time--;
        if(time< 9){
            let addZero =timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time< 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            showResultBox();
            
    
        }
        
    }
}