# 青墨 · Teal Ink

  『青墨』以暖中性色为底, 以青绿色为主色, 鼠尾草绿为辅色, 延续温润, 清疏与书卷感. 精致来自排版, 比例与留白. 仓库包含面向 Vue 3 的主题与组件库 `@teal-ink/vue`, 构建在 Naive UI 之上: 一套以 CSS 变量输出的设计 token, 一层语义化主题映射, 以及少量以 `Ti` 为前缀的自有组件

## 特性

- 设计 token 以 `packages/teal-ink/src/tokens.ts` 为唯一来源, 由 `createCssVariables` 输出 CSS 变量, 由 `createThemeOverrides` 映射 Naive UI 主题
- 完整 re-export Naive UI 组件, 在 `TiProvider` 内自动应用青墨主题
- 自有组件: `TiProvider`, `TiButton`, `TiCard`, `TiInput`, `TiTag`, `TiLogo`, `TiThemeSwitch`
- 明暗模式跟随系统或手动切换, 支持 View Transitions 展开动画, 尊重 `prefers-reduced-motion`
- `examples/showcase` 提供全部导出组件的实时示例

## 快速上手

```ts
import { TiProvider, TiButton, dateZhCN, zhCN } from '@teal-ink/vue'
import '@teal-ink/vue/style.css'
```

```vue
<TiProvider mode="system" :locale="zhCN" :date-locale="dateZhCN">
  <TiButton variant="primary">你好, 青墨</TiButton>
</TiProvider>
```

  `TiProvider` 默认只影响内部子树; 开启 `global` 时同步文档根元素的 `data-ti-theme` 与全局样式. 自动模式将系统偏好解析为有效明暗值并响应其变化, 用户明确选择浅色或深色后不再随系统切换, 选择不持久化. 全部导出见 `packages/teal-ink/src/index.ts`

  外观切换使用胶囊容器与滑动圆形选中态. 全局模式下, 明暗变化从触发按钮向外展开, 系统变化从视口中心展开; 使用 View Transitions 保留切换前后的完整配色, 切换期间暂停控件的颜色渐变, 不将正文与背景混合成低对比度的中间色. 局部 Provider, 不支持该 API 或偏好减少动态效果时直接切换, 连续操作以最后一次选择为准

## 本地开发

| 命令 | 作用 |
| ---- | ---- |
| `bun run dev` | 构建库并启动 showcase, 端口 `6006` |
| `bun run check` | `vue-tsc` 全仓类型检查 |
| `bun run build` | 构建库与 showcase |
| `bun run preview` | 预览 showcase 构建产物 |

```
packages/teal-ink      @teal-ink/vue 主题与组件
examples/showcase      展示站, src/examples 内每个导出组件对应一个示例文件
brand                  品牌标记资源与品牌预览页
```

  showcase 构建前运行 `scripts/check-examples.ts`, 校验库导出的组件与 `src/examples/**/**.example.vue` 一一对应; 新增组件时需同步新增示例

## 设计规范

### 色彩体系

  普通界面使用语义变量, 品牌标记与色板样本可使用基础色板; 色板样本在明暗模式中保持固定. `--ti-palette-*` 定义固定基础色板, `--ti-color-*` 定义随明暗模式变化的语义角色; CLI 与 Editor 按这些角色映射到各自平台, 不直接复制 Web 的布局与控件尺寸. `--swatch` 与 `--swatch-foreground` 是展示组件的私有变量, 不属于共享主题接口

| 原始色板 | 色值 | 基础用途 |
| -------- | ---- | -------- |
| `--ti-palette-paper` | `#FAF9F5` | 暖纸, 浅色底面与深色主文字 |
| `--ti-palette-ivory` | `#F5F4ED` | 米白, 浅色次级表面 |
| `--ti-palette-sand` | `#E8E6DC` | 暖沙, 辅助色块与装饰层次 |
| `--ti-palette-charcoal` | `#292929` | 炭灰, 深色抬高表面 |
| `--ti-palette-ink` | `#141413` | 墨黑, 深色底面与浅色主文字 |
| `--ti-palette-primary` | `#39C5BB` | 青绿色, 主操作与主要强调 |
| `--ti-palette-secondary` | `#8A9A78` | 鼠尾草绿, 次要强调与辅助色块 |

  下表是 Web 语义色. `border-subtle` 在浅色下使用约 55% 边界色, 深色下使用约 10% 主文字色, 以带透明度的 HEX 表达; 让暗面板的轮廓可见, 不依赖重阴影. 需要辨识的控件边界使用 `border-strong`, 不以装饰细线作为唯一交互提示

