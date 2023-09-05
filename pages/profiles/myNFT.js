import { useNFT, useNFTMetadata } from '@zoralabs/nft-hooks'

const MyNFT = () => {
  const { data } = useNFT('0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7', '20')

  return (
    <div>
      <h3>{data.metadata.name}</h3>
      <p>{data.metadata.description}</p>
      <p>Owned by: {data.nft.owner.address}</p>
      <iframe
          src="https://embed.ipfscdn.io/ipfs/bafybeihazpt6pkm4azgtupdz7hc2j3o4zpjsvtcgfq4t2keozxkss3ud6q/?contract=0x0993123cd814FcADCc72d694F7123b1827b85cAB&chain=%7B%22name%22%3A%22Zora+Testnet%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fzora-testnet.rpc.thirdweb.com%2F15065ae3c21e0bff07eaf80b713a6ef0%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22GETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22Zora%22%2C%22chainId%22%3A999%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22zora-testnet%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmZ6qaRwTPFEZUspwMUjaxC6KhmzcELdRQcQzS3P72Dzts%2FVector.svg%22%2C%22height%22%3A512%2C%22width%22%3A512%2C%22format%22%3A%22svg%22%7D%7D&clientId=8d1007d92d9f29ac24388d54349263fc&primaryColor=purple"
          width="600px"
          height="600px"
          style="max-width:100%;"
          frameBorder="0"
      ></iframe>
    </div>
  )
}

export default MyNFT