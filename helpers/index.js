const os = require("os");
const getHours = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`
}
const isRootUser = () => {
  return os.userInfo().uid === 0;
}
const getDirectoryNameFormated = (directoryName) => {
  const badFormatCwd = directoryName.trim().split("/");
  return `/${badFormatCwd[badFormatCwd.length - 1]}`
}
const getDayOfWeek = () => {
  const actualDate = new Date();

  const options = { weekday: 'long' }

  const nameOfDay = actualDate.toLocaleDateString('es-ES', options)

  return ["sabado", "domingo"].includes(nameOfDay) ? `${nameOfDay} 󱁕 ` : nameOfDay
}

module.exports = {
  getHours, isRootUser, getDayOfWeek, getDirectoryNameFormated
}
