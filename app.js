const form = document.querySelector('#form');
const formControls = document.querySelectorAll('.form-control');

const updateElement = (id) => {
  const element = document.querySelector(`#${id}`);
  return (text) => {
    element.innerHTML = text;
  };
};

const successMessage = updateElement('successMessage');

// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const createValidator = (fieldName, errorMsg, validationRegex = null) => {
  return function (input) {
    const errorMessage = updateElement(`${fieldName}Error`);

    if (input === '') {
      errorMessage(errorMsg);
      return false;
    } else if (validationRegex && !validationRegex.test(input)) {
      errorMessage('Invalid input');
      return false;
    } else {
      errorMessage('');
      return true;
    }
  };
};

const validators = {
  name: createValidator('name', 'Name is required'),
  address: createValidator('address', 'Address is required'),
  email: createValidator('email', 'Valid email is required', emailRegex),
  password: createValidator('password', 'Password is required'),
  telephone: createValidator(
    'telephone',
    'Valid 10-digit phone number is required',
    phoneRegex
  ),
  course: createValidator('course', 'Please select a course'),
  comments: createValidator('comments', 'Comment is required'),
};

formControls.forEach((input) => {
  input.addEventListener('input', (e) => {
    const fieldName = e.target.id; // input.id ==> e.target.id
    validators[fieldName](e.target.value.trim()); // input.value ==> e.target.value
  });
});

form.addEventListener('keydown', (e) => {
  successMessage('');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formErrors = [];
  let isFormValid = true;

  for (const input of formControls) {
    const fieldName = input.id;
    if (!validators[fieldName](input.value.trim())) {
      isFormValid = false;
      formErrors.push(`Error in ${fieldName}`);
      console.log(`Error in ${fieldName}`);
      break;
    }
  }

  if (
    isFormValid &&
    window.confirm('Are you sure, you want to submit the form ?')
  ) {
    const formData = {
      name: form.name.value,
      address: form.address.value,
      email: form.email.value,
      password: form.password.value,
      telephone: form.telephone.value,
      course: form.course.value,
      comments: form.comments.value,
    };
    successMessage('Form Submitted Successfully');
    console.log('Submitted Data : ', formData);
    form.reset();
  }
});

form.addEventListener('reset', (e) => {
  formControls.forEach((input) => {
    const errorMessage = updateElement(`${input.id}Error`);
    errorMessage('');
  });
});
