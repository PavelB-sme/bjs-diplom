'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = data => {
  ApiConnector.login(data, f => {
    f.success ?
      location.reload()
      : userForm.setLoginErrorMessage(f.error);
  })
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, f => {
    f.success ?
      location.reload()
      : userForm.setRegisterErrorMessage(f.error);
  });
}

