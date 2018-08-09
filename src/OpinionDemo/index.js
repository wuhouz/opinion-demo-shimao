import React, {PureComponent} from 'react';
import {Button, Tabs, Tooltip} from 'antd';
import './reset.css';
import './index.css';
import Icon from './Icon';
import Employer from './Employer';
import Statistics from './Statistics';
import CurrentEmployerData from './Employer/currentData/CurrentEmployerData.json'; //
import CurrentDesData from './Employer/currentData/CurrentDesriptionData'; //
import PeerEmployerData from './Employer/peerData/PeerEmployerData.json';
import PeerDesData from './Employer/peerData/PeerDesciptionData';
import randomPeerData from './Employer/peerData/randomPeerData.json'
import randomCurrentData from './Employer/currentData/randomCurrentData.json'

CurrentEmployerData.splice(0, 0, ...randomCurrentData);
PeerEmployerData.splice(0, 0, ...randomPeerData);

const TabPane = Tabs.TabPane;
const NetworkOpinion = '"网络舆情"指网民关于社会中各种现象、问题所表达的信念、态度、意见和情绪等。"声量"用来描述与衡量信息传播的影响力大小，具体指标包含网络阅读量、点击量、转发量、评论量、点赞量、收藏数等。';

const CONST_RATIO = 16;
const CONST_RATIO_SELF = 8;
// 当前雇主坐标系下方legend
const currentDescriptionData = [
    {name: '员工', color: 'rgb(44, 173, 177)', percent: '57.1%'},
    {name: '企业', color: 'rgb(252, 196, 38)', percent: '19.0%'},
    {name: '行业', color: 'rgb(23, 66, 121)', percent: '14.3%'},
    {name: '商业', color: 'rgb(249, 79, 133)', percent: '9.5%'}];

// 同行雇主坐标系下方legend
const peerDescriptionData = [
    {name: '员工', color: 'rgb(44, 173, 177)', percent: '54.5%'},
    {name: '企业', color: 'rgb(252, 196, 38)', percent: '29.5%'},
    {name: '商业', color: 'rgb(23, 66, 121)', percent: '6.3%'},
    {name: '行业', color: 'rgb(249, 79, 133)', percent: '9.8%'}];

