export enum StatusEnum {
  Draft = 1,
  Publish = 2,
  Blocked = 3,
  Removed = 4,
  Deleted = 20,
}

export enum BookingStatusEnum {
  Mới = 10,
  Xác_thực = 20,
  Từ_chối = 30,
  Đang_khám = 40,
  Hoàn_thành = 50,
}

export enum OrderStatusEnum {
  Mới = 10,
  Xác_thực = 20,
  Đang_vận_chuyển = 30,
  Hoàn_thành = 40,
  Hủy = 50,
  Hoàn_hàng = 60,
  Hoàn_hàng_thành_công = 70,
}

export enum OrderPaymentMethod {
  Thanh_toán_khi_nhận_hàng = 1,
  Chuyển_khoản = 2,
}
