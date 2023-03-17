export interface TagProps {
  id: number
  isMark: boolean
  isLike: boolean
  like?: number
  comment?: number
  Tags: string[]
}

export interface PostProps {
  id: number
  username: string
  avator?: string
  createTime: string
  title: string
  content: string
  image?: string
  tags: TagProps
}

export const testTagsData: TagProps[] = [
  {
    id: 1,
    isMark: false,
    isLike: false,
    like: 11,
    comment: 23,
    Tags: ['Go', 'Web开发', 'Gin']
  },
  {
    id: 2,
    isMark: true,
    isLike: false,
    like: 8,
    comment: 2,
    Tags: ['JavaScript', 'Vue', 'Tailwind', 'SVG']
  },
  {
    id: 3,
    isMark: false,
    isLike: true,
    like: 1,
    Tags: ['Go', 'Web开发']
  }
]

export const testPostData: PostProps[] = [
  {
    id: 1,
    username: '发腮的汤姆猫',
    createTime: '2022年10月4日',
    title: 'GoWeb开发',
    content: 'Gin框架介绍 Gin是一个用 Go (Golang) 编写的 web 框架。它是一个类似于martini但性能更好的API框架，不同于谢大主导的Beegoweb框架，后者更像是Python语言中的Django框架，内部包含了开发一个web程序所需的各种组件。如果你是性能和高效的追求者，我相信你会像我一样爱上Gin。同时，不同于其他Golang语言的API框架，该框架社区十分活跃，并且主程仍然在不断更新和改进，我们知道通常情况下在选择一个开源的软件或者相关库时，社区的活跃度以及项目的更新情况会非常重要(考虑到后期的维护和性能和特性问题)。另外一方面，该框架官方提供了很多简单的示例来供我们快速运行一个期望的http服务，这对于一个刚转入Golang进行业务开发的同学来说是一个非常好的开始。Gin官方提供的各种HTTP服务示例当然我在很长一段时间也仅是去看官方示例来快速熟悉并实现自己的业务需求，但当有一些特殊的需求时通常去查看官方的具体实现来满足需求，长期如此，不仅耗时且效率极低，因此我产生了将核心源码探究一番的兴趣，希望能通过源码方式来对Gin框架有个深入的学习。',
    avator: require('@/assets/image/miyeon.jpg'),
    image: require('@/assets/image/experience.svg'),
    tags: {
      id: 1,
      isMark: false,
      isLike: false,
      like: 11,
      comment: 23,
      Tags: ['Go', 'Web开发', 'Gin']
    }
  },
  {
    id: 2,
    username: '发腮的杰瑞',
    createTime: '2022年10月3日',
    title: 'GoWeb开发',
    content: 'Gin框架介绍 Gin是一个用 Go (Golang) 编写的 web 框架。它是一个类似于martini但性能更好的API框架，不同于谢大主导的Beegoweb框架，后者更像是Python语言中的Django框架，内部包含了开发一个web程序所需的各种组件。如果你是性能和高效的追求者，我相信你会像我一样爱上Gin。同时，不同于其他Golang语言的API框架，该框架社区十分活跃，并且主程仍然在不断更新和改进，我们知道通常情况下在选择一个开源的软件或者相关库时，社区的活跃度以及项目的更新情况会非常重要(考虑到后期的维护和性能和特性问题)。另外一方面，该框架官方提供了很多简单的示例来供我们快速运行一个期望的http服务，这对于一个刚转入Golang进行业务开发的同学来说是一个非常好的开始。Gin官方提供的各种HTTP服务示例当然我在很长一段时间也仅是去看官方示例来快速熟悉并实现自己的业务需求，但当有一些特殊的需求时通常去查看官方的具体实现来满足需求，长期如此，不仅耗时且效率极低，因此我产生了将核心源码探究一番的兴趣，希望能通过源码方式来对Gin框架有个深入的学习。',
    avator: require('@/assets/image/shuhua.jpg'),
    tags: {
      id: 2,
      isMark: true,
      isLike: false,
      like: 8,
      comment: 2,
      Tags: ['JavaScript', 'Vue', 'Tailwind', 'SVG']
    }
  },
  {
    id: 3,
    username: '发腮的布拉德皮特',
    createTime: '2022年10月2日',
    title: 'GoWeb开发',
    content: 'Gin框架介绍 Gin是一个用 Go (Golang) 编写的 web 框架。它是一个类似于martini但性能更好的API框架，不同于谢大主导的Beegoweb框架，后者更像是Python语言中的Django框架，内部包含了开发一个web程序所需的各种组件。如果你是性能和高效的追求者，我相信你会像我一样爱上Gin。同时，不同于其他Golang语言的API框架，该框架社区十分活跃，并且主程仍然在不断更新和改进，我们知道通常情况下在选择一个开源的软件或者相关库时，社区的活跃度以及项目的更新情况会非常重要(考虑到后期的维护和性能和特性问题)。另外一方面，该框架官方提供了很多简单的示例来供我们快速运行一个期望的http服务，这对于一个刚转入Golang进行业务开发的同学来说是一个非常好的开始。Gin官方提供的各种HTTP服务示例当然我在很长一段时间也仅是去看官方示例来快速熟悉并实现自己的业务需求，但当有一些特殊的需求时通常去查看官方的具体实现来满足需求，长期如此，不仅耗时且效率极低，因此我产生了将核心源码探究一番的兴趣，希望能通过源码方式来对Gin框架有个深入的学习。',
    image: require('@/assets/image/writer.svg'),
    tags: {
      id: 3,
      isMark: false,
      isLike: true,
      like: 1,
      Tags: ['Go', 'Web开发']
    }
  }
]
