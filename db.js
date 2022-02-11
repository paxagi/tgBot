const manegers = [7, 9, 11]
const enginears = [5, 8, 15]


const users = [
  {
    username: 'skirko-vn',
    tgUserId: 1193433019,
    comps: 'all'
  },
  {
    username: 'rozevskaya-vv',
    tgUserId: 1033242372,
    comps: manegers,
  },
  {
    username: 'arafailov-as',
    tgUserId: 1078469403,
    comps: 11,
  },
  {
    username: 'mamedov-rn',
    tgUserId: 825873412,
    comps: 'all',
  },
  {
    username: 'sorokina-mv',
    tgUserId: 983947898,
    comps: 9,
  }
]

export default (compNumb, userid) => {
  const user = users.filter(user => user.tgUserId === userid)[0]
  if (user?.comps === 'all') {
    return { user: true, access: true }
  }
  if (user) {
    const position = [].concat(user.comps).indexOf(compNumb) //массив доступных компов
    return { user: true, access: (position >= 0) }
  }
  return { user: false, access: false }
}
