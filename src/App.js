//import logo from './logo.svg';
import './App.css';
import { Input, Button, Layout, List, message } from "antd";
import { useState } from "react";
import { getContractNFTs } from './utils';
import NftCard from "./components/NftCard";
import ContractTrades from './components/ContractTrades';

const { Header, Content } = Layout;

function App() {
  const [searchText, setSearchText] = useState(""); 
  //初始值是空string的state;用searchText记录用户输入了什么;之前是form来做的;
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  //用户点击button调用这个函数来搜索;这个函数会call API;
  const handleSearch = async() => { //async和await对应;
    if (searchText === ""){
      return;// 用户什么都没输入就不要调用API;
    }

    setLoading(true);

    try {
      const data = await getContractNFTs(searchText);
      setNfts(data.result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
    //getContractNFTs(searchText)
  };
  

  return (
    <Layout style={{ height: "100vh" }}> 
    {/* 100vh表示占满整个空间 */}
      <Header>
        <div style={{ fontSize:16, fontWeight: 600, color: "white" }}>NFT Browser</div>
        {/* CSS in js: 第一个{}代表在jsx里面嵌入普通js代码; 第二个{}表示一个object; */}
      </Header>
      <Content style={{ height: "calc(100%-64px)", padding: 20, overflow: "auto"}}>
        {/* overflow:auto -- 对于溢出的处理是自动处理，而不是无脑显示/隐藏；内容溢出的时候，自动生成滚轮 */}
        {/* 有padding之后搜索框不会顶死在左上角 */}
        <Input.Group compact>
          {/* Input来自于antd，input group是一种input的形式 */}
          {/* Compact(工整)的作用是: 让search紧密地贴在search bar右边*/}
          <Input 
            style={{width: 500}} 
            placeholder="Enter a NFT contract address to search"
            //下面手动收集数据:
            value={searchText}
            onChange={(e)=> setSearchText(e.target.value)}//e代表event;
          />
          {/* 调整search bar的宽度; placeholder占位符提示用户; */}
          <Button type="primary" onClick={handleSearch}>Search</Button>
          <ContractTrades tokenAddress={searchText} />
        </Input.Group>
        <List 
        // List要正常工作至少需要两个props: datasource, renderitem;
        loading={loading} //loading的效果是图片会转圈;
        style={{
          marginTop: 20,
          height: "calc(100% - 52px)",
          overflow: "auto",
        }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 3,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={nfts}
        renderItem={(item) => {
          return (
            <NftCard nft={item}/>
          );
        }}
        />
      </Content>
    </Layout>
  );
}

export default App;
