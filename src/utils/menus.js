import Layout from '@/layout'
import {Base64} from 'js-base64'

/**
 * 格式化路由
 * @param {*} routes 
 */
export const formatRoutes = (routes) => {
    
    let fmRoutes = [];
    routes.forEach(router => {
        fmRoutes.push(initRoute(router))
    })
    return fmRoutes;
}

/**
 * 初始化路由
 * @param {*} router 
 */
function initRoute(router){

        if (router.children && router.children instanceof Array && router.children.length > 0) {
            let childrens = [];
            for (let children of router.children ) {
                childrens.push(initRoute(children));
            }
            router.children = childrens;
        }

        let componentFuc = router.component === null ?  Layout :  function(resolve) {
            
            require(['../views' + router.component + '.vue'], resolve);
        }

        let fmRouter = {
            path: router.path,
            component: componentFuc
        }
        
        router.children.length > 0 && (fmRouter.children = router.children)
        router.redirect &&  (fmRouter.redirect = router.redirect)
        router.name &&  (fmRouter.name = router.name)
        if(router.metaTitle){
            fmRouter.meta = {
                icon: router.metaIcon,
                title: router.metaTitle,
                cache: router.metaCache,
                affix: router.metaAffix,
                breadcrumb: router.metaBreadcrumb,
                activeMenu: router.metaActiveMenu
            }
        }
        
       return fmRouter;
}

/**
 * 初始化本地缓存的路由，避免造成404 error
 */
export async function initLocalCacheMenus(router){

    let menus = localStorage.getItem("userInfo_menus")
    
    menus = Base64.decode(menus)
    menus =  JSON.parse(menus)
    if(menus) {
        let accessedRoutes =  formatRoutes(menus)
        router.addRoutes(accessedRoutes)
      }
}


export async function cacheMenus(menus){

    menus = JSON.stringify(menus)
    menus = Base64.encode(menus)
    localStorage.setItem("userInfo_menus",menus);
}
