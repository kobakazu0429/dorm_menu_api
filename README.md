# dorm_menu_api

## API

API Routing

| Http Method | Route              | Description                               |
| ----------- | ------------------ | ----------------------------------------- |
| GET         | /all               | It's all the data so far.(from: 2018/9 ~) |
| GET         | /next              | If Lunch Time , return Lunch Data         |
| GET         | /:year/:month/:day | That day's all data                       |

<!-- |             | GET                |             | -->

## Usage

### `index.js`

express server
`$ node index.js`

### `schedule.js`

PDF ファイルをダウンロードし、パース後 DB に保存します。
`$ node schedule.js`
