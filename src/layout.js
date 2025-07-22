const { html } = require("hono/html");

function layout(c, title, body) {
  const { user } = c.get("session") ?? {};
  const theme = user?.theme ?? "light"; 
  let themeColor = null;
  if(theme === "dark"){
    themeColor = "ライト";
  }else{
    themeColor = "ダーク";
  }
  title = title ? `${title} - 予定調整くん` : "予定調整くん";
  return html`
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/stylesheets/bundle.css" />
      </head>
      <body class="overflow-scroll" data-bs-theme="${theme}">
        <nav class="navbar navbar-expand-md navbar-${theme} bg-${theme}">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">予定調整くん</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbarResponsive" class="collapse navbar-collapse">
              <ul class="navbar-nav ms-auto">
                ${user
                  ? html`
                  <li class="nav-item">
                      <button class="btn btn-outline-${theme === 'light' ? 'dark' : 'light'} dropdown-toggle" type="button" id="menu" data-bs-toggle="dropdown" aria-expanded="false">
                        ${user.login}
                      </button>
                      <ul class="dropdown-menu btn-outline-dark dropdown-menu-end" aria-labelledby="menu">
                          <li>
                            <a class="dropdown-item" id="toggle-theme" href="/changeTheme">${themeColor}モードに切り替え</a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="/logout">${user.login} をログアウト</a>
                        </li>
                      </ul>          
                  </li>
                    `
                  : html`
                      <li class="nav-item">
                        <a class="nav-link" href="/login">ログイン</a>
                      </li>
                    `}
              </ul>
            </div>
          </div>
        </nav>
        <div class="container">${body}</div>
        <script src="/javascripts/bundle.js"></script>
        <script src="/app/entry.js"></script> 
      </body>
    </html>
  `;
}

module.exports = layout;
