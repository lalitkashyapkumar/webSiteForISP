//add you own firebase configuration


  $("#btn-signup").click(function()
  { 
      var email = $("#signup-email").val();
      var password = $("#signup-password").val();
      var cPassword = $("#signup-confirmPassword").val();
      if(email != "" && password!="" && cPassword!="")
      {
          if(password == cPassword)
          {
            var result = firebase.auth().createUserWithEmailAndPassword(email,password);
            result.catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage );
                window.alert("Message : " +errorMessage);
            });
          }
          else{
            window.alert("Password not matched");
          }
      }
      else{
          window.alert("please fill out all field");
      }
  });

$("#btn-login").click(function()
{ 
    var email = $("#email").val();
    var password = $("#password").val();
    if(email != "" && password!="")
    {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        window.alert("logining with email '" +email+"', please wait..");
        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Message : " +errorCode);
            window.alert("Message : " +errorMessage);
        });
    }
    else{
        window.alert("please fill out all field");
    }
});

$("#btn-reset").click(function()
{  
    var auth = firebase.auth();
    var email = $("#reset-email").val();
    window.alert("Message : btn clicked "+email);
    if(email != ""){
        auth.sendPasswordResetEmail(email).then(function(){
            window.alert("Email has been send to you please check and verify");
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Message : " +errorCode);
            window.alert("Message : " +errorMessage);
        });
    }
    else{
        window.alert("Please fill out Email");
    }
});



$("#btn-logout").click(function()
{ 
    firebase.auth().signOut();
});


$("#btn-submit").click(function()
{   window.alert("button clicked");
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var address = $("#address").val();
    var phone = $("#phone").val();
    var gender = $("#gender").val();
    var date = Date();
    var userimage = $("#user-photo")[0].files[0];
    console.log("user img is"+userimage);
    var imgURl = "";
    var amount = "0000";


    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    var storageRef = firebase.storage().ref("images/"+userID+"image");
    var uploadTask = storageRef.put(userimage);

    uploadTask.on('state_changed',function(snapshot){
        var progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is "+progress);

    },function (error) {
        console.log("Message: from database"+error.message);
        
    },function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
           imgURl=downloadURL;
           if(fname!="" && address!="" && imgURl!=""){
            var userdata = 
            {
                "phone":phone,
                "address": address,
                "fname":fname,
                "lname":lname,
                "gender":gender,
                "userFrom": date,
                "image":imgURl,
                "amount":amount,
    
            };
            usersRef.set(userdata,function(error){
                if(error){
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    window.alert("Message : " +errorCode);
                    window.alert("Message : " +errorMessage);
                }
                else{
                    window.alert("successful");
                    window.location.href = "home.html"
                }
            });
        }
        else{
            window.alert("Please fill out all filed");   
        }
          });
        
    });   
});


function getUser(userID){
    var fname;
    var lname
    //var userID = firebase.auth().currentUser.uid;
    firebase.database().ref("Users/" +userID).once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            if(childKey == "fname"){
                fname = childData;
                
            }
            else if(childKey == "amount"){
                document.getElementById("user-amount").innerHTML = childData;
            }
            else if(childKey == "lname"){
                lname = childData;
            }
            else if(childKey == "address"){
                document.getElementById("user-address").innerHTML = childData;
            }
            else if(childKey == "phone"){
                document.getElementById("user-contact").innerHTML = childData;
            }
            else if(childKey == "image"){
                document.getElementById("userImg").src = childData;
            }
            else if(fname!="" && lname!=""){
                document.getElementById("user-name").innerHTML = fname+" "+lname;
            }
            
          });
      });

}

$("#btn-leased-submit").click(function(){
    window.alert("Please verify your all details");
    var email = $("#l-email").val();
    var name = $("#l-name").val();
    var phone = $("#l-mobile").val();
    var address = $("#l-address").val();
    var dataSpeed = $("#dataSpeed").val();
    var dataRequired = $("#dataRequired").val();
    var city = $("#city").val();

    var rootRef = firebase.database().ref().child("LeasedLineBooking");
    var userID = "LeasedLine"+name+address+Date.now();
    var usersRef = rootRef.child(userID);
    if(name!="" && address!="" && phone!=""){
        var bookingdata = 
        {
            "phone": phone,
            "address": address,
            "name": name,
            "email": email,
            "dataSpeed": dataSpeed,
            "dataRequired": dataRequired,
            "city": city,

        };
        usersRef.set(bookingdata,function(error){
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " +errorCode);
                window.alert("Message : " +errorMessage);
            }
            else{
                window.alert("successful");
                window.location.href = "index.html"
            }
        });
    }
    else{
        window.alert("Please fill out all filed");   
    }

});
function changeval(data){
    document.getElementById("dataSpeed").defaultValue = data;
    document.getElementById("dataRequired").defaultValue = "Unlimited";
}

