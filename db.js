const skirko = [1, 2]
const manegers = [7, 9, 11]
const enginears = [5, 8, 15]


const users = [
  {
    username: 'skirko-vn',
    tgUserId: null,
    comps: 'all'
  },
  {
    username: 'rozevskaya-v?',
    tgUserId: null,
    comps: manegers
  },
  {
    username: 'arafailov-as',
    tgUserId: 171549268,
    comps: manegers,
  },
  {
    username: 'mamedov-rn',
    tgUserId: 825873412,
    comps: 7,
  },
]

checkAccess = function (compNumb, userid) {
  const user = users.filter(user => user.tgUserId === userid)[0]
  if (user?.comps === 'all') {
    return { user: true, access: true }
  }
  if (user) {
    const position = [].concat(user.comps).indexOf(compNumb)
    return { user: true, access: (position >= 0) }
  }
  return { user: false, access: false }
}

module.exports = {
  users,
  checkAccess,
}
