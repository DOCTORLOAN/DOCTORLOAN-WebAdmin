const auth_prefix = `auth-module/`
const user_prefix = `user-module/`
const customer_prefix = `customer-module/`
const booking_prefix = `booking-module/`
const product_prefix = `product-module/`
const common_prefix = `common-module/`
const news_prefix = `news-module/`
const order_prefix = `order-module/`

export const APIURL = {
  AUTHEN: {
    SIGNUP: `${auth_prefix}auth/signin`,
    SIGNIN: `${auth_prefix}auth/signin`,
  },
  COMMON: {
    LIST_OPTION: `${common_prefix}common/option/`,
    GetMenus: `${common_prefix}common/GetMenus`,
    UploadImage: `${common_prefix}media/UploadImage`,
  },
  USER: {
    DEFAULT: `${user_prefix}user`,
    FILTER: `${user_prefix}user/filter`,
    PROFILE: `${user_prefix}user/me`,
    CREATE: `${user_prefix}user/create`,
    UPDATE: `${user_prefix}user/update`,
    RESET_PASS: `${user_prefix}user/reset-password`,
  },
  PRODUCT: {
    GetOptions: `${product_prefix}product/GetOptions`,
    GetProduct: `${product_prefix}product/GetProduct`,
    FilterProducts: `${product_prefix}product/FilterProducts`,
    InsertProduct: `${product_prefix}product/InsertProduct`,
    UpdateProduct: `${product_prefix}product/UpdateProduct`,
    UpdateProductStatus: `${product_prefix}product/UpdateProductStatus`,
    DeleteProduct: `${product_prefix}product/DeleteProduct`,
  },
  CATEGORY: {
    FilterCategories: `${product_prefix}category/FilterCategories`,
    GetCategory: `${product_prefix}category/GetCategory`,
    DeleteCategory: `${product_prefix}category/DeleteCategory`,
    SaveCategory: `${product_prefix}category/SaveCategory`,
  },
  NEWS_CATEGORY: {
    FilterCategories: `${news_prefix}NewsCategory/FilterCategories`,
    GetNewsCategoryId: `${news_prefix}NewsCategory/GetNewsCategoryId`,
    SaveCategory: `${news_prefix}NewsCategory/SaveCategory`,
    DeleteCategory: `${news_prefix}NewsCategory/DeleteCategory`,
    UpdateCategoryStatus: `${news_prefix}NewsCategory/UpdateCategoryStatus`,
  },
  NEWS: {
    FilterNews: `${news_prefix}NewsItem/FilterNews`,
    GetTags: `${news_prefix}NewsItem/GetTags`,
    GetNewById: `${news_prefix}NewsItem/GetNewById`,
    InsertNews: `${news_prefix}NewsItem/InsertNews`,
    UpdateNews: `${news_prefix}NewsItem/UpdateNews`,
    UpdatNewsStatus: `${news_prefix}NewsItem/UpdatNewsStatus`,
    DeleteNews: `${news_prefix}NewsItem/DeleteNews`,
  },
  CUSTOMER: {
    DEFAULT: `${customer_prefix}customer`,
    FILTER: `${customer_prefix}customer/filter`,
    CREATE: `${customer_prefix}customer/create`,
    UPDATE: `${customer_prefix}customer/update`,
    LIST_ADDRESS: `${customer_prefix}customer/filter-address`,
  },
  BOOKING: {
    DEFAULT: `${booking_prefix}booking`,
    FILTER: `${booking_prefix}booking/filter`,
    UPDATE: `${booking_prefix}booking/update`,
    UPDATE_STATUS: `${booking_prefix}booking/update-status`,
  },
  ORDER: {
    DEFAULT: `${order_prefix}order`,
    FILTER: `${order_prefix}order/filter`,
    UPDATE: `${order_prefix}order/update-status`,
  },
}
