const skirko = [1, 2]
const manegers = [7, 9, 11]
const enginears = [5, 8, 15]


const users = [
  {
    username: 'skirko-vn',
    tgUserId: 0,
    comps: 'all'
  },
  {
    username: 'rozevskaya-v?',
    tgUserId: 0,
    comps: manegers
  },
  {
    username: 'test',
    tgUserId: 16001314370,
    comps: manegers
  },
  {
    username: 'arafailov-as',
    tgUserId: 171549268,
    comps: 11,
  },
  {
    username: 'mamedov-rn',
    tgUserId: 825873412,
    comps: 'all',
  },
]

const checkAccess = (compNumb, userid) => {
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

export default {
  checkAccess,
}
