import React, {PureComponent} from 'react';
import {Button, Tabs, Tooltip} from 'antd';
import './reset.css';
import './index.css';
import Icon from './Icon';
import Employer from './Employer';
import Statistics from './Statistics';
import CurrentEmployerData from './Employer/CurrentEmployerData.json';
import CurrentDesData from './Employer/CurrentDesriptionData';
import PeerEmployerData from './Employer/PeerEmployerData.json';
import PeerDesData from './Employer/PeerDesciptionData';
import randomData1 from './Employer/randomData1.json'
import randomData2 from './Employer/randomData2.json'

CurrentEmployerData.splice(0,0,...randomData2);
PeerEmployerData.splice(0,0,...randomData1);

const TabPane = Tabs.TabPane;
const NetworkOpinion = '"网络舆情"指网民关于社会中各种现象、问题所表达的信念、态度、意见和情绪等。"声量"用来描述与衡量信息传播的影响力大小，具体指标包含网络阅读量、点击量、转发量、评论量、点赞量、收藏数等。';

const CONST_RATIO = 16;
const CONST_RATIO_TENCENT = 8;
// 当前雇主坐标系下方legend
const currentDescriptionData = [ { name: '人', color: 'rgb(44, 173, 177)', percent: '88.2%' },
    { name: '企业', color: 'rgb(252, 196, 38)', percent: '5.3%' },
    { name: '员工', color: 'rgb(23, 66, 121)', percent: '2.6%' },
    { name: '行业', color: 'rgb(249, 79, 133)', percent: '2.6%' },
    { name: '工作', color: '#3cb371', percent: '1.3%' } ];

// 同行雇主坐标系下方legend
const peerDescriptionData = [ { name: '人', color: 'rgb(44, 173, 177)', percent: '62.4%' },
    { name: '企业', color: 'rgb(252, 196, 38)', percent: '0.5%' },
    { name: '员工', color: 'rgb(23, 66, 121)', percent: '0.4%' },
    { name: '行业', color: 'rgb(249, 79, 133)', percent: '0.2%' },
    { name: '工作', color: '#3cb371', percent: '1.1%' } ];

