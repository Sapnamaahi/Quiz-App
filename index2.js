angular.module("app",['ngRoute','firebase'])
.controller("quizappCtrl",quizappCtrl)
.config(routeconfig)



function routeconfig($routeProvider)
{
	$routeProvider
	.when('/',{templateUrl:'templates/main.html'})
	.when('/admin',{templateUrl:'templates/admin.html'})
	.when('/registration',{templateUrl:'templates/registration.html'})

	.otherwise({redirectTo:'/'})
}

function quizappCtrl($firebaseArray,$firebaseAuth)
{
	var my=this;
	var questionList = firebase.database().ref("questionList");
	my.questionList  = $firebaseArray(questionList)
	my.add =add;
	my.nextQuestion =nextQuestion;
	my.checkAns=ChechAns;
	my.numberQuestion =0;
	my.signup=signup;
	my.signin=signin;
	my.googlesignin=googlesignin;
	my.sapna = {};
	function googlesignin()
	{
		var auth = $firebaseAuth();
	auth.$signInWithPopup("google").then(function(result) {
  console.log(result);
  my.sapna=result.user;

}).catch(function(error) {
  console.error("Authentication failed:", error);
});
	}

	function signin()
	{
        var email=my.email;
        var password=my.password1;
		var auth = $firebaseAuth();
	auth.$signInWithEmailAndPassword(email,password).then(function(firebaseUser) {
  console.log(firebaseUser.uid);
}).catch(function(error) {
  window.alert("Invalid password");
});
	
	}



	function signup()
	{
		if(my.userpssword==my.password)
		{
			var username = my.useremail;
			var password = my.password;
			var auth = $firebaseAuth(); 
		auth.$createUserWithEmailAndPassword(username,password)
 		 .then(function(firebaseUser) {
    	console.log("User created successfully!");
 	 	}).catch(function(error) {
  	  	console.error("Error: ", error);
  			});
		}
		else
		{
			window.alert("password not matched");
		}
	}

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