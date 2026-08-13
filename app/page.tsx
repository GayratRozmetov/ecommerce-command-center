"use client";
import { useMemo, useState } from "react";
type Order={id:string;customer:string;country:string;total:number;status:string;items:number};
const initialOrders:Order[]=[
 {id:"#10482",customer:"Noah Williams",country:"United Kingdom",total:428,status:"Processing",items:3},
 {id:"#10481",customer:"Elena Rossi",country:"Italy",total:186,status:"Shipped",items:2},
 {id:"#10480",customer:"Mason Studio",country:"United States",total:1240,status:"Processing",items:8},
 {id:"#10479",customer:"Lucas Martin",country:"France",total:312,status:"Delivered",items:4},
 {id:"#10478",customer:"Nordic Supply",country:"Sweden",total:890,status:"Shipped",items:6},
];
const products=[
 {name:"Oversized Essential Hoodie",sku:"HD-2041",stock:42,sales:118,color:"#242524"},
 {name:"Washed Baggy Denim",sku:"DN-6900",stock:8,sales:96,color:"#7b858b"},
 {name:"Heavyweight Graphic Tee",sku:"TS-2084",stock:24,sales:84,color:"#d4cbbc"},
 {name:"Utility Zip Jacket",sku:"JK-17516",stock:5,sales:61,color:"#666858"},
];
export default function Home(){
 const [orders,setOrders]=useState(initialOrders),[filter,setFilter]=useState("All"),[query,setQuery]=useState(""),[period,setPeriod]=useState("30 days");
 const filtered=useMemo(()=>orders.filter(o=>(filter==="All"||o.status===filter)&&(o.customer.toLowerCase().includes(query.toLowerCase())||o.id.includes(query))),[orders,filter,query]);
 const revenue=orders.reduce((sum,o)=>sum+o.total,0);
 function advance(id:string){setOrders(x=>x.map(o=>o.id===id?{...o,status:o.status==="Processing"?"Shipped":o.status==="Shipped"?"Delivered":"Delivered"}:o))}
 return <main className="app"><aside><div className="brand"><i>C</i><b>Commerce<span>OS</span></b></div><p className="label">WORKSPACE</p>
  <nav>{[["▦","Overview"],["□","Orders"],["◇","Products"],["◫","Inventory"],["◎","Customers"],["↗","Analytics"]].map((x,i)=><button key={x[1]} className={i===0?"active":""}><span>{x[0]}</span>{x[1]}{x[1]==="Orders"&&<em>5</em>}</button>)}</nav>
  <div className="upgrade"><span>✦ PRO WORKSPACE</span><b>Scale without the chaos.</b><p>All operations in one clear view.</p></div>
  <div className="account"><div>GR</div><span><b>Gayrat Rozmetov</b><small>Administrator</small></span></div>
 </aside><section className="content"><header><div><span>THURSDAY, AUGUST 13</span><h1>Command Center</h1><p>Everything your store needs, all in one place.</p></div><div className="header-actions"><button>⌕</button><button>♧</button><button className="primary">+ Add product</button></div></header>
  <section className="metrics">
   <article><div><span>NET REVENUE</span><b>$24,680</b></div><i>↗ 12.8%</i><small>vs. previous period</small></article>
   <article><div><span>ORDERS</span><b>184</b></div><i>↗ 8.2%</i><small>5 need attention</small></article>
   <article><div><span>AVG. ORDER VALUE</span><b>$134.13</b></div><i>↗ 4.6%</i><small>Across all channels</small></article>
   <article><div><span>CONVERSION RATE</span><b>3.84%</b></div><i>↗ 0.7%</i><small>6,427 sessions</small></article>
  </section>
  <section className="top-grid"><article className="chart-card"><div className="card-head"><div><span>SALES PERFORMANCE</span><h2>Revenue overview</h2></div><select value={period} onChange={e=>setPeriod(e.target.value)}><option>7 days</option><option>30 days</option><option>90 days</option></select></div>
   <div className="chart"><div className="axis"><span>$8k</span><span>$6k</span><span>$4k</span><span>$2k</span><span>$0</span></div><div className="bars">{[42,50,38,61,55,78,72,88,69,94,82,100].map((h,i)=><div key={i}><i style={{height:`${h}%`}}/><span>{i%2===0?["01","05","09","13","17","21"][i/2]:""}</span></div>)}</div></div>
   <div className="legend"><span><i/>Revenue</span><b>{period} total: $24,680</b></div></article>
   <article className="stock-card"><div className="card-head"><div><span>INVENTORY</span><h2>Stock attention</h2></div><button>View all →</button></div>
    <div className="stock-list">{products.map(p=><div key={p.sku}><i style={{background:p.color}}>{p.name[0]}</i><span><b>{p.name}</b><small>{p.sku} · {p.sales} sold</small></span><em className={p.stock<10?"low":""}>{p.stock} left</em></div>)}</div>
   </article>
  </section>
  <section className="orders"><div className="card-head"><div><span>LIVE OPERATIONS</span><h2>Recent orders</h2></div><div className="tools"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search orders..."/><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Processing</option><option>Shipped</option><option>Delivered</option></select></div></div>
   <div className="table"><div className="row heading"><span>ORDER</span><span>CUSTOMER</span><span>ITEMS</span><span>TOTAL</span><span>STATUS</span><span></span></div>
    {filtered.map(o=><div className="row" key={o.id}><b>{o.id}</b><span><b>{o.customer}</b><small>{o.country}</small></span><span>{o.items} items</span><b>${o.total.toLocaleString()}</b><em className={o.status.toLowerCase()}>{o.status}</em><button onClick={()=>advance(o.id)}>{o.status==="Delivered"?"✓":"→"}</button></div>)}</div>
  </section>
  <footer><span>Demo dashboard · Fictional commerce data</span><b>System operational <i/></b></footer>
 </section></main>
}
