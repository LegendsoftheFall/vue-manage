import { PostProps } from '@/model/TestPostData'
// 表单验证规则接口
interface RuleProp {
    type: 'required' | 'email' | 'password' | 'custom'
    message: string
    validator?: () => boolean
}
export type RulesProp = RuleProp[]

// 导航栏类型
export interface dockerProps{
  icon?: string
  isShow?: boolean
  text: string
  to: string
  index: number
}

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
// 保存状态类型
export type SaveStatus = 'ready' | 'saving' | 'success' | 'error'
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

// 用户主页的信息类型
export interface UserInfoProps{
  userID?: string
  username?: string
  avatar?: string
  email?: string
  introduction?: string
  homePage?: string
  github?: string
  follower: number
  following: number
  isFollow: boolean
}

// 后台用户资料类型
export interface UserProfileProps {
  username: string
  avatar: string
  location: string
  company: string
  position: string
  introduction: string
  homePage:string
  github:string
}

// 用户资料类型
export interface ProfileProps {
  userID: string
  username: string
  email: string
  avatar: string
  location: string
  company: string
  position: string
  introduction: string
  homePage:string
  github:string
  format: string
  follower: number
  following: number
  isFollow: boolean
}

// 图片的类型
export interface ImageProps {
  // id?: string
  url?: string
  // createAt?: string
}

// 标签信息的类型
export interface TagInfoProps{
    id: string
    num: string
    name: string
    image: string
    isFollow: boolean
}

// 标签的类型
export interface TagProps{
  id?: string
  articleNum: number
  followerNum: number
  name?: string
  image?: string
  introduction?: string
  isFollow: boolean
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
  isLiked: boolean
  isCollected: boolean
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
  article: {
    likes: number
    comments: number
    viewCount: number
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
  isLiked: boolean
  isCollected: boolean
}

// 草稿内容的类型
export interface DraftDetailProps{
  id: string
  authorID: string
  title: string
  subtitle?: string
  content: string
  markdown: string
  image?: string
  createTime: string
  format: string
  tagSimple?: TagSimpleProps[]
}

// 草稿信息的类型
export interface DraftInfoProps{
  id: string
  authorID: string
  title: string
  subtitle?: string
  content: string
  format: string
  image?: string
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

export interface ContentProps{
  title: string
  subtitle: string
  content: string
}

// 文章分页类型
export interface LoadParams {
  page: number
  size: number
  id?:string
  order?:string
}

// 滚动分页类型
export interface scrollPageProps{
  isReadyLoad: boolean
  isRequest: boolean
}

// 评论列表类型
export interface commentReply{
  is_like: boolean
  is_click: boolean
  level: number
  item_type: number
  likes: number
  reply_status: number
  reply_comment_id: string
  reply_id: string
  reply_to_reply_id: string
  user_id: string
  reply_to_user_id: string
  item_id: string
  reply_content: string
  reply_picture: string
  format: string
  binding: string
  create_time: string
}

export interface commentInfo{
  is_like: boolean
  is_click: boolean
  reply_count: number
  item_type: number
  comment_status: number
  likes: number
  comment_id: string
  user_id: string
  item_id: string
  content: string
  picture: string
  format: string
  create_time: string
  binding: string
  comment_replies: commentReply[]
}

export interface commentUserInfo{
  userID:string
  follower: number
  following: number
  username: string
  avatar: string
  email: string
  introduction: string
  homePage: string
  github: string
  position: string
  isFollow: boolean
}

export interface replyInfos{
  reply_id: string
  reply_info: commentReply
  parent_reply: commentReply
  user_info: commentUserInfo
  reply_user: commentUserInfo
}

export interface commentList{
  comment_id: string
  comment_info: commentInfo
  user_info: commentUserInfo
  reply_infos: replyInfos[]

}

export interface GlobalDataProps{
  error: GlobalErrorProps
  aToken: string
  rToken: string
  loading: boolean
  saving: SaveStatus
  editMode: boolean
  createDraftMode: boolean
  saveDraftMode: boolean
  total: number
  posts: PostProps[]
  tags: TagProps
  tagInfo: TagInfoProps[]
  trend: TagInfoProps[]
  user: UserProps
  userInfo: UserInfoProps
  userInfos: UserInfoProps[]
  userProfile: UserProfileProps
  profile: ProfileProps
  articleInfo: ArticleInfoProps[]
  draftInfo: DraftInfoProps[]
  homeArticleInfo: articleInfoProps[]
  scrollPage: scrollPageProps
  articleDetail: ArticleDetailProps
  draftDetail: DraftDetailProps
  imgUrl: ImageProps
  article: ArticleProps
  tagNumberList: string[]
  tagNameList: string[]
  commentList: commentList[]
}
