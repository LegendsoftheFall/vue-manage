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

export interface TagSimpleProps{
  id?: string
  name?:string
}

// 文章信息的类型
export interface articleInfoProps{
  likes: number
  comments: number
  viewCount: number
  id: string
  authorID: string
  title: string
  subtitle: string
  content: string
  image?: string
  tags: TagSimpleProps[]
  createTime: string
  format: string
}

export interface ArticleInfoProps{
  authorName?: string
  avatar?: string
  articleInfo: articleInfoProps
}

// 文章内容的类型
export interface ArticleDetailProps{
  userInfo?: {
    userID: string
    username: string
    avatar?: string
    email: string
    introduction: string
    follower: number
  }
  article?: {
    likes?: number
    comments?: number
    viewCount?: number
    id: string
    authorID: string
    title: string
    subtitle?: string
    content: string
    markdown: string
    image?: string
    source?: string
    createTime: string
    format: string
  }
  tags?: TagSimpleProps[]
}

export interface UserInfoProps{
  userID?: string
  username?: string
  avatar?: string
  email?: string
  introduction?: string
  follower?: number
}

// 创建文章类型
export interface ArticleProps{
  title: string
  subtitle?: string
  content: string
  markdown?: string
  html?: string
  image?: string
  tags: number[]
}

// 文章分页类型
export interface homePageProps{
  total: number
  page: number
  size: number
}

// 滚动分页类型
export interface scrollPageProps{
  isReadyLoad: boolean
  isRequest: boolean
  total: number
  page: number
  size: number
}

export interface GlobalDataProps{
  error: GlobalErrorProps
  aToken: string
  rToken: string
  loading: boolean
  editMode: boolean
  total: number
  posts: PostProps[]
  tags: TagProps
  trend: TrendingProps[]
  user: UserProps
  userInfo: UserInfoProps
  articleInfo: ArticleInfoProps[]
  homeArticleInfo: articleInfoProps[]
  homePage: homePageProps
  scrollPage: scrollPageProps
  articleDetail: ArticleDetailProps
  imgUrl: ImageProps
  article: ArticleProps
  tagNumberList: string[]
  tagNameList: string[]
}
