# Implementation Notes

### Project goal

This project is a reading progress tracker for readers who read several books
at once. Its key field is `currentPage`: readers can update it inline, see the
progress bar respond, and keep the value after a page refresh.

The original midterm plan focused on adding `currentPage`. The finished app
also stores `totalPages` so the progress bar can show a meaningful percentage,
and includes an editable note as an additional feature.

### Main data flow

1. `src/main.jsx` renders `App` inside the `Provider` from
   `src/context/todos.jsx`.
2. The Provider's `useEffect` calls `loadTodos` when the app starts.
   `loadTodos` calls `fetchTodos` in `src/api.js`, which uses Axios `GET
   /todos`.
3. Before dispatching the `set` action, `loadTodos` normalizes server records:
   it converts `done` to a boolean and supplies defaults for missing
   `currentPage`, `totalPages`, and `note`. This lets older `db.json` records
   load without an undefined page value breaking the row or progress display.
4. `todosReducer` handles `set`, `add`, `replace`, and `remove`. Each action
   returns a new array (and, for `replace`, a new book object), rather than
   mutating the existing state.
5. `TodoList` maps `visibleTodos` into `TodoItem` rows. The
   `useTodosContext` hook in `hoooks/use-todos-context.jsx` gives these
   components access to the Provider's operations.

### How the server stores, updates, and checks data

The project uses JSON Server as a local API. The `server` script in
`package.json` runs `json-server -p 3001 --watch db.json`. JSON Server reads
the `todos` array in `db.json` at startup and writes successful changes back
to that file. `--watch` keeps the server aware of file changes. The browser
does not write to `db.json` directly: `src/api.js` sends Axios requests to
`http://localhost:3001`, and the server applies them.

The API routes used by this app are:

| Action | Request | Result |
| --- | --- | --- |
| Load all books | `GET /todos` | Returns the current records |
| Add a book | `POST /todos` | Adds a record and returns the created record |
| Edit title, total pages, or note | `PUT /todos/:id` | Replaces the record with the complete submitted record |
| Save current page | `PATCH /todos/:id` with `{ "currentPage": 42 }` | Changes only the current page |
| Change completion | `PATCH /todos/:id` with `{ "done": true }` | Changes only the completion value |
| Delete a book | `DELETE /todos/:id` | Removes the record |

To run and inspect the server, open a PowerShell terminal in the project
folder and start it:

```powershell
npm run server
```

In another PowerShell terminal, read the records through the same endpoint the
app uses:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3001/todos'
```

To test a page update directly, use a real book ID and a valid page number:

```powershell
Invoke-RestMethod -Method Patch `
  -Uri 'http://localhost:3001/todos/1' `
  -ContentType 'application/json' `
  -Body '{"currentPage":42}'
```

The command prints the server response. Verify the persisted value with
another `GET`:

```powershell
Invoke-RestMethod -Uri 'http://localhost:3001/todos/1'
```

You can also inspect the JSON file that JSON Server writes:

```powershell
Get-Content .\db.json -Raw | ConvertFrom-Json | Select-Object -ExpandProperty todos
```

The JSON Server terminal also logs each request and its HTTP status, such as
`PATCH /todos/1 200`. To verify the whole app flow, make an edit in the
browser, check the response or `db.json`, and reload the page; the initial
`GET /todos` should load the saved value again.

**Validation boundary:** page-number and total-page checks live in the
application code (`TodoItem` and the Provider in `src/context/todos.jsx`).
JSON Server stores and returns the request; this project has not added
server-side business validation. The app prevents invalid form submissions,
but a direct manual API request can bypass those UI checks.

### Inline page editing and the progress bar

`TodoItem` keeps the page input in `pageInput`. Its `handlePageSubmit`
prevents the browser's default submission, rejects an empty or non-integer or
negative value, and calls `saveCurrentPage(bookId, currentPage)` from the
Provider.

`saveCurrentPage` verifies that the book exists and that the page is no
greater than `totalPages`. It then calls `updateCurrentPage` in `src/api.js`.
That helper sends an Axios `PATCH /todos/:id` with only
`{ currentPage }`. `PATCH` is important here: it changes the page field
without replacing the title, total page count, completion state, or note.

