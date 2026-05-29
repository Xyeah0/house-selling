import type { Property } from "../types/property";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "demo-1",
    title: "云栖别院 · 半山独栋",
    description:
      "坐落于城市天际线与自然山脊之间，270° 全景落地窗将晨雾与灯火一并纳入室内。私人恒温泳池、酒窖与智能家居系统，为少数藏家而设。",
    price: 12800000,
    address: "云栖路 88 号",
    city: "杭州",
    bedrooms: 5,
    bathrooms: 4,
    area_sqm: 680,
    property_type: "villa",
    image_url:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    featured: true,
    status: "available",
  },
  {
    id: "demo-2",
    title: "外滩序章 · 江景大平层",
    description:
      "百年外滩文脉之上，一线江景与 Art Deco 线条相遇。双主卧套间、独立家政动线，电梯直达入户，私密性与仪式感并重。",
    price: 8600000,
    address: "中山东一路 18 号",
    city: "上海",
    bedrooms: 4,
    bathrooms: 3,
    area_sqm: 320,
    property_type: "penthouse",
    image_url:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    image_urls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1605276374101-e4f076223fb3?w=1200&q=80",
    ],
    featured: true,
    status: "available",
  },
  {
    id: "demo-3",
    title: "梧桐深处 · 法式联排",
    description:
      "法租界梧桐树影下的红砖立面，保留原始拱券与铸铁栏杆。经修缮的挑高客厅与旋转楼梯，是城市中心难得的低密度居所。",
    price: 5200000,
    address: "复兴中路 1260 弄",
    city: "上海",
    bedrooms: 4,
    bathrooms: 3,
    area_sqm: 280,
    property_type: "townhouse",
    image_url:
      "https://images.unsplash.com/photo-1605276374101-e4f076223fb3?w=1200&q=80",
    featured: false,
    status: "pending",
  },
  {
    id: "demo-4",
    title: "镜湖居 · 湖心公寓",
    description:
      "低饱和灰调内饰搭配天然橡木与洞石，开放式餐厨与双阳台设计，将湖景日常化。社区含私人会所与游艇泊位。",
    price: 3800000,
    address: "镜湖大道 66 号",
    city: "深圳",
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 186,
    property_type: "apartment",
    image_url:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    featured: false,
    status: "available",
  },
  {
    id: "demo-5",
    title: "雁栖台 · 合院私邸",
    description:
      "三进合院格局，中庭水景与竹影相映。地暖、新风、全屋净水与安防系统一应俱全，适合作为城市第二居所。",
    price: 9600000,
    address: "雁栖湖东路 12 号",
    city: "北京",
    bedrooms: 5,
    bathrooms: 4,
    area_sqm: 520,
    property_type: "villa",
    image_url:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    featured: true,
    status: "available",
  },
  {
    id: "demo-6",
    title: "锦里行 · 空中花园",
    description:
      "顶层复式设计，私属空中花园与户外壁炉。步行可达太古里，都市烟火与静谧栖居仅一梯之隔。",
    price: 4200000,
    address: "中纱帽街 8 号",
    city: "成都",
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 210,
    property_type: "apartment",
    image_url:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    featured: false,
    status: "sold",
  },
];
