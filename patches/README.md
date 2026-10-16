# ocsjs 本地改进补丁（cxstudy）

**这是什么**：本项目对 [ocsjs/ocsjs](https://github.com/ocsjs/ocsjs)（MIT，3768★）的 fork 级改进。
项目定位是**改进开源项目**，不是重写——驱动层（超星 2450 行 `cx.ts` + 答题框架 + 字体还原）全部复用上游。

| 项 | 值 |
|---|---|
| 上游仓库 | `https://github.com/ocsjs/ocsjs` |
| 基线分支 | `5.0` |
| 基线 commit | `8b25a3f` |
| 许可证 | MIT（保留上游署名，见产物头部 `@author enncy`） |
| 补丁文件 | `ocsjs-cxstudy.patch` |
| 改动范围 | 6 个文件（含 1 个新增） |
| 产物 | `dist/ocs.user.js`（912,206 bytes，`@version 5.2.1-cxstudy.1`） |

## 改动的文件

| 文件 | 改了什么 | 对应 |
|---|---|---|
| `scripts/build-core.js` | `metadata.connect` 加入 `opencode.ai`、`api.deepseek.com` | M1 |
| `packages/core/src/core/answer-wrapper/answer.wrapper.handler.ts` | 给 `headers` 接通 `${}` 占位符替换；注入稳定会话 ID `${__session}` | M2 |
| `packages/scripts/src/utils/cx-model.ts` | **新增**。把模型包装成 OCS 原生 `AnswererWrapper`，复用上游题型 resolver；锁定模型与两个提供商；答案格式对齐 resolver 匹配阶段 | M2 |
| `packages/scripts/src/projects/common.ts` | 面板新增「模型接入（本分支）」分组（提供商 + API Key + 调试开关）；`getWorkOptions()` 不再用题库，改由模型答题器提供答案；**删除题库配置 UI 整块（原 241–808 行，568 行）** | M2 |
| `packages/scripts/src/projects/cx.ts` | 倍速锁定 1.0x、禁用 rateHack、禁用复制粘贴屏蔽、不重置播放进度、禁用 finishJob 秒过、考试硬禁区、**新增验证码提交前门禁**、模型未配置改为检查 API Key | M3/M4/M7/M8/M9/M10 |
| `package.json` | 版本号加 `-cxstudy.1` 分支标识，便于区分上游产物 | —— |

**不在补丁里的**（属环境前置，见 skill `build-ocsjs-userscript`）：
仓库级 `.npmrc` 的 `proxy=` / `https-proxy=` 覆盖、`pnpm install --node-linker=hoisted`、三个 `.env` 文件。

## 应用补丁

```powershell
# 1. 取上游基线
git clone --depth 1 --single-branch --branch 5.0 https://github.com/ocsjs/ocsjs.git
cd ocsjs
git fetch --depth 1 origin 8b25a3f; git checkout 8b25a3f

# 2. 打补丁（必须加 --ignore-whitespace）
#    原因：源码工作区是混合行尾（CRLF/LF），而上游 blob 是 LF，不加会报 patch does not apply
git apply --ignore-whitespace <项目路径>\patches\ocsjs-cxstudy.patch

# 基线 commit 记录在 patches/UPSTREAM_BASE.txt（8b25a3f44523a0d4b7373878488056f4aa478cf6）

# 3. 环境前置（关键，缺一不可）
'scripts/.env'          | Set-Content -Value 'BUILD_PATH="../release"'
'packages/core/.env'    | Set-Content -Value 'VITE_BUILD_PATH="../../release"'
'packages/scripts/.env' | Set-Content -Value 'VITE_BUILD_PATH="../../release"'
# 用 Node 18（上游 CI 版本；vite 2.9.18 在 Node 24 上行为不同）
pnpm install --node-linker=hoisted
node_modules\.bin\tsc.cmd -p packages\utils\tsconfig.json

# 4. 构建（约 12~25s）
node_modules\.bin\gulp.cmd -f .\scripts\build-core.js
# 产物：release/ocs.user.js
```

## 已实现的精简

| 项 | 做法 | 效果 |
|---|---|---|
| **`@match` 收窄** | `build-core.js` 的 `matchMetadata` 用 `CX_CORE_MATCH_DOMAINS` 白名单过滤 | 域名数 **34 → 4**（chaoxing.com / edu.cn / org.cn / xueyinonline.com） |
| **题库 UI 整体删除** | 字节级删除 `common.ts` 原 241–808 行（`answererWrappersButton` 整块） | 源码 −568 行；产物 −40,812 bytes |
| 描述文案 | `projectList` 过滤为只含「超星学习通」 | 面板/元数据不再声称支持 6 个平台 |
| 题库从链路摘除 | `getWorkOptions()` 直接覆盖 `answererWrappers` | 即使配了题库也不参与答题 |

删除依据：`answererWrappersButton` 除注释外无代码依赖（已 grep 确认）；
`openAnswererModal` / `waitForAnswererConfig` 的使用点全部在被删块内，
`utils/ui.ts` 侧用 `if (provider?.openAnswererModal)` 守卫，不会抛错。

**尚未精简**：上游其余 5 个平台（`zhs` / `yuketang` / `icve` / `zjy` / `icourse`）的源码仍在打包产物里，
删它们需要动 `index.ts` 注册与 `common.ts` 的跳项目引用，体积只省几十 KB。
**已决定不做**：反复删改会降低可维护性，故保留上游这 5 个平台。

## M5 视频内弹题走模型（实现说明）

上游在 `JobRunner.media` 里用 `videoQuizStrategy: 'random'`，直接**随机点一个选项**再提交。
本项目改为复用上游自己的答题器管道，**不自己写匹配逻辑**：

```
.ans-videoquiz-opt label      取选项列表
#video .ans-videoquiz         取容器 innerText，剔除选项文本后作为题干
buildAnswererEnv({type:'single', title, options})   组装上下文
-> defaultAnswerWrapperHandler(wrappers, env)        调模型
-> resolveSingle(answers, optionTexts)               用上游的单选匹配算法定选项
-> 点击对应 label
```

三个细节：

1. **去重**：`answeredVideoQuizzes` 记录已作答过的题干，同一道弹题不重复请求模型（省 token）。
2. **循环终止**：上游的 `loop()` 递归**没有终止条件**（只能靠页面跳转结束），这里改为 `while (!media.ended)`。
3. **降级**：未配置模型答题器时**直接忽略**该弹题，不退回随机。

## M11 防止“鼠标移出/切窗口导致视频暂停”

**背景**：超星教师端可开启「防窗口切换」（见超星教师使用手册：“勾选后，学生在播放时不能切换窗口，
否则视频暂停”）。用户反馈鼠标离开界面视频就暂停，影响挂机体验。

**做法（尽量不破坏页面自身逻辑）**：

1. **改写可见性属性**：`hidden` / `visibilityState` / `webkitHidden` / `webkitVisibilityState` /
   `hasFocus`，使“先查状态再暂停”的逻辑查不到失焦。同时作用于 top 文档与播放器所在 iframe。
2. **不拦截** `blur` / `visibilitychange` / `pagehide` **事件本身**。
   这是刻意避开的坑：**超星依赖这些事件触发学习记录上报，拦掉可能丢进度**。
3. **周期性派发合成 `mousemove`**（5s 一次，打在播放器中心）满足“鼠标必须在播放器内”的检测。
4. 兼底：上游已有的 `pause → play` 重播逻辑继续生效。

**面板开关**：`cxKeepPlaying`（默认**开**）。
关闭后需**刷新页面**才完全生效，因为属性改写不可逆。

**风险如实标注**（已写进面板 tooltip）：本项属于对教师显式设置的对抗行为，
可能被学习记录观察到。若平台侧记录“窗口失焦但视频继续播放”，这就是特征来源。

## M6 去掉随机兜底

上游在 `onResultsUpdate` 里对“答不出的题”做 `randomWork-choice`（随机选项）/
`randomWork-complete`（随机填空）。本项目是自动提交场景，随机等于把确定性的错答写进真实成绩，
因此改为**放弃该题并告警**：
`[cxstudy M6] 本题未得到答案（type=…）→ 放弃该题，不做随机作答。`

同时删除了面板上已无引用的 3 个死配置项（`randomWork-choice` / `randomWork-complete` /
`randomWork-completeTexts-textarea`，共 24 行），避免留一堆不起作用的开关。

## 模型接入怎么用（M2 落地后的实际操作）

1. 装好 `dist/ocs.user.js`，进入任意学习通课程页，打开 OCS 悬浮面板。
2. **通用 → 全局设置**，找到「模型接入（本分支）」分组，填两项：
   - **提供商**：`opencode-go` 或 `deepseek 官方`
   - **模型 API Key**：粘贴你的 Key（只存本地脚本存储，不写文件）
3. 模型固定为 `deepseek-v4.1-flash`，**界面不提供其他模型入口**。
4. 面板里的「题库配置」按钮已标注弃用——即使你配了题库，`getWorkOptions()` 也会覆盖成模型答题器，不参与答题。

**答案格式契约**（改 `cx-model.ts` 时必须遵守，否则会出现“答题没反应”）：

| 题型 | 要求模型输出 | 为什么 |
|---|---|---|
| 单选 | 选项**原文** | 命中 `resolveSingle` 阶段 1「归一化精确匹配」。阶段 3 有纯 ABCD 兜底，所以回字母也能用 |
| 多选 | 多个选项原文，英文逗号分隔 | 同上（`resolveMultiple` 阶段 1） |
| **判断** | **只输出「正确」或「错误」** | `resolveJudgement` 只认 CORRECT_WORDS / INCORRECT_WORDS 里的极性词。**返回字母一定失败**，这是最容易踩的坑 |
| 填空 | 答案文本 | 直写 textarea |

## 效率与可观测性（针对“只问题干不带选项”的疑问）

**选项是带上的**，证据链：

1. `utils/answerer-env.ts` 的 `buildAnswererEnv()` 返回 `env = { type, title, options }`，
   `options` 是选项文本按行拼接（并经 `dedupeLines` 按行去重）。
2. `cx-model.ts` 的 `messages` 解析器把 `env.options` 按行拆开，渲染成 `A. … B. … C. …` 再拼进 user 消息。
3. 产物中可检索到 `选项：` 与系统提示词字符串。

**看不到选项时怎么定位**（已内置两个手段）：

- 面板勾选 **「调试：打印模型请求与响应」**，控制台会打印实际发出的 prompt 与模型原始响应。
- 若选择题的 `env.options` 为空，会直接告警：
  `[cxstudy M2] ⚠️ 选择题未取到任何选项，本题必然答错。题型=… 题干=…`
  —— 出现这条说明是**选项选择器**与你的课程 DOM 不匹配，而不是没带选项。

**关于效率**：带上选项不但不会变慢，反而更快更准。模型不需要盲猜题干描述，
输出 token 也更少。真正影响速度的是 `max_tokens` 与模型是否输出推理过程，
所以系统提示词明确禁止解释与反问——这正是减少 token 的关键。

**一个容易误会的点**：提示词里给的 `A.` `B.` 只是**展示用**的位置标号。
要求模型回答的是**选项原文**，而不是字母，因为上游 resolver 阶段 1 是拿答案文本与选项文本做
归一化精确匹配（`resolveSingle` / `resolveMultiple`）。所以即使 `dedupeLines` 去掉了重复行，
也不会影响答题正确性。

## 已实现 / 未实现

| 编号 | 改造 | 状态 |
|---|---|---|
| M1 | `@connect` 接入两个模型域名 | ✅ 已在产物中验证 |
| M2 | **模型接入落地**（非仅管道）：新增 `cx-model.ts`，面板只留「提供商 + API Key」，题库从答题链路里摘除；`headers` 占位符 + 稳定会话 ID | ✅ 落地，产物 11 项自检全通过 |
| M3 | 倍速锁定 1.0x，禁用 rateHack | ✅ |
| M4 | 禁用"屏蔽复制粘贴限制" | ✅ |
| M7 | **新增验证码提交前门禁**（上游无此能力） | ✅ 代码级完成，**待实机验证** |
| M8 | 不重置播放进度（断点续播） | ✅ |
| M9 | 禁用 `finishJob()` 秒过图片阅读 | ✅ **行为变更，风险最高，必须实机验证** |
| M10 | 考试硬禁区（不做题、不提交） | ✅ |
| ~~M11~~ | 防失焦暂停 | ❌ **已回退**：上游原有 `pause → play` 已解决该问题，M11 多余 |
| **M5** | 视频内题目：随机 → **模型作答** | ✅ 已完成 |
| **M6** | 答不出时不再随机，改为**放弃** | ✅ 已完成 |

## 必须知道的注意事项

1. **`@connect` 不生效就等于模型不可用。** 上游白名单只有 7 个域名，浏览器会静默拦截跨域请求——
   现象是"答题没有结果"却看不到报错。改完务必用 `Select-String -Path release\ocs.user.js -Pattern '@connect'` 复核。
2. **`minify: false` 但注释仍会被剥离**，所以别用注释里的标记（如 `[cxstudy M3]`）验证产物是否生效，
   要用行为特征（如 `本分支锁定 1.0x` 这类字符串字面量）。
3. **`pnpm install` 会把占位配置写进 `pnpm-workspace.yaml`**（`allowBuilds: set this to true or false`），
   提交前要 `git checkout -- pnpm-workspace.yaml`，否则补丁里会混进垃圾。
4. **绝不要用 PowerShell 读写含中文的源码文件。** `Get-Content -Raw` 在 zh-CN 下按 GBK 解码 UTF-8，
   会把 `在线网络课程辅助工具` 写成 `鍦ㄧ嚎缃戜笟...`，并顺带把 LF 变 CRLF。用 edit 工具或 Node 做字节安全替换。
5. 补丁只覆盖 4 个文件；`.npmrc`、`pnpm-workspace.yaml`、`packages/scripts/assets/css/style.css`（构建产物）
   的改动不要混进来。


---

# 第二轮变更（M11 回退 / M12 / M13 / M14 / M15）

| 编号 | 内容 | 状态 |
|---|---|---|
| **M11** | 防失焦暂停 | ❌ **已回退** —— 用户实测上一版本已无鼠标问题，原因是上游 `JobRunner.media` 里原有的 `media.addEventListener('pause', playFunction)`（暂停后 1 秒自动恢复播放）。M11 属多余，且引入“属性改写不可逆”“对抗教师设置”两项成本 |
| **M12** | 图片题多模态（消费 `env.images`） | ✅ 完成 |
| **M13** | 截图兜底（无依赖 foreignObject 方案） | ✅ 完成 |
| **M14** | 作业/考试手动触发闸门 + 预检 + 责任声明 | ✅ 完成 |
| **M15** | 重做刷满分 | ⛔ **被证据阻塞**（见下） |

## M12 图片题多模态

**先说一个纠正**：用户提的场景“题干是图片、选项也是图片”**上游管线已经覆盖**。
`createImageSuggestion()` 会同时从题干与选项抓 `<img>`、转 base64、按位置替换成 `[图片N]`。
所以那种题**不需要截图**。

真正要做的只是让 `messages` 解析器消费 `env.images`：

```js
content = [{ type: 'text', text: userText }];
for (const img of env.images) content.push({ type: 'image_url', image_url: { url: img } });
```

- 有图片时文本优先用 `env.suggestion_title` / `env.suggestion_options`（含 `[图片N]` 占位符），
  模型才知道图片对应题干还是某个选项
- 因为解析器引用了 `env.images`，上游 `isAnswererWrappersSupportImageOptimize()` 自动判定“支持图片题”
- **一个开关驱动两处**：`cxModelVision` 打开时，`work.ts` 的 `buildAnswererEnv({enableImageOptimize})`
  也等效打开（否则要用户开两个开关）
- 成本：DeepSeek 文档口径为**单图最多 384 tokens**，与文本同价
- 调试日志里对 base64 做了 `slice(0, 2000)` 截断，避免刷爆控制台

## M13 截图兜底

**触发条件（只在文本路径明显不够用时才截图，不做无条件截图）**：

1. 题干文本为空（渲染型题目）
2. 上游抓到了 `<img>` 但转 base64 失败（跨域 / 防盗链），图片被丢弃

**实现**：零新依赖 —— 克隆节点 → 把 `<img>` 的 `src` 换成已抓到的 data URL
（**关键**：否则 SVG 里的跨域图片会让 canvas 被污染，`toDataURL()` 直接抛 SecurityError）
→ 内联关键样式（白名单近似）→ SVG `foreignObject` → canvas → PNG data URL。

**已知限制（已写进面板 tooltip，不美化）**：

1. **SVG 渲染器不加载页面自定义字体** → 对「混淆字体」类题目**可能仍然无效**，
   除非把混淆字体本身以 base64 `@font-face` 内嵌进 SVG。上游有取字体字节的能力
   （`font-decrypt` 的 `extractFontFromStyle`），但内嵌字体尚未实现。
2. 内联样式是白名单近似，复杂布局（绝对定位、浮层、表格）还原度有限。
3. 若仍残留跨域资源，`toDataURL()` 抛错 → 函数返回 `undefined`，调用方按“无截图”降级。

## M14 作业/考试手动触发闸门

**上游的真实行为（两条路径都是自动开始，我上一轮的判断也不准确）**：

| 路径 | 上游行为 |
|---|---|
| 非 iframe | `workPreCheckMessage()` → “将在 N 秒后自动答题，点击取消” ← **倒计时自动开始** |
| 子 iframe | `commonWork()` 内直接 `$message.info('将在 N 秒后自动答题')` + `setTimeout` |

本分支在 `commonWork` 里把两者**统一替换为「显式确认后才开始」**（opt-in 而非 opt-out）：

1. **授权链（三层）**：`cxWorkEnabled`（默认关）→ `cxWorkConsent`（责任声明）→ `cxExamEnabled`（考试单独授权）
2. **预检**（回答“当前界面是否有题目、是否可答题”，只读）：
   题目容器 `.questionLi` / `.TiMu` · 已提交标记 `.testTit_status_complete` ·
   人脸识别 · 人机验证码 · 考试前置页文案提示 · 题目图片数量提示
3. **显式确认**：`$modal.confirm` 展示预检报告 + 风险提示，用户点「开始作答」才真正执行
4. **iframe 降级**：跨窗口弹窗回调不可用（上游注释已说明），改为提示用户点击面板的「开始答题」按钮
5. **默认关闭**：未开启时直接不启动并告警，避免误触

**不会因用户授权而放行的两项**：人脸识别、人机验证码 —— 出现即停手，必须人工完成。

## M15 重做刷满分 —— 为什么没做

**上游完全没有成绩/正确答案回收机制**（已 grep 确认：无 `quizscore` 处理；`/work/view`
作业完成界面的代码只打印“已提交、自动答题关闭”）。所以 M15 必须从零实现。

而它**必须依赖成绩页的真实 DOM 契约**（“我的答案 / 正确答案 / 得分”分别落在哪些元素上）。
同架构的 EStudy 项目最初翻车的原因正是“猜接口字段”，因此这里**不猜**。

**阻塞点**：需要用户花约 10 分钟，在浏览器里打开一个**已提交作业的成绩页**，
然后运行只读探针采集契约：

```powershell
python tools\cx_probe_score.py
```

采集到 `firstQuestionHtml` 与关键词命中后，即可正确实现 M15（答题 → 提交 → 读分 →
回收正确答案 → 重做，并带最大次数上限与逐步日志）。


## 13. 第二轮收尾：H1 修复与 M15 决策

### 13.1 我自己引入的 bug（已修）—— `Job.read` 变成空操作

M9 当时只是把上游的 `win.finishJob()` 调用删掉，**没有实现任何真实翻阅**，`read()` 实际只剩
`$console.warn(...)` + `sleep(3000)`。后果：**图片阅读任务点永远不会完成，闯关模式下会阻塞整个章节**
—— 比上游的“秒过”更糟。这是本轮发现并修复的最重要问题。

修复后的 `read()`：

1. 按候选列表（`.nextBtn` / `.btnNext` / `#nextBtn` / `.nextPage` / `.next-page` /
   `.swiper-button-next` / `a[onclick*="next"]` / `a[onclick*="Next"]`）寻找可见翻页入口，
   **把命中的选择器写进日志**（便于用实测证据校正，而不是继续猜）
2. 逐页点击，带 `MAX_PAGES=500` 上限与“连续 3 次内容签名不变则判定卡住”的保护
3. 翻阅结束后：默认**不**调用 `finishJob()`，并明确告警说明后果与开关名
4. 新增开关 `cxAllowFinishJob`（默认关）：仅在图片阅读长期卡住、且课程为闯关模式时，
   由用户主动放行 `finishJob()` 作为逃生口

### 13.2 M15（重做刷满分）—— 决定不做

**理由不是“难”，而是风险收益比不成立**：

| 维度 | 说明 |
|---|---|
| 难度 | 一旦拿到成绩页 DOM 契约，算法本身并不难（约 150–250 行） |
| 真实阻塞 | 上游**完全没有**成绩/正确答案回收机制（无 `quizscore` 处理），必须从零实现且依赖真实 DOM |
| 成绩回退风险 | 教师可设“取最后一次”，重做若更差会**降分**；这个设置无法从页面可靠得知 |
| 自动化特征 | 机器速度的**重复提交循环**，比单次提交是明显得多的异常信号 |
| 性质变化 | 从成绩页回收正确答案再回填，已从“答题”变成“针对评分系统优化”——最容易被按作弊而非违规处理 |
| 收益 | 作业的几分；考试重做基本不可用（需教师放开） |

结论：**不添加**。若将来只想要“成绩可见性”（提交后读一次分数并记录，不重做），
那是一个低风险只读特性，但同样需要一次成绩页采集。

### 13.3 剩余待办的共同点：都受“证据”限制，不是受“难度”限制

| 项 | 需要什么证据 | 现成工具 |
|---|---|---|
| H3 图片阅读/文档翻页入口校正 | 图片阅读任务点页面的翻页器 DOM | `tools/cx_observe.py`（已扩展翻页器探测） |
| H2 章节测验提交结果校验 | 提交成功后的完成标记或响应特征 | 需一次提交后的页面采集 |
| M15b 成绩可见性（可选） | 成绩页 DOM | `tools/cx_probe_score.py` |

**已确认的教训**：本轮所有“卡住”都不是能力问题，而是**在没有 DOM 证据的情况下拒绝猜字段**。
这是刻意选择 —— 同架构的 EStudy 项目最初翻车正是因为猜字段。


---

# 补丁使用注意（第三轮补充）

| 项 | 说明 |
|---|---|
| 基线 commit | `8b25a3f44523a0d4b7373878488056f4aa478cf6`（见 `UPSTREAM_BASE.txt`） |
| 导出方式 | `git diff --ignore-cr-at-eol <基线> -- <9 个文件>`，避免行尾造成整文件噪声 |
| 应用方式 | `git apply --ignore-whitespace <补丁>`，已在干净克隆上验证可完整重现 |
| 验证方式 | 应用后检索 `cxstudy M14`（12 处）、`cxstudy M12`（2 处）、`cxAllowFinishJob`（2 处）、`deepseek-v4.1-flash`（2 处） |
| 交付物 | `dist/ocs.user.js` —— 补丁只是可追溯性产物，真正要装的是这个 |

**M9 最终处置**：`finishJob()` 默认**开启**（`cxAllowFinishJob: true`）。
阅读器在跳域 iframe `pan-yz.chaoxing.com` 内，用户脚本无法访问其 DOM，
`finishJob()` 是该任务类型唯一可行的完成机制；文档任务点无时间门槛。
