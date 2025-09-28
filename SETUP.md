# RecordsCalendar - Инструкция по запуску

## Быстрый старт

1. **Установка зависимостей:**
   ```bash
   npm install
   ```
   
  
   
   ⚠️ **Важно:** Этот шаг обязателен перед запуском проекта!

2. **Создание базы данных и настройка подключения:**
   - Установите PostgreSQL
   - Создайте базу данных для проекта:
     ```sql
     CREATE DATABASE pet_calendar;
     ```
   - Настройте подключение в `server/datasources.json` или `server/datasources.local.js`
   
   **Пример конфигурации PostgreSQL:**
   ```json
   {
     "postgres": {
       "host": "localhost",
       "port": 5432,
       "database": "pet_calendar",
       "username": "your_username",
       "password": "your_password",
       "connector": "postgresql"
     }
   }
   ```

3. **Запуск миграции проекта:**
   ```bash
   npm run update
   ```
   Создаст таблицы и индексы в базе данных

4. **Запуск сервера:**
   ```bash
   npm run server
   ```
   Запустит LoopBack 3 сервер на http://localhost:4444

5. **Запуск клиента (в отдельном терминале):**
   ```bash
   npm start
   ```
   Запустит React клиент на http://localhost:3000 с автоматическим открытием браузера

## Возможные проблемы

### Ошибка "Cannot find module 'loopback'"
**Решение:** Убедитесь, что выполнили `npm install` перед запуском

### Ошибка подключения к PostgreSQL
**Решение:** 
- Проверьте, что PostgreSQL запущен
- Убедитесь, что база данных `records_calendar` создана
- Проверьте настройки в `server/datasources.json`

**Типичные ошибки:**
- `ECONNREFUSED` - PostgreSQL не запущен
- `3D000` - База данных не существует
- `28P01` - Неверные username/password
- `ENOTFOUND` - Неверный host

⚠️ **Важно:** При неверных реквизитах БД миграция должна выдавать ошибку и прерываться!

### Ошибка "Port 3000 is already in use" или "Port 4444 is already in use"
**Решение:** 
- Закройте другие приложения на портах 3000 или 4444
- Или измените порты в `webpack.config.js` (CLIENT_PORT) и `server/config.json` (port)

## Требования

- **Node.js:** 16.20.2 или выше
- **npm:** 8.19.4 (совместимая с Node.js 16.20.2)
- **База данных:** PostgreSQL (рекомендуется)
- **Операционная система:** Windows, macOS, Linux
- **Свободное место:** ~500MB для node_modules