// 最多被提及的特征 Top5
const SORT_CURRENT_MENTIONED = [
    {
        name: '执行',
        num: 21 * CONST_RATIO_SELF,
        desc: <div>
            <p className="username">用户一：</p>
            <p>在经营一家酒店时，敏锐的头脑、正确的策略和有效的<span className="highlight">执行</span>非常重要。</p>
            <p className="username">用户二：</p>
            <p>将文化融入人才管理的全周期首先，世茂将企业文化转换为可<span className="highlight">执行</span>的员工行为标准。</p>
        </div>
    },
    {
        name: '创新',
        num: 18 * CONST_RATIO_SELF,
        desc: <div>
            <p className="username">用户一：</p>
            <p>不是很了解啊，就是刚听过宣讲会，觉得是一个注重品质，注重细节的企业，<span className="highlight">创新</span>也引领世茂走向了成功的转型。</p>
            <p className="username">用户二：</p>
            <p>这一系列大胆又<span className="highlight">创新</span>的服务方式和销售策略，在努力提升宾客满意度的同时，也大大增加了酒店的收益。</p>
        </div>
    },
    {
        name: '运营',
        num:
        14 * CONST_RATIO_SELF,
        desc: <div>
            <p className="username">用户一：</p>
            <p>你选择加入苏州世茂商业<span className="highlight">运营</span>有限公司的原因是什么？看中发展平台，但是现实差距很大。</p>
            <p className="username">用户二：</p>
            <p>世茂的发展速度快，而且在很多城市都有地标性建筑，未来还有很多的项目会发展。而且世茂已经有两家上市公司，所以整个公司的<span className="highlight">运营</span>状况是不错的。
            </p>
        </div>
    },
    {
        name: '领军',
        num: 12 * CONST_RATIO_SELF,
        desc: <div>
            <p className="username">用户一：</p>
            <p>行业<span className="highlight">领军</span>人物对话:度假酒店新增长周期下的应对策略</p>
        </div>
    },
    {
        name: '轻松',
        num: 12 * CONST_RATIO_SELF,
        desc: <div>
            <p className="username">用户一：</p>
            <p>培训比较多，工作比较<span className="highlight">轻松</span></p>
            <p className="username">用户二：</p>
            <p>工作氛围比较<span className="highlight">轻松</span>，没什么压力，同事之间很团结友好。</p>
        </div>
    }
];
// 企业独占的特征 Top5
const SORT_CURRENT_SPECIAL = [
    {
        name: '创新',
        num: 18 * CONST_RATIO_SELF,
        desc: <div>
            <p className="username">用户一：</p>
            <p>不是很了解啊，就是刚听过宣讲会，觉得是一个注重品质，注重细节的企业，<span className="highlight">创新</span>也引领世茂走向了成功的转型。</p>
            <p className="username">用户二：</p>
            <p>这一系列大胆又<span className="highlight">创新</span>的服务方式和销售策略，在努力提升宾客满意度的同时，也大大增加了酒店的收益。</p>
        </div>
    },
    {
        name: '运营',
        num:
        14 * CONST_RATIO_SELF,
        desc:
            <div>
                <p className="username">用户一：</p>
                <p>你选择加入苏州世茂商业<span className="highlight">运营</span>有限公司的原因是什么？看中发展平台，但是现实差距很大。</p>
                <p className="username">用户二：</p>
                <p>世茂的发展速度快，而且在很多城市都有地标性建筑，未来还有很多的项目会发展。而且世茂已经有两家上市公司，所以整个公司的<span className="highlight">运营</span>状况是不错的。
                </p>
            </div>
    },
    {
        name: '公益',
        num: 10 * CONST_RATIO_SELF,
        desc: <div>
            <p className="username">用户一：</p>
            <p>坚持以人为本的管理理念，将<span className="highlight">公益</span>项目落到实处，定期举行相关<span className="highlight">公益</span>关爱活动回报社会
            </p>
            <p className="username">用户二：</p>
            <p>铂涛集团业务涵盖酒店、公寓、艺术品、<span className="highlight">公益</span>平台等。</p>
        </div>
    },
    {
        name: '招聘',
        num: 4 * CONST_RATIO_SELF,
        desc: <div>
            <p className="username">用户一：</p>
            <p><span className="highlight">招聘</span>也非常混乱，内部IT的管理都是由集团公司的IT部门负责，商管公司的IT没有什么实质性的工作内容，主要工作就是商场的IT设备设施的管理，学不到太多新的东西，流程比较复杂。办公环境一般吧，在陆家嘴周围吃饭实在是个问题，上下班地铁也非常拥挤，不太推荐来这里上班。
            </p>
            <p className="username">用户二：</p>
            <p>四年时间我负责过几乎所有职能的<span className="highlight">招聘</span>，去了二十多个城市，参与了商业、酒店、乐园、保理、融资租赁等各类业务的组建。在集团，接触人员的层面更高。除了对接各职能副总裁、区域总、总监，<span
                className="highlight">招聘</span>高级别岗位，还要定期向老板汇报，对个人视野的打开和全局观的建立很有帮助。</p>
        </div>
    },
    {
        name: '入住',
        num: 2 * CONST_RATIO_SELF,
        desc: <div>
            <p className="username">用户一：</p>
            <p>从酒店经营管理的运作来看，我同意朱总的意见，单体酒店也好，或者是集团性的酒店也好，可能更多的还是要关注科技在酒店当中的应用，来确保客户、客人在酒店的<span
                className="highlight">入住</span>体验上，通过高科技的应用，能够有进一步的便利和改进。</p>
            <p className="username">用户二：</p>
            <p>近年来，世茂集团通过与喜达资本成立合资公司，签约了多个全球酒店项目;同时，还打造出6大品牌服务矩阵，给不同出行需求的客人多元化的<span className="highlight">入住</span>选择。
            </p>
        </div>
    }
];


