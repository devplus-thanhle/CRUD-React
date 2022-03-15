export const validForm = (student) => {
  const { fullname, mobile, address, hobby, email } = student;

  const errors = [];

  if (!fullname.trim()) {
    errors.push("Please add fullname");
  } else if (fullname.length > 20) {
    errors.push("Fullname must be less than 20 characters");
  }

  if (!email.trim()) {
    errors.push("Please add email");
  } else if (!validateEmail(email)) {
    errors.push("Email format is incorrect.");
  }

  if (!mobile.trim()) {
    errors.push("Please add mobile");
  } else if (!validPhone(mobile)) {
    errors.push("Mobile format is incorrect.");
  }

  if (!address.trim()) {
    errors.push("Please add address");
  }

  if (!hobby.trim()) {
    errors.push("Please add hobby");
  }

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

function validPhone(phone) {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return phoneRegExp.test(phone);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
