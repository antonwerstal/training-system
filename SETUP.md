# RecordsCalendar - Инструкция по запуску

## Быстрый старт

1. **Установка зависимостей:**
   ```bash
   npm install
   ```
   
   **Что устанавливается:**
   - LoopBack 3.28.0 и все его зависимости
   - PostgreSQL коннектор для работы с БД
   - Webpack 5 и все инструменты сборки
   - React 19, MobX 6.3.1, Consta UI
   - Babel для транспиляции кода
   
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

## Продакшн

1. **Сборка клиента:**
   ```bash
   npm run build
   ```

2. **Запуск сервера:**
   ```bash
   npm run server
   ```
   Сервер будет доступен на http://localhost:4444

## Структура проекта

```
RecordsCalendar/
├── server/                 # LoopBack 3 API сервер
│   ├── server.js          # Точка входа сервера
│   ├── config.json        # Конфигурация сервера
│   ├── datasources.json   # Настройки БД
│   ├── model-config.json  # Конфигурация моделей
│   └── boot/              # Скрипты инициализации
├── client/                # React клиент
│   ├── index.html         # HTML шаблон
│   ├── index.js           # Точка входа
│   ├── index.css          # Основные стили
│   ├── 1-app/             # Приложение
│   ├── 2-pages/           # Страницы
│   ├── 3-widgets/         # Виджеты
│   ├── 4-features/        # Фичи
│   ├── 5-shared/          # Общие компоненты
│   ├── tools/             # Утилиты
│   └── package.json       # Зависимости клиента
├── common/                # Общие файлы
├── scripts/               # Скрипты
│   ├── migrate.js         # Скрипт миграции моделей
│   └── buildForeignKeys.js # Утилита для внешних ключей
├── webpack.config.js      # Конфигурация Webpack
├── .babelrc              # Конфигурация Babel
└── package.json           # Основные зависимости
```

## API

- **Сервер:** http://localhost:4444
- **API Explorer:** http://localhost:4444/explorer
- **Клиент:** http://localhost:3000

## Требования

- **Node.js:** 16.20.2 или выше
- **npm:** версия, совместимая с Node.js
- **База данных:** PostgreSQL (рекомендуется)
- **Операционная система:** Windows, macOS, Linux
- **Свободное место:** ~500MB для node_modules

## Установка Node.js

Если Node.js не установлен:
1. Скачайте с [nodejs.org](https://nodejs.org/)
2. Выберите LTS версию (16.20.2 или выше)
3. Установите с настройками по умолчанию
4. Проверьте установку:
   ```bash
   node --version
   npm --version
   ```

## Технологии

### Сервер
- LoopBack 3.28.0
- Node.js 16.20.2+
- PostgreSQL (основная БД)
- In-memory база данных (для разработки)

### Клиент
- React 19.0.0 (классовые компоненты)
- MobX 6.3.1
- Consta UI 3.0.0
- Webpack 5 для сборки
- Babel для транспиляции
- Axios для API запросов
