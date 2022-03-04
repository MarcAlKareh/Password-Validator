const password = document.querySelector('.password');
const button = document.querySelector('.button_validate');
const password_type = document.querySelector('.password_type--string');
const generate_password = document.querySelector('.random_pass');

class NewPasswordCl {
  passLength = 16;
  randPass = '';

  constructor(char) {
    this.chars = char;

    this._displayRandomPassword();
  }

  // Creates and Displays the randomly generated password
  _displayRandomPassword() {
    // console.log(this.chars);
    for (let i = 0; i <= this.passLength; i++) {
      const randomIndex = Math.floor(Math.random() * this.chars.length) + 1;
      this.randPass += this.chars[randomIndex];
    }
    
    // Sets the password in the input box to the randomly generated password
    password.value = this.randPass;

    App.changeBoxStyle('strong');
  }
}

class PasswordValidatorCl {
  // Strong Password Obejct
  #strongPassword = {
    characters: 12,
    numbers: 2,
    upperCase: 1,
    lowerCase: 1,
    specialCharacters: 1,
  };

  // Weak password object
  #weakPassword = {
    characters: 6,
    numbers: 0,
    upperCase: 0,
    lowerCase: 1,
    specialCharacters: 0,
  };

  #nums = 0;
  #upper = 0;
  #lower = 0;
  #special = 0;

  constructor(nums, lowerCaseLetters, upperCaseLetters, special) {
    this.nums = nums;
    this.lowerCaseLetters = lowerCaseLetters;
    this.upperCaseLetters = upperCaseLetters;
    this.allSpecialCharacters = special;

    // If Validation Button clicked
    button.addEventListener('click', this._validation.bind(this));

    // If new password text is clicked
    generate_password.addEventListener(
      'click',
      this._generateRandomPassword.bind(this)
    );
  }

  // Checks if string contains special characters
  _containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  // Returns a boolean whether the value is between two numbers passed as parameters
  _betweenNums(val, num1, num2) {
    return val > num1 && val < num2;
  }

  // Checks if letter is an upper case letter
  _isUpperCase(letter) {
    return /[A-Z]/.test(letter);
  }

  // Generates random password
  _generateRandomPassword(e) {
    e.preventDefault();

    // Creates a new instance of NewPasswordCl class
    const newPassword = new NewPasswordCl(allChars);
  }

  _removePasswordClasses(className) {
    if (password.classList.contains(className)) password.classList.remove(className);    
  }

  _validation() {
    // console.log(password.value);
    this.passwordLength = password.value.length;
    let run = true;

    // If input box is empty
    if (!this.passwordLength) {
      alert('Please Enter a Password.');
      run = false;
    }

    password.value.split('').forEach(c => {
      // If current character is a special character
      if (this._containsSpecialChars(c)) this.#special += 1;
      // If current character in password in number
      if (!isNaN(c)) this.#nums += 1;
      // If current character in password is uppercase letter
      if (this._isUpperCase(c)) this.#upper += 1;
      // If current character in password is lowercase letter
      if (typeof c === 'string' && c !== c.toUpperCase()) this.#lower += 1;
    });

    generate_password.classList.remove('hidden');

    // console.log(this.#nums);
    // console.log(this.#lower);
    // console.log(this.#upper);
    // console.log(this.#special);

    if (run) this._detection(this.#strongPassword, this.#weakPassword);
  }

  _detection(strongPass, weakPass) {
    // console.log(pass);

    // Detecting if this is a strong password
    if (
      this.passwordLength >= strongPass.characters &&
      this.#nums >= strongPass.numbers &&
      this.#upper >= strongPass.upperCase &&
      this.#lower >= strongPass.lowerCase &&
      this.#special >= strongPass.specialCharacters
    ) {
      this._changeBoxStyle('strong');
    } else if (
      // Detecting if this is a mild password
      this._betweenNums(
        this.passwordLength,
        weakPass.characters,
        strongPass.characters
      ) &&
      this._betweenNums(this.#nums, weakPass.numbers, strongPass.numbers)
    ) {
      this._changeBoxStyle('mild');
    } else if (
      // Detecting if this is a weak password
      this.passwordLength <= weakPass.characters &&
      this.#lower >= weakPass.lowerCase &&
      this.#nums === weakPass.numbers &&
      this.#upper === weakPass.upperCase &&
      this.#special === weakPass.specialCharacters
    ) {
      this._changeBoxStyle('weak');
    } else {
      this._changeBoxStyle('weak');
    }
  }

  changeBoxStyle(passType) {
    // console.log(passType);

    // Checks if the password has any other class and removes them if so
    this._removePasswordClasses('strong');
    this._removePasswordClasses('mild');
    this._removePasswordClasses('weak');

    // If password is strong
    if (passType === 'strong') {
      password.classList.add('strong');

      password_type.textContent = 'Strong Password';
      password_type.style.color = 'green';
    }

    // If password is mild
    if (passType === 'mild') {
      password.classList.add('mild');

      password_type.textContent = 'Mild Password';
      password_type.style.color = 'orange';
    }

    // If password is weak
    if (passType === 'weak') {
      password.classList.add('weak');

      password_type.textContent = 'Weak Password';
      password_type.style.color = 'red';
    }

    // Sets all the properties back to 0
    this.#nums = this.#upper = this.#lower = this.#special = 0;
  }
}

const allChars =
  '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()+=-_~.?,/{[}]ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const App = new PasswordValidatorCl();
