Для запуска сервера перейдите в папку с репозиторием и выполните команду `node index`

### `Система управления контактными данными клиентов` 🎛️👨‍💼

### Описание проекта
WEB-интерфейс для CRM системы, в которой реализованы следующие возможности:
* Просмотр списка людей в виде таблицы 
* Добавление нового клиента 
* Изменение информации о существующем клиенте
  
`Каждый контакт представляет из себя следующий набор данных:`
* Имя 
* Фамилия 
* Отчество 
* Массив объектов с контактными данными, где каждый объект содержит: 
 1) Тип контакта (телефон, email, VK и т.п.) 
 2) Значение контакта (номер телефона, адрес email, ссылка на страницу в VK и т.п.) 
 
 Интерфейс представляет из себя единственную страницу, на которой располагается таблица клиентов, кнопка для добавления нового клиента, а также шапка с логотипом компании и строкой поиска клиентов.
