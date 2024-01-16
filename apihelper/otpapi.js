const countrycode = $("#phone");
const phonenumber = $("#phonenumber");
const appointmentDate = $("#appointment");
const otp = $("#otp");
const otpentersection = $("#enterOTPsection");
const otpbtn = $("#generateOTPbtn");
const bookbtn = $("#bookappointmentbtn");

function showenterOTP() {
  console.log("showing section");

  if (phonenumber.val() != "" && appointmentDate.value != "") {
    otpentersection.css("display", "block");
    otpbtn.css("display", "none");
    bookbtn.css("display", "flex");
  }
}

const generateOTP = async () => {
  let data = {
    phoneNumber: countrycode.val() + phonenumber.val(),
  };
  console.log("number:" + phonenumber.val());

  const response = await fetch("http://localhost:3000/getOTP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type as JSON
      // Add any additional headers if needed
    },
    body: JSON.stringify(data), // Convert the data to JSON format)
  });

  const responseData = await response.clone().json();
  console.log(responseData);

  if (data && !data.err) {
    showenterOTP();
    alert("An OTP has been sent to your number!");
  } else {
    alert("something is wrong");
  }
};

const bookappointment = async () => {
  let data = {
    phoneNumber: countrycode.val() + phonenumber.val(),
    enteredOTP: otp.val(),
    enteredDate: appointmentDate.val(),
  };

  const response = await fetch("http://localhost:3000/booksession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type as JSON
      // Add any additional headers if needed
    },
    body: JSON.stringify(data), // Convert the data to JSON format)
  });

  const responseData = await response.clone().json();
  console.log(responseData);

  if (responseData && !responseData.err) {
    alert("Appointment booked");
    window.location.reload();
  } else {
    alert("something is wrong, Please check otp again");
  }
};
