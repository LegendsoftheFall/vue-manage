import { PostProps } from '@/model/TestPostData'
// 表单验证规则接口
interface RuleProp {
    type: 'required' | 'email' | 'password' | 'custom'
    message: string
    validator?: () => boolean
}
export type RulesProp = RuleProp[]

// 响应类型
// eslint-disable-next-line @typescript-eslint/ban-types
export interface ResponseType<P = {}> {
  code: number
  msg: string
  data: P
}

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

// 上传状态类型
export type UploadStatus = 'ready' | 'uploading' | 'success' | 'error'
// 检查上传状态函数类型
export type CheckFunction = (file: File) => boolean

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
  // id?: string
  url?: string
  // createAt?: string
}

// 标签排行的类型
export interface TrendingProps{
    id: string
    num: string
    name: string
    image: string
}

// 标签的类型
export interface TagProps{
  id?: string
  articleNum?: string
  followerNum?: string
  name?: string
  image?: string
  introduction?: string
}

// 文章信息的类型
export interface ArticleInfoProps{
  authorName: string
  avatar?: string
  articleInfo: {
    likes: number
    comments: number
    viewCount: number
    id: string
    authorID: string
    title: string
    content: string
    image?: string
    tags: string[]
    createTime: string
    format: string
  }
}

// 创建文章类型
export interface ArticleProps{
  title: string
  content: string
  markdown?: string
  html?: string
  image?: string
  tags: number[]
}

export interface GlobalDataProps{
  error: GlobalErrorProps
  aToken: string
  rToken: string
  loading: boolean
  posts: PostProps[]
  tags: TagProps
  trend: TrendingProps[]
  user: UserProps
  articleInfo: ArticleInfoProps[]
  imgUrl: ImageProps
  article: ArticleProps
  tagNumberList: string[]
  tagNameList: string[]
}
