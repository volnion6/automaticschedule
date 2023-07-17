import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Calendar from '@/components/Calendar'
import Calendar1 from '@/components/Calendar1'
import Draggable from '@/components/DraggableHello'
import Draggable2 from '@/components/draggable'
import Home from '@/view/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Calendar',
      name: 'Calendar',
      component: Calendar
      // redirect: '@/components/Calendar.vue'
    },
    {
      path: '/Calendar1',
      name: 'Calendar1',
      component: Calendar1
    },
    {
      path: '/draggable',
      name: 'draggable',
      component: Draggable
    },
    {
      path: '/draggable2',
      name: 'draggable2',
      component: Draggable2
    }
    // {
    //   path: '/HelloWorld',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ],
  mode: 'history'
})