// 腾讯 top5
const SORT_TENCENT_MENTIONED = [
    {
        name: '羡慕',
        num: 108*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>能了解下时薪吗？如果朝九晚九也不用特别<span className="highlight">羡慕</span>不是？</p>
            <p className="username">用户二：</p>
            <p>我觉得你们<span className="highlight">羡慕</span>工资的，真的不先看看程序员加班猝死的吗？</p>
        </div>
    },
    {
        name: '在乎',
        num: 97*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>因为提问者本人的立场和需求愿景也是特别虚幻的，从文字的态度上就可以看出来，提问者现在估计也就刚毕业不久，刚转正或确定薪酬，就在急不可耐的幻想今后美好幸福生活了，但是这种巨大的虚荣心也会需要掌声需要肯定，接着就是找个理由发到知乎上来，你要说他多<span
                className="highlight">在乎</span>理财么，呵呵。</p>
            <p className="username">用户二：</p>
            <p>我觉得程序员都是对计算机有着真正热爱才能做的好吧，我也觉得不会<span className="highlight">在乎</span>这些。</p>
        </div>
    },
    {
        name: '留下',
        num: 96*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>还是蛮开心的，暑期实习更要好好干，争取<span className="highlight">留下</span>来。</p>
        </div>
    },
    {
        name: '怀疑',
        num: 90*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>没人关心是不是即时通讯部门，我们只关心是不是腾讯。不过就算是整个腾讯的年会，就我而言也不会<span className="highlight">怀疑</span>下面员工有问题，公司整体风向和领导层面的失职才是重点。当员工的，拿钱办事儿别有太多的归属感也别太认同什么企业文化。
            </p>
            <p className="username">用户二：</p>
            <p>不<span className="highlight">怀疑</span>……因为原来加过……八点上到晚上一点……中间无休息 上了一周！</p>
        </div>
    },
    {
        name: '傻',
        num: 89*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>可以理解你作为员工的心情，然而形象这种事永远是一颗老鼠屎坏了一锅汤。否则某高层出问题就说某高层<span className="highlight">傻</span>逼，某部门出问题就说某部门<span className="highlight">傻</span>逼，出任何事情都不是全体，都不能代表公司，那么这其实并没有意义。对外人来说管中窥豹是有现实意义的。</p>
            <p className="username">用户二：</p>
            <p>虽然可能不友善，但是我想说：是哪个<span className="highlight">傻</span>逼策划想出来的？我觉得开除了比较好。</p>
            <p className="username">用户三：</p>
            <p>谁告诉你高薪能养廉的？当和珅是<span className="highlight">傻</span>子啊！</p>
            <p className="username">用户四：</p>
            <p>这是拿有钱人当<span className="highlight">傻</span>子？你卖出去的时候有介绍过？</p>
        </div>
    }
];
const SORT_TENCENT_SPECIAL = [
    {
        name: '上瘾',
        num: 53*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>他们需要的就是QQ里面稳定的传文件、消息多端同步等功能，并且有了邮件收发提醒，只要比微信用起来顺手很多用户应该会“<span className="highlight">上瘾</span>”。</p>
            <p className="username">用户二：</p>
            <p>在知乎上引发了篇幅长达数万汉字的百人辩论大战，中世纪十字军历史知识文化绝对饱满充实，各位走过路过千万不可错过，敬请大家来一饱眼福一睹为快，保证看到你<span className="highlight">上瘾</span>为止，诸位朋友们要是错过阅览机会的话恐怕日后必将后悔莫及。</p>
        </div>
    },
    {
        name: '致敬',
        num: 32*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>向"狗日的“腾讯<span className="highlight">上瘾</span>,让员工体面的生活也是提升公司形象的有力手段。为什么在企业里有人愿意做老大，因为大部分企业里面老大的工资是最高的，其他人依次递减。马化腾这样给高管发工资 如果不是因为腾讯是上市公司，我们可能无法知道马化腾给高管发工资有多么慷慨。</p>
        </div>
    },
    {
        name: '不忠',
        num: 32*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>腾讯帝国工资最高的人竟然不是马化腾，腾讯年报显示腾讯高级副总裁、微信事业群总裁张小龙的年薪2.74亿港元，注意！不是我们想象中的百万年薪，不是千万年薪，也不是亿万年薪，是将近3亿的年薪！纵观中国企业有哪家企业的老板会如此慷慨大方！</p>
            <p className="username">用户二：</p>
            <p>马化腾和他的团队给有突出贡献的员工发薪酬从不吝啬，腾讯的员工获得感可以说是最强的，作为腾讯的员工只需把工作做好，待遇福利根本不用去争取，就会像自来水一样流淌过来，这也是腾讯员工忠诚度高，流失率低的原因。</p>
            <p className="username">用户三：</p>
            <p>如今中国的互联网江湖俨然进入“二马时代”，马化腾的腾讯帝国和马云的阿里帝国已经成为了中国互联网界的巨无霸，现今中国很多互联网公司背后都有腾讯和阿里的身影。作为中国互联网界巨无霸之一的腾讯帝国市值已达到5229亿美元，腾讯能取得如此辉煌的成就，腾讯帝国掌门人马化腾的大格局功不可没，可以说正是马化腾的大格局造就了如今的腾讯帝国！</p>
            <p className="username">用户四：</p>
            <p>马化腾和他的团队给有突出贡献的员工发薪酬从不吝啬，腾讯的员工获得感可以说是最强的，作为腾讯的员工只需把工作做好，待遇福利根本不用去争取，就会像自来水一样流淌过来，这也是腾讯员工忠诚度高，流失率低的原因。</p>
        </div>
    },
    {
        name: '失联',
        num: 32*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>合作的一个大前辈，也就40出头，自己一个人半年能移植一款游戏，最后打了个电话过来“腿突然又麻又疼，忙完手头的事我得去医院看看”，然后就<span className="highlight">失联</span>了，两个礼拜后在他的工作室发现了前辈的尸体，据说是急性肾衰……如果你想进大公司，他们需要听话的齿轮，他们要你做什么你就得做什么他们主要看你的进取心，协调性，性格，人品等等。</p>
        </div>
    },
    {
        name: '极高',
        num: 32*CONST_RATIO_TENCENT,
        desc: <div>
            <p className="username">用户一：</p>
            <p>有句俗话说得好,上行下效。马化腾和他的团队给有突出贡献的员工发薪酬从不吝啬，在腾讯工作的员工存在感可以说是最强的，这也是为什么腾讯的员工忠诚度<span className="highlight">极高</span>，流失度率极低的原因。</p>
            <p className="username">用户二：</p>
            <p>我们除了有一套科学的研发管理体系保障之外，加班加点自然也是避免不了的，因此说到压力肯定是有的，但更多时候，更是我们不断努力前进的动力吧。可以看出腾讯的游戏一直被如图所示的循环打磨着，而且打磨地频率<span className="highlight">极高</span>，一开始这些游戏的品质确实不精，但经过了开发人员加班加点地一次次打磨之后，这些游戏的品质已经拉开竞争对手好几条街了。</p>
        </div>
    },

];

