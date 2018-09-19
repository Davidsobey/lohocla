function myFunction(event) {
  submitFunction(event);
}

function submitFunction(event) {
  if (event.isDefaultPrevented()) {
    // handle the invalid form...
    formError();
    submitMSG(false, "Did you fill in the form properly?");
  } else {
    // everything looks good!
    event.preventDefault();
    submitForm();
  }
}

function submitForm() {
  // Initiate Variables With Form Content
  if ($("#name").val()) {
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var content = $("#content").val();
  }

  $.ajax({
    type: "POST",
    url: "assets/php/form-process.php",
    data:
      "name=" +
      name +
      "&subject=" +
      subject +
      "&content=" +
      content +
      "&email=" +
      email,
    success: function(text) {
      if (text == "success") {
        formSuccess();
      } else {
        formError();
        submitMSG(false, text);
      }
    }
  });
}

function formSuccess() {
  $("#contactForm")[0].reset();
  submitMSG(true, "Thank You! A member of our team will contact you.");
}

function formError() {
  $("#contactForm")
    .removeClass()
    .addClass("shake animated")
    .one(
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
      function() {
        $(this).removeClass();
      }
    );
}

function submitMSG(valid, msg) {
  if (valid) {
    var msgClasses = "alert alert-success";
  } else {
    var msgClasses = "alert alert-danger";
  }
  $("#msgSubmit")
    .toggle()
    .removeClass()
    .addClass(msgClasses)
    .text(msg);
  $("#msgSubmit1")
    .toggle()
    .removeClass()
    .addClass(msgClasses)
    .text(msg);
}
