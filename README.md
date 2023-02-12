# GuitarShop

## ✨Запуск проекта✨

В корне проекта в папке `environments` находится файл `.backend.env-example`.
1) Необходимо в этой папке добавить новый файл `.backend.env` со значениями из example файла для формирования переменных окружения.

Поднять docker.
2) В папке `./apps/backend` необходимо поднять образ командой `docker-compose up -d`.

Запуск сервера
3) Из корня проекта осуществляем команду `npm start`.

4) Настройки по умолчанию.

  The «Guitar-shop»
  spec: `http://localhost:3333/spec` 
  api: `http://localhost:3333/api` 
  mongo-express: `http://localhost:8081`
  frontend: `http://localhost:4200` 

  Для взаимодействия с закрытой частью приложения у Юзера в базе данных значение `userRole: admin`.
  С клиента по умолчанию устанавливается значение `user`.

  ## ✨BACKEND:
  ## Список ресурсов
  `http://localhost:3333/spec`


  ## ✨FRONTEND:
  ## Список ресурсов
  
  ✨**Открытая часть**✨
  Главная: `http://localhost:4200/`
  Авторизация: `http://localhost:4200/login`
  Регистрация: `http://localhost:4200/register`
  Подробная информация о товаре: `http://localhost:4200/product/:id`
  Корзина: `http://localhost:4200/cart`
  404: `http://localhost:4200/*`

  ✨**Закрытая часть**✨ ** [ `Доступна пользователю со значением в базе данных userRole: admin` ]
  Список заказов: `http://localhost:4200/orders`
  Подробная информация о заказе: `http://localhost:4200/orders/:id`
  Добавление нового товара: `http://localhost:4200/add-product`
  Получение списка товаров: `http://localhost:4200/products`
  Изменение товара: `http://localhost:4200/product/change/:id`

  ## Не реализовано!!!
  Cli
  Заполнение базы данных из файла
  Расчет рейтинга заказа
  Подсчет рейтинга
  Email уведомления

✨**Время затраченное на проект**✨
✨`TOTAL HOURS: 45:36:36`✨