After the request succeeds, the Provider dispatches `replace` using the
server's response. React then renders the new page value and recalculates the
percentage in `TodoItem` as
`Math.round((currentPage / totalPages) * 100)`. The percentage is capped at
100; a completed book uses a green bar.

If validation or the request fails, the Provider records an error. For a
failed save, `TodoItem` restores the previous page in its input and shows a
message. The page and progress display therefore remain consistent with the
last saved book data.

### Creating, editing, and deleting books

- `TodoCreate` uses `handleTitleChange` and `handlePagesChange` to keep the
  title and `totalPages` inputs up to date. Its `handleSubmit` calls the
  Provider's `createTodo`.
- The Provider calls the API helper `createTodo`, which sends `POST /todos`.
  A new book starts with `currentPage: 0`, `done: false`, and an empty note.
  The form clears only after a successful request.
- In the current implementation, creation asks for the title and total page
  count; it initializes `currentPage` to zero instead of asking for a page
  number on the create form. This differs from the original midterm checklist
  idea of putting the page input in both forms.
- Clicking **Edit** in `TodoItem` shows `TodoEdit`. Its `handleSubmit`
  validates the total page count and sends `title`, `totalPages`, and `note`
  to the parent callback. The Provider's `editTodo` checks that the current
  page still fits within the edited total, calls `updateTodo`, and replaces
  the record with the server response.
- `deleteTodo` waits for the API helper's `DELETE /todos/:id` to succeed
  before dispatching `remove`. A failed delete therefore does not remove a
  book only from the screen.
- The completion checkbox calls `toggleTodo`, which sends a partial `PATCH`
  containing only `done`.

### What was learned beyond the initial plan

- **A page field needs an initial value.** Older records may not have
  `currentPage`, so the loader and row provide a fallback of zero.
- **Choose the HTTP method for the scope of the update.** Sending only
  `currentPage` with `PUT` could replace the rest of the record. The inline
  page save uses `PATCH`; full edits use `PUT` with the complete record.
- **An empty input is not page zero.** Converting an empty string directly to
  a number can produce a misleading value. The submit handler checks for an
  empty string before saving.
- **Update state immutably.** The reducer returns a new collection and new
  records. This ensures a successful server response updates both the page
  text and progress bar.
- **Check the layout on a narrow screen.** The form and row controls stack or
  wrap, and interactive controls use larger touch targets. These changes were
  verified at a narrow viewport.

Compared with the form and event-handler exercises in `Dynamic_Web_Fall26`,
the project connects form submission to a persistent API workflow: Axios
requests, server-response handling, reducer actions, validation, loading and
error states, and a UI that reflects saved data after refresh. The percentage
bar and the editable note are additional features beyond the core midterm
`currentPage` task.

### Five-minute code walkthrough


1. State the reading-tracker goal and user story.
2. Show `currentPage` and how it drives the progress bar.
3. Compare the plan and reflection, especially the page initialization,
   `PUT`/`PATCH`, empty input, older records, and mobile layout lessons.
4. Demonstrate adding a book, saving a valid page, rejecting invalid input,
   handling an API failure, CRUD operations, and persistence after refresh.
5. In the code, point to `handlePageSubmit`, `saveCurrentPage`,
   `updateCurrentPage`, and the reducer's `replace` case. Then show the
   progress calculation in `TodoItem`.

### 项目目标

这是一个为同时阅读多本书的读者制作的阅读进度追踪器。核心字段是
`currentPage`：读者可以在列表中直接修改页码，看到进度条随之更新，并且刷新页面后仍能保留数据。

期中计划的重点是添加 `currentPage`。完成后的应用还保存 `totalPages`，
以便显示有意义的阅读百分比；另外也增加了可编辑的备注栏。

### 主要数据流

1. `src/main.jsx` 将 `App` 渲染在 `src/context/todos.jsx` 导出的
   `Provider` 中。