| 语义角色 | 浅色 | 深色 | 用途 |
| -------- | ---- | ---- | ---- |
| `--ti-color-canvas` | `#FAF9F5` | `#141413` | 页面底面 |
| `--ti-color-surface` | `#F5F4ED` | `#242422` | 局部表面 |
| `--ti-color-raised` | `#FAF9F5` | `#292929` | 弹层等抬高表面 |
| `--ti-color-text` | `#141413` | `#FAF9F5` | 主文字 |
| `--ti-color-text-secondary` | `#6F6E68` | `#AAA79F` | 次要文字 |
| `--ti-color-border` | `#DEDCD2` | `#3F3F39` | 常规边界 |
| `--ti-color-border-subtle` | `#DEDCD28C` | `#FAF9F51A` | 装饰性分隔 |
| `--ti-color-border-strong` | `#6F6E68` | `#AAA79F` | 控件等需辨识边界 |
| `--ti-color-primary` | `#39C5BB` | `#39C5BB` | 青绿色主色 |
| `--ti-color-primary-hover` | `#60CFC7` | `#60CFC7` | 主色悬停状态 |
| `--ti-color-primary-pressed` | `#30A79F` | `#30A79F` | 主色按下状态 |
| `--ti-color-secondary` | `#8A9A78` | `#8A9A78` | 鼠尾草绿辅色 |
| `--ti-color-accent` | `#39C5BB` | `#39C5BB` | 主色强调表面 |
| `--ti-color-accent-hover` | `#60CFC7` | `#60CFC7` | 主色悬停表面 |
| `--ti-color-accent-pressed` | `#30A79F` | `#30A79F` | 主色按下表面 |
| `--ti-color-accent-text` | `#18756F` | `#39C5BB` | 主色文字 |
| `--ti-color-on-accent` | `#141413` | `#141413` | 主色强调面上的文字 |
| `--ti-color-selection` | `#E0F2EE` | `#1D3835` | 选中背景 |
| `--ti-color-on-selection` | `#141413` | `#FAF9F5` | 选中内容 |
| `--ti-color-focus` | `#18756F` | `#39C5BB` | 键盘焦点, 映射主色 |
| `--ti-color-success` | `#265B19` | `#7AB948` | 新界面成功状态 |
| `--ti-color-info` | `#74556F` | `#C2A0C2` | 新界面信息状态 |
| `--ti-color-warning` | `#5A4815` | `#D1A041` | 新界面警告状态 |
| `--ti-color-error` | `#7F2C28` | `#EE8884` | 新界面错误状态 |

  大面积使用中性色, 相邻表面以细微明暗差区分; 浅色保持纸面的柔和, 深色保持暖黑的沉静, 不做机械反色. 青绿色用于主操作与强调, 鼠尾草绿作为辅助色. 文字使用 `--ti-color-accent-text`, 色块上的文字使用 `--ti-color-on-accent`

  浅色次要文字加深为 `#6F6E68`, 深色主色文字使用 `#39C5BB`; 这两项保证文字在画布, 局部表面与浮层上均达到 `4.5:1`. 青绿色主色和鼠尾草绿辅色在两种模式中保持固定

### 文字与构图

| 用途 | token | 字体栈 |
| ---- | ----- | ------ |
| 标题 | `--ti-font-serif` | `"Noto Serif SC", serif` |
| 正文与控件 | `--ti-font-sans` | `"Noto Sans SC", "Noto Sans", sans-serif` |
| 等宽内容 | `--ti-font-mono` | `"JetBrainsMono NF", "JetBrainsMono Nerd Font", "JetBrains Mono", "Cascadia Code", "Consolas", "Noto Sans SC", monospace` |
| Emoji | `--ti-font-emoji` | `"Noto Color Emoji", "Noto Emoji", emoji` |

  等宽栈优先匹配系统已安装的 `JetBrainsMono NF`, `JetBrainsMono Nerd Font` 与 `JetBrains Mono` 字体家族名; 项目不附带字体文件, 缺失时按栈回退. 衬线用于标题与短句, 保持常规字重; 正文与控件使用无衬线, 等宽内容中的中文由 Noto Sans SC 补足

| 字级 token | 值 |
| --------- | -- |
| `--ti-font-size-caption` | `0.6875rem` |
| `--ti-font-size-label` | `0.75rem` |
| `--ti-font-size-body` | `0.875rem` |
| `--ti-font-size-heading` | `1.75rem` |
| `--ti-font-size-display` | `clamp(3rem, 5vw, 4.25rem)` |

