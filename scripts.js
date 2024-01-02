/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"zBnzN8GEsiIUXMiF","label":"General","bookmarks":[{"id":"IYBfeZwGAdg5fxdn","label":"youtube","url":"https://youtube.com"},{"id":"Ek14ZSShaYzfxbWc","label":"github","url":"https://github.com/leemon22"},{"id":"KcVYZyHt7YcOthPR","label":"chatgpt","url":"https://chat.openai.com"},{"id":"HJ8tMNb1wpsSQFyp","label":"gmail","url":"https://gmail.com"}]},{"id":"u9BLWNqaVCf3fZJ9","label":"Uni","bookmarks":[{"id":"6zIOTKhB4oraE0ie","label":"prado","url":"https://pradogrado2324.ugr.es/"},{"id":"cOdYd1h6VnugHBoO","label":"mail.ugr","url":"https://webmailest.ugr.es"},{"id":"I9pTfME5WdK3laA5","label":"josealberto","url":"https://github.com/Joshoccas"},{"id":"6yGaE1Ql70OQ5BRm","label":"wuolah","url":"https://wuolah.com/"}]},{"id":"Btn2NVry2XW7tKwf","label":"SocialMedia","bookmarks":[{"id":"U7q5fVacXiuK0cxS","label":"twitch","url":"https://twitch.tv"},{"id":"ixRp83GACjTeDyjm","label":"instagram","url":"https://instagram.com"},{"id":"XC96C4QtCgYaAkyw","label":"reddit","url":"https://reddit.com"}]},{"id":"MHiHVb6aj1lOdM5x","label":"Admin","bookmarks":[{"id":"PNP9XJUoz8Gjbdf6","label":"bitwarden","url":"https://pjwarden.duckdns.org"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