// 同行 top5
const SORT_PEER_MENTIONED = [
    {
        name: '在乎',
        num: 41*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>没错谷歌这些都有，但是好像都不是做的最好的，最好的那个可能还是就是搜索引擎。只要有更好的选择，何必<span className="highlight">在乎</span>是不是谷歌？</p>
            <p>——关于百度</p>
            <p className="username">用户二：</p>
            <p>稍微大一点的公司  都会有搅屎棍子一样的hr存在！她们每天要做的就是向老板证明自己存在！！且在努力工作！！但是完全不<span className="highlight">在乎</span>她们干的事对公司是否有利。</p>
            <p>——关于百度</p>
            <p className="username">用户三：</p>
            <p>这些人进了bat就拽得得意忘形了，你们可知道你们的职位在中国能找到千千万的同类人才，求职阿里的人才多了去，不<span className="highlight">在乎</span>少几个混混等闲之辈。他们写的脚本也不是很好，不是说只抢一个，结果一直抢，说明代码能力有待提高。纳闷为什么其他小有名气的公司会收这些被丢弃的损人呢？很缺人吗？炒作博出名？真不是合格的hr。</p>
            <p>——关于阿里集团</p>
        </div>
    },
    {
        name: '羡慕',
        num: 39*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>另外那些抱怨或者回答的公务员们省省吧，有些事情有些道理不亲身体会有些人是很难明白的，让那些<span className="highlight">羡慕</span>的人进公务员系统就是对他们最好的回答与回击！</p>
            <p>——关于百度</p>
        </div>
    },
    {
        name: '留下',
        num: 36*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>有哪些公司给你<span className="highlight">留下</span>「还好没去这家公司」的印象？</p>
            <p>——关于百度</p>
        </div>
    },
    {
        name: '傻',
        num: 36*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>遇到个<span className="highlight">傻</span>逼领导是种什么样的体验？</p>
            <p>——关于美团点评</p>
            <p className="username">用户二：</p>
            <p>美团现在还是不肯道歉，公关就是请水军，当我们都是<span className="highlight">傻</span>的看不出来？</p>
            <p>——关于美团点评</p>
            <p className="username">用户三：</p>
            <p>我去，你是不是<span className="highlight">傻</span>啊，连做苏宁审计的同志们都知道，苏宁大道上是不能出现JD的，你的觉悟真的只能开除了。</p>
            <p>——关于苏宁</p>
        </div>
    },
    {
        name: '怀疑',
        num: 34*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p><span className="highlight">怀疑</span>今日头条窃听，请教？</p>
            <p>——关于今日头条</p>
            <p className="username">用户二：</p>
            <p>收到面试邀请，<span className="highlight">怀疑</span>是骗子公司?请帮忙鉴定。</p>
            <p>——关于美团点评</p>
            <p className="username">用户三：</p>
            <p>老实说，知乎er在这个事件上责备百度的矛头都很一致指向百度的广告业务逻辑！在这个问题以外的范围内，真的没有见到过对于就职百度的程序员的责难。所以，我非常反感这个问法，甚至十分<span className="highlight">怀疑</span>提出这个问题背后的动机！</p>
            <p>——关于百度</p>
        </div>
    }
];
const SORT_PEER_SPECIAL =  [
    {
        name: '上瘾',
        num: 11*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>为什么很多人看今日头条会看<span className="highlight">上瘾</span>？</p>
            <p>——关于今日头条</p>
            <p className="username">用户二：</p>
            <p><span className="highlight">上瘾</span>?比知乎还差很多</p>
            <p>——关于今日头条</p>
        </div>
    },
    {
        name: '辞去',
        num: 6*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>2015年左右，明显感到贴吧广告泛滥，有些吧传出"被商业化"的传言，贴吧的热度明显下降。我那时有段时间，因其他事难以抽身，一度每月登录几次，直到当年10月底，这个地方吧被突然"商业化运营"接管，我被<span className="highlight">辞去</span>吧主。一时间，不少吧友愤愤不平，通过各种通讯工具 at 我，提醒我。犹豫再三，我也向贴吧管理部门申诉过，结果可想而知。</p>
            <p>——关于百度贴吧</p>
            <p className="username">用户二：</p>
            <p>2014年-2015年在一家IT外包公司工作过，我在工作一年之后就<span className="highlight">辞去</span>外包公司的工作，直接面试进入了一家合适的公司工作。最后附带一个小建议，如果在外包公司岗位上工作的很优秀，可以尝试和甲方公司HR谈谈，看看是否可以直接转到甲方工作工作！</p>
            <p>——关于入职百度</p>
            <p className="username">用户三：</p>
            <p>2012年， 张一鸣<span className="highlight">辞去</span>九九房CEO的职务，开始第五次创业。张一鸣现在才33岁，今日头条还在高速成长期。未来的张一鸣可能是：500亿、1000亿美元公司创立者，现在马化腾、马云一样的角色。</p>
            <p>——关于今日头条</p>
        </div>
    },
    {
        name: '失联',
        num: 6*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>出租车<span className="highlight">失联</span>后最起码可以在出租车公司通过GPS查到具体位置，而缺乏规范的顺风车一旦出现假冒现象后果很明显(滴滴明显没尽到审查义务)，从这点来看出租车比顺风车明显要安全。</p>
            <p>——关于滴滴</p>
            <p className="username">用户二：</p>
            <p>但是经过阿里消失这件大事后，还会有多少人愿意使用这种支付手段，我们就不得而知了。腾讯没了，国人比较习惯用IM。腾讯没了，微信和QQ也就没了。这个影响应该很大。因为每个人都基本上和别人出现了一定程度上的<span className="highlight">失联</span>。这件事情甚至会引起集体的恐慌。</p>
        </div>
    },
    {
        name: '不忠',
        num: 5*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>能学到东西说明公司有点内容，留不住员工是公司的问题，而不是员工学到东西就走，加个应届生在上面。如果你观念不转变，觉得是现在学生一点<span className="highlight">不忠</span>诚，而不是自己公司管理、福利、待遇等因素问题，你只会一直抱怨下去。</p>
            <p>——关于阿里集团</p>
            <p className="username">用户二：</p>
            <p>当然HR和员工其实算不上斗争，只是HR单方面想把她认为的<span className="highlight">不忠</span>于公司的弄走而已。包括我的上级也被逼走了。（此条真的罪大恶极）然后HR的权利越来越大，越伸越长，HR自己人品以及待人待物我也不想说了。</p>
            <p>——关于阿里集团</p>
            <p className="username">用户三：</p>
            <p>其实企业在需要你的时候，说你是人才，要把公司当家，当企业不需要你的时候，把你踢走，说你跟不上步伐，那么，反过来，我脚步快了，企业落后了，我开除企业也是应该，但是为什么还装逼得问我为什么离职，说我对企业<span className="highlight">不忠</span>诚，你们又何曾对员工忠诚。</p>
            <p>——关于阿里集团</p>
        </div>
    },
    {
        name: '极高',
        num: 5*CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>也有的人会投十来个亿，为未来上百个亿的梦想投资，风险<span className="highlight">极高</span>。京东亏损也是看题主问题才知道的，至于京东情况我真的不了解，上面纯粹瞎掰。</p>
            <p>——关于京东</p>
            <p className="username">用户二：</p>
            <p>百度云有破解版的，速度<span className="highlight">极高</span>。</p>
            <p>——关于百度</p>
        </div>
    },

];