2. 应用启动时，Provider 中的 `useEffect` 调用 `loadTodos`。
   `loadTodos` 再调用 `src/api.js` 中的 `fetchTodos`，由 Axios 发送
   `GET /todos`。
3. 在派发 `set` action 之前，`loadTodos` 会整理服务器记录：把 `done`
   转为布尔值，并为缺失的 `currentPage`、`totalPages` 和 `note` 设置默认值。
   因此旧的 `db.json` 记录即使没有页码，也不会因为 `undefined` 影响书目行或进度显示。
4. `todosReducer` 处理 `set`、`add`、`replace` 和 `remove`。每种 action
   都返回新数组；`replace` 也会使用新的书目对象，而不是直接修改原有状态。
5. `TodoList` 把 `visibleTodos` 映射成多个 `TodoItem`。位于
   `hoooks/use-todos-context.jsx` 的 `useTodosContext` hook 让这些组件能够调用 Provider 提供的操作。

### 服务器如何存储、更新与检查数据

项目使用 JSON Server 作为本地 API。`package.json` 中的 `server` 脚本会运行
`json-server -p 3001 --watch db.json`。JSON Server 启动时读取 `db.json`
中的 `todos` 数组，成功处理数据修改后会把结果写回该文件；`--watch`
让服务器关注文件变化。浏览器不会直接写入 `db.json`，而是由
`src/api.js` 中的 Axios 向 `http://localhost:3001` 发请求，再由服务器应用修改。

本应用使用的 API 路由如下：

| 操作 | 请求 | 结果 |
| --- | --- | --- |
| 加载所有书目 | `GET /todos` | 返回当前记录 |
| 添加书目 | `POST /todos` | 新增记录并返回创建后的记录 |
| 编辑书名、总页数或备注 | `PUT /todos/:id` | 用提交的完整记录替换原记录 |
| 保存当前页 | `PATCH /todos/:id`，请求体为 `{ "currentPage": 42 }` | 只修改当前页 |
| 修改完成状态 | `PATCH /todos/:id`，请求体为 `{ "done": true }` | 只修改完成状态 |
| 删除书目 | `DELETE /todos/:id` | 删除该记录 |

要启动并检查服务器，在项目目录打开 PowerShell 终端运行：

```powershell
npm run server
```

再开另一个 PowerShell 终端，通过应用使用的同一个 API 查询书目：

```powershell
Invoke-RestMethod -Uri 'http://localhost:3001/todos'
```

可以直接测试页码更新。请使用实际存在的书目 ID 和合法页码：

```powershell
Invoke-RestMethod -Method Patch `
  -Uri 'http://localhost:3001/todos/1' `
  -ContentType 'application/json' `
  -Body '{"currentPage":42}'
