Для сборки вебпаком нужно:

1. Переместить папки img и fonts в папку js

2. Раскоментировать import './style.css' в index.js

3. Перенести файл style.css в папку js

4. Установить вебпак, установить плагин copy-webpack-plugin

npm install webpack webpack-cli --save-dev
npm install copy-webpack-plugin --save-dev 

5. Выполнить команду для сборки проекта

npx webpack --config webpack.config.js

6. Переместить index.html в папку dist

7. Удалить <link href="js/style.css" rel="stylesheet" /> и <script type="module" src="js/index.js"></script>, добавить

<script src="bundle.js"></script>