export default class extends PureComponent {
    render() {
        return (
            <div className="opinion-demo">
                <div className="demo-top">
                    <div className="content-top">
                        <div className="title-img"></div>
                    </div>
                    <div className="top-wrapper">
                        <div className="content-slogan">
                            <span>检测时段：2017年10月-2018年04月</span>
                            <span className="vertical-line">检测范围：同行业竞争公司全网舆情数据</span>
                        </div>
                        <div className="statistics">
                            <div className="total-number">
                                <div className="number-descr">
                                    网络舆情声量总数
                                    <Tooltip placement="top" overlayClassName="network-opinion" title={NetworkOpinion}>
                                        <Icon type="info_round"/>
                                    </Tooltip>
                                </div>
                                <div className="number-value">800,146</div>
                            </div>
                            <Statistics/>
                        </div>
                    </div>
                </div>
                <div className="demo-content-wrapper">
                    <div className="analyze-header">
                        <strong className="analyze-title">雇主竞争机会分析</strong>
                        <p className="analyze-slogan">根据全网声量进行话题分类，采用四大象限展示当前时段的市场口碑风向，提醒雇主时刻把握竞争机遇</p>
                        <Tabs animated={false}>
                            <TabPane tab="当前雇主" key="1"><Employer data={CurrentEmployerData} desData={CurrentDesData} sort_mentioned={SORT_TENCENT_MENTIONED} sort_special={SORT_TENCENT_SPECIAL} descriptionData={currentDescriptionData}/></TabPane>
                            <TabPane tab="同行雇主" key="2"><Employer data={PeerEmployerData} desData={PeerDesData}  sort_mentioned={SORT_PEER_MENTIONED} sort_special={SORT_PEER_SPECIAL} descriptionData={peerDescriptionData}/></TabPane>
                        </Tabs>
                    </div>
                </div>
                <div className="demo-footer">
                    {/*<Button className="apply-use-btn">申请试用</Button>*/}
                </div>
            </div>
        );
    }
}
