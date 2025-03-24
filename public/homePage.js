const logoutButton = new LogoutButton;

logoutButton.action =  () => {
  ApiConnector.logout(f => {
    if (f.success) {
      location.reload();
    }
  })
}

 ApiConnector.current(f => {
      if (f.success) {
        ProfileWidget.showProfile(f.data);
      }
 })

const ratesBoard = new RatesBoard();

ratesBoard.getStocks = () => {
  ApiConnector.getStocks(f => {
    if(f.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(f.data);
    }
  })
}

ratesBoard.getStocks();
setInterval(ratesBoard.getStocks, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data,f => {
    if(f.success) {
      ProfileWidget.showProfile(f.data);
      moneyManager.setMessage(f.success, `Успешное пополнение баланса`);
    } else (moneyManager.setMessage(f.success, 'Некорректное значение'))
  })
}

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data,f => {
    if(f.success) {
      ProfileWidget.showProfile(f.data);
      moneyManager.setMessage(f.success, `Успешное конвертирование валюты`)
    } else (moneyManager.setMessage(f.success, 'Недостаточно средств'))
  })
}

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, f => {
    if(f.success) {
      ProfileWidget.showProfile(f.data);
      moneyManager.setMessage(f.success, `Успешный перевод`)
    } else (moneyManager.setMessage(f.success, 'Недостаточно средств'))
  })
}

const favoritesWidget = new FavoritesWidget();

  ApiConnector.getFavorites(f => {
    if(f.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(f.data);
      moneyManager.updateUsersList(f.data);
    }
  })

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites (data, f => {
    if(f.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(f.data);
      moneyManager.updateUsersList(f.data);
      favoritesWidget.setMessage(f.success, 'Пользователь успешно добавлен в избранное')
    } else (favoritesWidget.setMessage(f.success, 'Ошибка добавления пользователя в избранное'))
  })
}

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites (data, f => {
    if(f.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(f.data);
      moneyManager.updateUsersList(f.data);
      favoritesWidget.setMessage(f.success, 'Пользователь успешно удален')
    } else (favoritesWidget.setMessage(f.success, 'Ошибка удаления пользователя'))
  })
}