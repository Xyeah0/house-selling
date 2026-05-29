-- 栖居 · 20 条示例房源（在 Supabase SQL Editor 中执行）
-- price 单位：元；property_type: apartment | villa | townhouse | penthouse
-- status: available | pending | sold

INSERT INTO properties (
  title,
  description,
  price,
  address,
  city,
  bedrooms,
  bathrooms,
  area_sqm,
  property_type,
  image_url,
  image_urls,
  featured,
  status
) VALUES
(
  '云栖别院 · 半山独栋',
  '坐落于城市天际线与自然山脊之间，270° 全景落地窗将晨雾与灯火一并纳入室内。私人恒温泳池、酒窖与智能家居系统，为少数藏家而设。',
  12800000,
  '云栖路 88 号',
  '杭州',
  5, 4, 680,
  'villa',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
  ],
  true,
  'available'
),
(
  '外滩序章 · 江景大平层',
  '百年外滩文脉之上，一线江景与 Art Deco 线条相遇。双主卧套间、独立家政动线，电梯直达入户。',
  8600000,
  '中山东一路 18 号',
  '上海',
  4, 3, 320,
  'penthouse',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'
  ],
  true,
  'available'
),
(
  '梧桐深处 · 法式联排',
  '法租界梧桐树影下的红砖立面，保留原始拱券与铸铁栏杆。挑高客厅与旋转楼梯，城市中心难得的低密度居所。',
  5200000,
  '复兴中路 1260 弄',
  '上海',
  4, 3, 280,
  'townhouse',
  'https://images.unsplash.com/photo-1605276374101-e4f076223fb3?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1605276374101-e4f076223fb3?w=1200&q=80'],
  false,
  'pending'
),
(
  '镜湖居 · 湖心公寓',
  '低饱和灰调内饰搭配天然橡木与洞石，开放式餐厨与双阳台设计，将湖景日常化。社区含私人会所与游艇泊位。',
  3800000,
  '镜湖大道 66 号',
  '深圳',
  3, 2, 186,
  'apartment',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'],
  false,
  'available'
),
(
  '雁栖台 · 合院私邸',
  '三进合院格局，中庭水景与竹影相映。地暖、新风、全屋净水与安防系统一应俱全，适合作为城市第二居所。',
  9600000,
  '雁栖湖东路 12 号',
  '北京',
  5, 4, 520,
  'villa',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cd7a?w=1200&q=80'
  ],
  true,
  'available'
),
(
  '锦里行 · 空中花园',
  '顶层复式设计，私属空中花园与户外壁炉。步行可达太古里，都市烟火与静谧栖居仅一梯之隔。',
  4200000,
  '中纱帽街 8 号',
  '成都',
  3, 2, 210,
  'apartment',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'],
  false,
  'sold'
),
(
  '西溪隐庐 · 湿地别墅',
  '西溪湿地畔低密度组团，全明地下室与双车位。庭院可设茶亭，四季鸟鸣为伴。',
  11200000,
  '文二西路 518 号',
  '杭州',
  5, 5, 560,
  'villa',
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80'
  ],
  true,
  'available'
),
(
  '珠江映月 · 天际公寓',
  '珠江新城核心，270° 江景客厅，全屋智能家居。楼下即高端商业与艺术展馆。',
  6500000,
  '花城大道 88 号',
  '广州',
  4, 3, 268,
  'penthouse',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80'],
  false,
  'available'
),
(
  '秦淮河岸 · 民国公馆',
  '秦淮河畔修缮完好的民国建筑，青砖黛瓦与法式廊柱并存。适合文化沙龙与私人接待。',
  4800000,
  '长乐路 102 号',
  '南京',
  4, 2, 310,
  'townhouse',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80'],
  false,
  'pending'
),
(
  '金鸡湖畔 · 湖景大宅',
  '金鸡湖东岸一线湖景，双套房设计，独立衣帽间。小区含室内恒温泳池与网球场。',
  7200000,
  '星湖街 199 号',
  '苏州',
  4, 3, 298,
  'penthouse',
  'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&q=80',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80'
  ],
  false,
  'available'
),
(
  '崂山观海 · 崖上别墅',
  '崂山脚下观海独栋，私家步道直达沙滩。落地窗框住日出与帆影，适合度假长住。',
  15800000,
  '东海东路 66 号',
  '青岛',
  6, 5, 720,
  'villa',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'],
  true,
  'available'
),
(
  '光谷芯 · 科技公寓',
  '光谷核心商务区精装公寓，近地铁与产业园。适合年轻高管首套改善。',
  2100000,
  '关山大道 388 号',
  '武汉',
  2, 1, 98,
  'apartment',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
  false,
  'available'
),
(
  '曲江池畔 · 唐风合院',
  '曲江新区唐风园林社区，白墙灰瓦与曲水环绕。入户即见枯山水庭院。',
  8800000,
  '芙蓉西路 168 号',
  '西安',
  5, 4, 480,
  'villa',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'],
  false,
  'available'
),
(
  '奥体中心 · 冠军大平层',
  '奥体板块地标住宅，俯瞰体育场与江岸灯光秀。双厨双厅，满足宴请与日常。',
  5900000,
  '奔竞大道 1 号',
  '杭州',
  4, 3, 245,
  'penthouse',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80'
  ],
  false,
  'available'
),
(
  '鼓浪屿上 · 海景老墅',
  '鼓浪屿历史风貌区稀缺独栋，红砖拱廊与南洋花砖。步行可达钢琴码头。',
  13500000,
  '鼓声路 58 号',
  '厦门',
  5, 4, 420,
  'villa',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'],
  false,
  'pending'
),
(
  '福田中心 · 商务公寓',
  '福田 CBD 精装小户型，拎包入住。楼下地铁与购物中心，出租自住两相宜。',
  3200000,
  '福华一路 98 号',
  '深圳',
  2, 1, 78,
  'apartment',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80'],
  false,
  'available'
),
(
  '海棠湾 · 度假别墅',
  '海棠湾一线海景，无边泳池与户外淋浴。托管式酒店服务，年化收益稳定。',
  18800000,
  '海棠北路 128 号',
  '三亚',
  6, 6, 850,
  'villa',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
  ],
  true,
  'available'
),
(
  '解放碑畔 · 天际复式',
  '解放碑商圈顶层复式，夜景尽收眼底。玻璃幕墙与黄铜细节，都市摩登气质。',
  4500000,
  '民权路 28 号',
  '重庆',
  3, 2, 165,
  'apartment',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'],
  false,
  'sold'
),
(
  '岳麓山下 · 书院联排',
  '岳麓书院文脉旁，新中式联排组团。青瓦白墙，私家庭院可种竹与枫。',
  5600000,
  '麓山路 200 号',
  '长沙',
  4, 3, 265,
  'townhouse',
  'https://images.unsplash.com/photo-1605276374101-e4f076223fb3?w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1605276374101-e4f076223fb3?w=1200&q=80'],
  false,
  'available'
),
(
  '陆家嘴 · 滨江藏品',
  '陆家嘴滨江最后一批江景房源，三梯一户。国际金融资源与顶级物业管家服务。',
  22000000,
  '银城中路 88 号',
  '上海',
  5, 4, 380,
  'penthouse',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  ARRAY[
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    'https://images.unsplash.com/photo-1605276374101-e4f076223fb3?w=1200&q=80'
  ],
  true,
  'available'
);
