// https的s不要忘记敲!
const origin = "https://deep-index.moralis.io";
// Moralis Settings里面的default key;
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjUwZTEwNGNhLTQwMGItNGFjNi04OWE2LTZiN2I4OTdmOWY3ZCIsIm9yZ0lkIjoiMzYzNDY1IiwidXNlcklkIjoiMzczNTQ3IiwidHlwZUlkIjoiNjVhNGRkMDItMTlhNS00ZDUyLWFjYTctNzYzNTk5ODdlMjYyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTkyMjQyODksImV4cCI6NDg1NDk4NDI4OX0.8hOUOXnoBHyxLs-iwbQey9quZwZ-W3Kz41XHBsSkt18";

// Contract NFT: tokenAddress是NFT的contract ID;
// contract/token address:游戏规则的地址;
// async写在函数定义的左边; await是写在函数里面; 两个少其一都白写;
// 有了这两个就可以少些.then,少一些函数缠绕时间;
export const getContractNFTs = async (tokenAddress) => {
    const url = new URL(`${origin}/api/v2/nft/${tokenAddress}`);//``可以方便地拼接string片段;
    //append不支持三对key和value同时插,所以要插三次;
    url.searchParams.append("chain","eth");//去chain的星球上寻找展览馆eth; 一次只能搜索一个;
    url.searchParams.append("format","decimal");//decimal表示十进制;
    url.searchParams.append("limit","20");

    const response = await fetch(url, {
        headers: {
            accept: "application/json", 
            "X-API-KEY": apiKey,
        }
        //accept: 希望从后端接受的是json;
        //X-API-KEY: Moralis设计成这样;
    }); 
    //fetch返回的是request的状态; await是表示等请求成功返回结果再接住, 和底下的代码是一样的,把.then拍平;
    //fetch().then(response => {});这个call back函数就是函数缠绕;
    return response.json();
    //.json帮我们把后端返回的流数据按照json的格式进行立体化; 
};

export const getContractTrades = async (tokenAddress) => {
    const url = new URL(`${origin}/api/v2/nft/${tokenAddress}/trades`);
    url.searchParams.append("chain","eth");//只支持一个展览馆,不支持一个NFT;
    url.searchParams.append("marketplace","opensea");
    url.searchParams.append("limit","20");

    const response = await fetch(url, {
        headers: {
            accept: "application/json", 
            "X-API-KEY": apiKey,
        }
    }); 

    return response.json();

};

export const getNFTTransfers = async (tokenAddress, tokenId) => {
    const url = new URL(
      `${origin}/api/v2/nft/${tokenAddress}/${tokenId}/transfers`
    );
    url.searchParams.append("chain", "eth");
    url.searchParams.append("format", "decimal");
    url.searchParams.append("limit", "20");
  
  
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "X-API-KEY": apiKey,
      },
    });
    return response.json();
};
  