// 同行 top5
const SORT_PEER_MENTIONED = [
    {
        name: '优化',
        num: 30 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p> 在这里工作压力大吗？压力主要来源于哪些方面？不是太大，延续性项目，每次都是一写<span className="highlight">优化</span>需求；由于和甲方的关系比较好，需求量和进度这些都可以商量，哈哈哈。
            </p>
            <p className="username">用户二：</p>
            <p>你觉得公司在行业中处于什么地位？未来发展前景如何？与同类公司相比优势在哪？消费类电子产品的制造与研发，目前整体处于夕阳行业，远落后于主流的软件及互联网相关的行业；公司未来很难突破现状，改革创新风险太高，只能保守<span
                className="highlight">优化</span>制造工艺及成本；与同类公司相比优势明显，有非常全面的加工设备及生产线，有广泛的供应商及客户，有稳定的利润收入，相对稳定很多。</p>
        </div>
    },
    {
        name: '入住',
        num: 25 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p> 部分嘉宾在铂涛大厦合影留念
                本次业主私董会，酒店高参秉承活动内容创新原则，不仅仅在私董会为业主嘉宾提供专业的酒店投资内容，还将高度前瞻的理论内容和深度体验的品牌实践结合起来——12月16日，从品牌酒店体验<span
                    className="highlight">入住</span>到带领众多酒店业主及投资人详细参观了国内酒店业最具创新意识的铂涛集团总部；同时带领所有酒店业主以铂涛秀邀请VIP嘉宾身份出席铂涛集团每年一度的酒店业唯一的大型“维密秀”——铂涛新品时尚秀。
            </p>
            <p className="username">用户二：</p>
            <p>而宜尚Plus酒店在有限空间里整合了“FIKA”咖啡大堂、多功能餐厅、多项配套设施（健身房／洗衣房／独立会议室）等功能性空间，大大提升了<span className="highlight">入住</span>体验感。
            </p>
        </div>
    },
    {
        name: '改进',
        num: 24 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>公司晋升机制还算合理吧，但是有待<span className="highlight">改进</span>的地方，毕竟企业还在发展中。</p>
            <p className="username">用户二：</p>
            <p>公司一直在发展<span className="highlight">改进</span>，也做了许多工作，不得不说，公司能发展到现在这个规模，真的非常的不容易，可能就成本这块较市场偏低，但是看个人能力，踏实肯干的，公司也会对你的努力肯定。</p>
        </div>
    },
    {
        name: '执行',
        num: 18 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>你觉得公司在行业中处于什么地位？未来发展前景如何？与同类公司相比优势在哪？中下游，前景不明，成本低，跟我导师有产学研合作项目，但是感觉研发水平一般，生产条件和水平一般，员工满意度和<span
                className="highlight">执行</span>力不行，管理比较混乱，和落后，内部有矛盾。</p>
            <p>在经营一家酒店时，敏锐的头脑、正确的策略和有效的<span className="highlight">执行</span>非常重要。</p>
            <p className="username">用户二：</p>
            <p>说说你在公司的工作经历对你产生了哪些影响？技能无增长，公司不提倡个人思考，只提倡<span className="highlight">执行</span>力和所谓的“忠诚度”。</p>
        </div>
    },
    {
        name: '轻松',
        num: 15 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>为什么愿意推荐朋友来这里工作？因为学校气氛很好 不像其他地方那么复杂，与老师学生交流起来会<span className="highlight">轻松</span>很多，职位受人尊重，等等原因。</p>
            <p className="username">用户二：</p>
            <p>为什么看好公司未来半年发展？非常好，氛围<span className="highlight">轻松</span>，简单阳光，学校的环境还是比社会上其他职业的环境简单很多，强烈推荐不管男生女生都可以来这里工作，领导也不会咄咄逼人</p>
        </div>
    }
];
const SORT_PEER_SPECIAL = [
    {
        name: '执行',
        num: 18 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>你觉得公司在行业中处于什么地位？未来发展前景如何？与同类公司相比优势在哪？中下游，前景不明，成本低，跟我导师有产学研合作项目，但是感觉研发水平一般，生产条件和水平一般，员工满意度和<span
                className="highlight">执行</span>力不行，管理比较混乱，和落后，内部有矛盾。</p>
            <p>在经营一家酒店时，敏锐的头脑、正确的策略和有效的<span className="highlight">执行</span>非常重要。</p>
            <p className="username">用户二：</p>
            <p>说说你在公司的工作经历对你产生了哪些影响？技能无增长，公司不提倡个人思考，只提倡<span className="highlight">执行</span>力和所谓的“忠诚度”。</p>
        </div>
    },
    {
        name: '轻松',
        num: 15 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>为什么愿意推荐朋友来这里工作？因为学校气氛很好 不像其他地方那么复杂，与老师学生交流起来会<span className="highlight">轻松</span>很多，职位受人尊重，等等原因。</p>
            <p className="username">用户二：</p>
            <p>为什么看好公司未来半年发展？非常好，氛围<span className="highlight">轻松</span>，简单阳光，学校的环境还是比社会上其他职业的环境简单很多，强烈推荐不管男生女生都可以来这里工作，领导也不会咄咄逼人</p>
        </div>
    },
    {
        name: '喜欢',
        num: 14 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>公司优点：我比较<span className="highlight">喜欢</span>学校文化，希望以后能有依然在学校的机会。 我会努力的。</p>
            <p className="username">用户二：</p>
            <p>为什么愿意推荐朋友来这里工作？一般 经常做无用功，关键看带自己的是什么人 有的领导话不多 但句句都能降到关键点 有点不行 跟您讲很多 没用的东西 有的则是不停地修改图纸 文本等 而且总是前面做 后面改
                还<span className="highlight">喜欢</span>提前催你完成，反正看领导。</p>
        </div>
    },
    {
        name: '签署',
        num: 13 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>7月17日，世茂与云南世博旅游控股集团有限公司<span className="highlight">签署</span>合作协议，并就推进特色小镇和城市建设，深化旅游文化、大健康产业等多领域合作进行交流。</p>
            <p className="username">用户二：</p>
            <p> 恒大+苏宁:6月22日，苏宁易购集团股份有限公司发布公告称，公司全资子公司南京苏宁商业管理有限公司与恒大地产集团有限公司<span className="highlight">签署</span>《关于深圳市恒宁商业发展有限公司股东协议书》。</p>
        </div>
    },
    {
        name: '便利',
        num: 12 * CONST_RATIO,
        desc: <div>
            <p className="username">用户一：</p>
            <p>交通<span className="highlight">便利</span>,只有死工资,体制僵化,个人发挥受限,按点上下班公司管理者水平太差了，原本一个有前景的公司快被他们搞垮了。</p>
            <p className="username">用户二：</p>
            <p>你是否愿意推荐朋友来这里工作？原因是什么？愿意 算是大平台知名企业 工作环境好 附近交通<span className="highlight">便利</span>同事之间相处也很不错 能交到新朋友</p>
        </div>
    }
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
                            <span>检测时段：2018年01月-2018年07月</span>
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
                                <div className="number-value">300,103</div>
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
                            <TabPane tab="当前雇主" key="1"><Employer data={CurrentEmployerData} desData={CurrentDesData}
                                                                  sort_mentioned={SORT_CURRENT_MENTIONED}
                                                                  sort_special={SORT_CURRENT_SPECIAL}
                                                                  descriptionData={currentDescriptionData}/></TabPane>
                            <TabPane tab="同行雇主" key="2"><Employer data={PeerEmployerData} desData={PeerDesData}
                                                                  sort_mentioned={SORT_PEER_MENTIONED}
                                                                  sort_special={SORT_PEER_SPECIAL}
                                                                  descriptionData={peerDescriptionData}/></TabPane>
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
