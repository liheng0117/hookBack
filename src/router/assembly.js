import { Loadable } from '@@'

const LayoutPage = Loadable(() => import('@@/LayoutPage'))
const Home = Loadable(() => import('@/pages/home'))
const Login = Loadable(() => import('@/pages/login'))
const Reg = Loadable(() => import('@/pages/reg'))
const List = Loadable(() => import('@/pages/list'))
const Echart = Loadable(() => import('@/pages/echart'))

export { Home, Login, Reg, LayoutPage, List, Echart }
