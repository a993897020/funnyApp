import Home from './components/home/Home'
import Word from './components/word/Word'
import Picture from './components/picture/Picture'
import Video from './components/video/Video'
import Bg from './components/bg/Bg'
export const routes=[
    {path:"/",name:"bgLink",component:Bg},
    {path:"/home",name:"homeLink",component:Home},
    {path:"/word",name:"wordLink",component:Word},
    {path:"/picture",name:"pictureLink",component:Picture},
    {path:"/video",name:"videoLink",component:Video},
]