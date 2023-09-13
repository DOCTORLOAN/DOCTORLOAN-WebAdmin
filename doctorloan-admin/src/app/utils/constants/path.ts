const prefix = '/'

export const PathURL = {
  dashboard: `${prefix}dashboard`,
  signin: '/signin',
  signup: '/signup',
  users: {
    create_user: `${prefix}user/create`,
    edit_user: `${prefix}user/{0}/information`,
    index: `${prefix}users`,
  },
  customers: {
    create: `${prefix}customer/create`,
    edit: `${prefix}customer/{0}/information`,
    index: `${prefix}customers`,
  },
  bookings: {
    edit: `${prefix}booking/{0}/information`,
    index: `${prefix}bookings`,
  },
  orders: {
    edit: `${prefix}order/{0}`,
    index: `${prefix}orders`,
  },
}
