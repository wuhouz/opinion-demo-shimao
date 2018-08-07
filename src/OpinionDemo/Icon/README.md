## Icon

*
author: cage    
email: feng.liu@ifchange.com
*

通过 font 和 svg 来实现单色或彩色的图标，所有的图标都可以在 **字体** 中找到；使用时只需复制 `icon-` 后面的字符串，添加到 `Icon` 组件的 `type` 属性上即可。如：

````
<Icon type="search_normal" />       // 单色的搜索icon

<Icon type="color-stars_full" />    // 多色图标
````

*Tips:单色或彩色 icon 的大小均可用 css 的 font-size 来控制，单色 icon 的颜色使用 css 的 color 属性控制*

### API

属性|说明|类型|默认值
---|----|---|-----
type|`icon` 的类型，请从 **字体** 下查找，多色图标的type均以 `color-` 开头 | string | -
className|自定义图标的类名|string|-
size|Icon大小|Number|-
