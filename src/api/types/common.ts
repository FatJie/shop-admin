export interface ILoginInfo {
  logo_square: string
  logo_rectangle: string
  login_logo: string
  slide: string[]
}

export interface TMenu {
  path: string
  title: string
  icon: string
  header: string
  is_header: string
  children?: TMenu
}

export interface TUserInfo {
  id: number
  account: string
  head_pic: string
}

export interface TLoginResponse {
  token: string
  stringexpires_time: number
  TMenus: TMenu[]
  unique_auth: string[]
  user_info: TUserInfo
  logo: string
  logo_square: string
  version: string
  newOrderAudioLink: string
}