$("#btn-broadband-book").click(function(){
    window.alert("Please verify your all details");
    var email = $("#l-email").val();
    var name = $("#l-name").val();
    var phone = $("#l-mobile").val();
    var address = $("#l-address").val();
    var dataSpeed = $("#dataSpeed").val();
    var dataRequired = $("#dataRequired").val();
    var city = $("#city").val();
    var rootRef = firebase.database().ref().child("BroadbandBooking");
    var userID = "broadband"+name+address+Date.now();
    var usersRef = rootRef.child(userID);
    if(name!="" && address!="" && phone!="" && email != "" && dataSpeed!="" && dataRequired!=""){
        var bookingdata = 
        {
            "phone": phone,
            "address": address,
            "name": name,
            "email": email,
            "dataSpeed": dataSpeed,
            "dataRequired": dataRequired,
            "city": city,

        };
        usersRef.set(bookingdata,function(error){
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " +errorCode);
                window.alert("Message : " +errorMessage);
            }
            else{
                window.alert("successful");
                window.location.href = "index.html"
            }
        });
    }
    else{
        window.alert("Please fill out all filed");   
    }
});

$("#btn-broadband-submit").click(function(){
    window.alert("Please verify your all details");
    var email = $("#b-email").val();
    var name = $("#b-name").val();
    var phone = $("#b-mobile").val();
    var address = $("#b-address").val();
    var dataSpeed = $("#dataSpeed").val();
    var dataRequired = $("#dataRequired").val();
    var city = $("#city").val();
    var rootRef = firebase.database().ref().child("BroadbandBooking");
    var userID = "broadband"+name+address+Date.now();
    var usersRef = rootRef.child(userID);
    if(name!="" && address!="" && phone!="" && email != "" && dataSpeed!="" && dataRequired!=""){
        var bookingdata = 
        {
            "phone": phone,
            "address": address,
            "name": name,
            "email": email,
            "dataSpeed": dataSpeed,
            "dataRequired": dataRequired,
            "city": city,

        };
        usersRef.set(bookingdata,function(error){
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " +errorCode);
                window.alert("Message : " +errorMessage);
            }
            else{
                window.alert("successful");
                window.location.href = "index.html"
            }
        });
    }
    else{
        window.alert("Please fill out all filed");   
    }
});

$("#contact-btn-submit").click(function(){
    var name = $("#c-name").val();
    var mobile = $("#c-mobile").val();
    var address = $("#c-address").val();
    var city = $("#city").val();
    var issue = $("#issue").val();
    var rootRef = firebase.database().ref().child("contactUs");
    var userID = "contactUs__"+name+"__"+address+Date.now();
    var usersRef = rootRef.child(userID);
    if(name!="" && address!="" && mobile!="" && issue !="" && city != ""){
        var issuedata = 
        {
            "phone": mobile,
            "address": address,
            "name": name,
            "issue":issue,
            "city": city,

        };
        usersRef.set(issuedata,function(error){
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " +errorCode);
                window.alert("Message : " +errorMessage);
            }
            else{
                window.alert("successful");
                window.location.href = "index.html"
            }
        });

    }
    else{
        window.alert("Please fill out all filed");   
    }
});

$("#pay-real").click(function(){
    window.alert("Paying please wait");
    var mobile = $("#p-phone").val();
    var amount = $("#p-amount").val();
    var name = $("#p-name").val();
    var date = Date();
    var rootRef = firebase.database().ref().child("Payment");
    var userID = firebase.auth().currentUser.uid;
    userID = userID+Date.now();
    var usersRef = rootRef.child(userID);
    if(name!="" && amount !="" && name!="" && date!=""){
        var bookingdata = 
        {
            "phone": mobile,
            "amount": amount,
            "name": name,
            "paymentDate": date,

        };
        usersRef.set(bookingdata,function(error){
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert("Message : " +errorCode);
                window.alert("Message : " +errorMessage);
            }
            else{
                window.alert("successful");
                
            }
        });
    }
    else{
        window.alert("Please fill out all filed");   
    }
});

function login(){	
	firebase.auth().onAuthStateChanged(function(user){
	  if(user){
		  var userID = firebase.auth().currentUser.uid;
		  firebase.database().ref('Users/' +userID).once('value').then(function(snapshot){
			if(snapshot.val()){
				
			  	window.location.href = "home.html";
			}
			else
			{
			  	window.location.href = "accountSettings.html";
			}
		  });    
		}
	  });	
	}
