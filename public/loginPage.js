'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = data => {
  ApiConnector.login(data, f => {
    f.success ?
      location.reload()
      : userForm.setLoginErrorMessage(`Пользователь c логином ${data.login} и указанным паролем не найден`);
  })
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, f => {
    f.success ?
      location.reload()
      : userForm.setRegisterErrorMessage(`Логин ${data.login} уже существует.`);
  });
}

