const os = require("os");
const getHours = () => {

  const date = new Date();

  return `${date.getHours()}:${date.getMinutes()}`
}
const isRootUser = () => {

  return os.userInfo().uid === 0;

}
const getDirectoryNameFormated = (directoryName) => {

  let badFormatCwd = ""

  if (process.platform === "win32") {

    badFormatCwd = directoryName.trim().split("\\")
  } else {

    badFormatCwd = directoryName.trim().split("/");

  }
  return `/${badFormatCwd[badFormatCwd.length - 1]}`

}

const getDayOfWeek = () => {

  const actualDate = new Date();

  const hour = actualDate.getHours();

  const options = { weekday: 'long' }

  const nameOfDay = actualDate.toLocaleDateString('es-ES', options)

  return ["sábado", "domingo"].includes(nameOfDay) ? `${nameOfDay} 󱁕 ` : (nameOfDay === "viernes" && hour > 14 ? `${nameOfDay} 󱁕 ` : nameOfDay)
}

module.exports = {
  getHours,
  isRootUser,
  getDayOfWeek,
  getDirectoryNameFormated
}
