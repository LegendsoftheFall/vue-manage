// 表单验证规则接口
interface RuleProp {
    type: 'required' | 'email' | 'password' | 'custom'
    message: string
    validator?: () => boolean
}
export type RulesProp = RuleProp[]

// 弹窗类型
// export type ToastPositionType = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
export type MessageType = 'success' | 'info' | 'warning' | 'error'
export interface ToastProps{
  id: number
  type: MessageType
  message?: string
  // duration?: number
  // position?: ToastPositionType
}

// 全局错误类型
export interface GlobalErrorProps{
  status: boolean
  code?: number
  message?: string
}

// 用户信息类型
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: string;
  avatar?:string
  email?:string
}

// 图片的类型
export interface ImageProps {
  id?: string
  url?: string
  createAt?: string
}

// 标签排行的类型
export interface TrendingProps{
    id: string
    num: string
    name: string
}
