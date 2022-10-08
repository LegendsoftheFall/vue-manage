// 表单验证规则接口
interface RuleProp {
    type: 'required' | 'email' | 'password'
    message: string
}
export type RulesProp = RuleProp[]

// 图片的类型
interface ImageProps {
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
