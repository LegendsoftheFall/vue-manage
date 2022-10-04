// 表单验证规则接口
interface RuleProp {
    type: 'required' | 'email' | 'password'
    message: string
}
export type RulesProp = RuleProp[]
