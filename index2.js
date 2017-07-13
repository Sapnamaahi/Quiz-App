angular.module("app",['ngRoute','firebase'])
.controller("quizappCtrl",quizappCtrl)
.config(routeconfig)



function routeconfig($routeProvider)
{
	$routeProvider
	.when('/',{templateUrl:'templates/main.html'})
	.when('/admin',{templateUrl:'templates/admin.html'})
	.otherwise({redirectTo:'/'})
}

function quizappCtrl($firebaseArray)
{
	var my=this;
	var questionList = firebase.database().ref("questionList");
	my.questionList  = $firebaseArray(questionList)
	my.add =add;
	my.nextQuestion =nextQuestion;
	my.checkAns=ChechAns;
	my.numberQuestion =0;

    function nextQuestion() {
     my.numberQuestion++;	
	my.checkAnswer= '';

    }
    function ChechAns(i)
    {
    	if(my.checkAnswer == my.questionList[i].answer)
    	{
    		console.log("You are right");
    	}
    	else
    	{
    		console.log("You are wrong");
    	}

    }



	function add() 
	{	
		if(my.question != "" && my.question != undefined && my.option1 != "" && my.option1 != undefined
			&& my.option2 != "" && my.option2 != undefined && my.option3 != "" && my.option3 != undefined
	&& my.option4 != "" && my.option4 != undefined	&& my.answer != "" && my.answer != undefined)
		{
		var obj = {};
		obj.question = my.question;
		obj.option = [my.option1,my.option2,my.option3,my.option4];
		obj.answer=my.answer;
		my.questionList.$add(obj);
		my.question="";
		my.option1="";
		my.option2="";
		my.option3="";
		my.option4="";
		my.answer="";
		}
		else
		{
			window.alert("My question shoulf not be blank");
		}
	}

}