```

命令会输出服务器响应。随后再次执行 `GET` 检查保存后的值：

```powershell
Invoke-RestMethod -Uri 'http://localhost:3001/todos/1'
```

也可以直接检查 JSON Server 写入的文件：

```powershell
Get-Content .\db.json -Raw | ConvertFrom-Json | Select-Object -ExpandProperty todos
```

JSON Server 终端会记录收到的请求和 HTTP 状态码，例如
`PATCH /todos/1 200`。要检查完整应用流程，可先在浏览器中修改书目，再检查响应或
`db.json`，然后刷新页面；启动时的 `GET /todos` 应重新载入保存后的值。

**校验边界：**页码和总页数的业务校验位于应用代码（`TodoItem` 和
`src/context/todos.jsx` 中的 Provider）。JSON Server 负责保存并返回请求数据；
本项目没有添加服务器端业务校验。应用表单会拦截无效提交，但直接手动发送 API 请求可以绕过这些界面校验。

### 内联修改页码与进度条

`TodoItem` 使用 `pageInput` 保存当前页输入框的值。它的
`handlePageSubmit` 会阻止浏览器默认提交，检查空值、非整数和负数，然后调用 Provider 的
`saveCurrentPage(bookId, currentPage)`。

`saveCurrentPage` 会确认书目存在，并且输入页码不超过 `totalPages`，之后调用
`src/api.js` 中的 `updateCurrentPage`。该函数通过 Axios 发送
`PATCH /todos/:id`，请求体中只有 `{ currentPage }`。这里使用 `PATCH`
很重要：它只更新页码，不会替换书名、总页数、完成状态或备注。

请求成功后，Provider 使用服务器返回值派发 `replace`。页面随即显示新页码，
`TodoItem` 也按 `Math.round((currentPage / totalPages) * 100)` 重新计算百分比。
百分比最高为 100%；读完的书使用绿色进度条。

如果校验或请求失败，Provider 会记录错误。保存失败时，`TodoItem` 会把输入框恢复为此前保存的页码并显示错误提示。因此页码和进度条仍与最后一次成功保存的数据一致。

### 添加、编辑和删除书目

- `TodoCreate` 使用 `handleTitleChange` 和 `handlePagesChange` 更新书名与
  `totalPages` 输入值。提交时，`handleSubmit` 调用 Provider 的 `createTodo`。
- Provider 调用 API helper `createTodo`，发送 `POST /todos`。新书的初始值是
  `currentPage: 0`、`done: false` 和空备注。只有请求成功后，表单才会清空。
- 当前实现的创建表单要求输入书名和总页数，并将 `currentPage` 初始化为
  0；创建表单本身不要求输入当前页。这与期中清单中“两个表单都放入页码输入框”的构想有所不同。
- 点击 `TodoItem` 中的 **Edit** 会显示 `TodoEdit`。其 `handleSubmit`
  校验总页数，并将 `title`、`totalPages` 和 `note` 传给父组件回调。Provider 的
  `editTodo` 会检查当前页是否仍在新的总页数范围内，再调用 `updateTodo`，
  最后使用服务器响应替换对应记录。
- `deleteTodo` 会等待 API helper 的 `DELETE /todos/:id` 请求成功后才派发
  `remove`。删除失败时，书目不会只从页面上消失。
- 完成状态复选框会调用 `toggleTodo`，它发送只包含 `done` 的局部
  `PATCH` 请求。

### 相对初始计划的经验与扩展

`期中.md` 中的复盘记录了几类问题，在当前实现中同样重要：

- **页码字段需要初始值。**旧记录可能没有 `currentPage`，所以数据加载和列表行都为它提供了 0 的回退值。
- **根据更新范围选择 HTTP 方法。**如果用 `PUT` 只发送 `currentPage`，可能会替换整条记录。内联页码保存使用 `PATCH`；完整编辑则用包含全部字段的 `PUT`。
- **空输入不等于第 0 页。**直接把空字符串转成数字会得到容易误判的结果，所以提交处理器在保存前专门检查空值。
- **不可变地更新状态。**reducer 返回新的集合和新对象，保证服务器响应能让页码文本和进度条同时更新。
- **在窄屏上实际检查布局。**表单和书目操作会堆叠或换行，交互控件也使用更大的触控区域；这些调整已在窄视口中检查。

相较于 `Dynamic_Web_Fall26` 中的表单和事件处理练习，这个项目把表单提交接入了完整的数据持久化流程：Axios 请求、处理服务器响应、reducer action、校验、加载与错误状态，以及刷新后从服务器恢复已保存数据。百分比进度条和可编辑备注则是核心期中 `currentPage` 任务之外的扩展。

### 五分钟代码演示顺序

按 `期中.md` 的演示顺序进行：

1. 介绍阅读追踪器的用途和用户故事。
2. 展示 `currentPage`，说明它如何驱动进度条。
3. 对比计划与复盘，重点讲页码初始化、`PUT`/`PATCH`、空输入、旧数据和移动端布局。
4. 演示添加书目、保存有效页码、拒绝无效输入、处理 API 错误、CRUD 操作，以及刷新后的数据持久性。
5. 代码走查时指出 `handlePageSubmit`、`saveCurrentPage`、
   `updateCurrentPage` 和 reducer 中的 `replace` 分支，最后展示
   `TodoItem` 中的进度计算。