| 行高 token | 值 |
| ---------- | -- |
| `--ti-line-height-body` | `1.7` |
| `--ti-line-height-heading` | `1.28` |
| `--ti-line-height-control` | `1.5` |

  常用间距从有限阶梯取值: `--ti-space-1` 至 `--ti-space-6` 分别为 `4px`, `8px`, `12px`, `16px`, `20px`, `24px`; `--ti-space-8`, `--ti-space-10`, `--ti-space-12`, `--ti-space-16`, `--ti-space-20`, `--ti-space-24` 分别为 `32px`, `40px`, `48px`, `64px`, `80px`, `96px`

  圆角按形态选择: `--ti-radius-control: 8px`, `--ti-radius-swatch: 12px`, `--ti-radius-display: 18px`, `--ti-radius-pill: 999px`; 不把所有区域都做成卡片. `--ti-control-height` 为 `36px`, 粗指针下增至至少 `44px`

  `--ti-motion-duration` 为 `160ms`, `--ti-motion-theme-duration` 为 `360ms`, `--ti-motion-easing` 为 `ease-out`; 减少动态效果时, 两种时长均降为 `0ms`, 取消悬停位移与平滑滚动. `--ti-shadow-floating` 浅色为 `0 20px 50px rgb(0 0 0 / 5%)`, 深色为 `0 20px 50px rgb(0 0 0 / 28%)`, 只提示轻微悬浮

  每个画面有明确重心, 用字号, 间距与疏密区分主次; 相关信息靠近, 不同章节拉开, 不让所有区块等大等重. 展示性色块可以叠放或轻微倾斜, 单字也可以参与构图; 操作区与长文保持稳定对齐, 重叠不遮住关键字形和信息

  文案简短自然, 标题有余味, 操作提示明确, 删除重复说明; Emoji 少量出现

### CLI

  CLI 沿用基础色板与语义角色, 为连续阅读保留清晰层次; 深色长文正文使用 `#F2EFE8`, Web 的深色正文使用 `#FAF9F5`, 作为明确的平台覆盖. 青绿色文字强调按明暗模式分别使用 `#18756F` 与 `#39C5BB`; 其余角色共享 Web 语义色, 混合色取整为终端可用的 HEX

| CLI 映射 | 浅色 | 深色 |
| -------- | ---- | ---- |
| 长文正文 | `#141413` | `#F2EFE8` |
| 次要文字 | `#6F6E68` | `#AAA79F` |
| 局部表面 | `#F5F4ED` | `#242422` |
| 弱边界 | `#DEDCD2` | `#3F3F39` |
| 青绿色文字 | `#18756F` | `#39C5BB` |

  输入标明当前行动, 回答承载主要阅读, 工具与过程作为辅助; 角色通过位置和短标签区分, 时间与已完成的过程降低视觉权重. 青绿色文字用于助手标记与少量主题提示, 浅色使用 `#18756F`, 深色使用 `#39C5BB`; 长回答, 命令和路径使用正文色. 等宽排列与列对齐维持信息密度, 无需为每个角色铺一整块背景

### Editor

  Editor 与 CLI 共享色系语义, 以代码区为主体, 让侧栏与工具面板形成稳定的辅助层次; 长时间阅读时减少大面积强调色与区域间的强对比

  编辑区使用底面色, 周边面板使用局部表面色, 弹窗适度抬高层级; 活动标签以文字明暗和轻边界区分, 青绿色文字强调浅色使用 `#18756F`, 深色使用 `#39C5BB`, 不以大面积色块铺满标签页或状态栏. 行号, 折叠标记与缩略图适度退后, 当前行用低差底色定位, 不干扰代码, 搜索结果与选中内容; 侧栏通过缩进和间距组织层级, 工具栏保留原有尺寸与密度

  内嵌终端沿用 CLI 的信息层级, 底面与周围面板协调, 切换区域时避免突兀的明暗变化

### 可访问性

- 普通文字在其允许使用的表面上对比度至少为 `4.5:1`; 需要辨识的界面图形与控件指示器至少为 `3:1`, 按 WCAG AA 的适用范围检查
- 状态同时提供文字或符号, 不只依赖颜色; 键盘焦点明确, 悬停不代替选中, 禁用控件不可操作
- 明暗模式覆盖相同语义角色; 新增颜色先查已有变量, 不在组件内另写色值
- `320px` 宽视口下无水平滚动; 粗指针下可操作目标宽高至少为 `44px`
- 尊重 `prefers-reduced-motion`, 动态不承载唯一的信息提示

  字标, 构图与示意字形允许保留光学微调, 不必将所有几何尺寸都抽象成 token; 这不豁免有意义文字与控件的可访问性要求

### 适用边界

  主题只调整界面氛围, 不重染现有 ANSI, 语法高亮, Diff, 诊断, 执行模式与权限提示的功能色. Web 的成功, 信息, 警告与错误变量为新增通用界面状态提供配色, 不覆盖平台已有功能色

  Diff 行底色保持轻薄, 词级变化更突出; 边界色不承担文字或唯一焦点提示. 透明模式以实际可见背景判断清晰度, 选择态与焦点优先保证定位清楚; 尊重各处原有控件, 材质与操作习惯, 阅读清晰和信息准确优先于外观统一
