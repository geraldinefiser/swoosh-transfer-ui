// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  
  const url = `https://avax-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}/getNFTsForOwner?owner=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
  console.log(url);
  switch (req.method) { 
    case 'GET':
      try {
        const response = await fetch(url)
        const fetchedNfts = await response.json()
        
        console.log(fetchedNfts);
        res.status(200).json(fetchedNfts);  
        
      } catch (error) {
        console.log(error)
      }
  
      break
  }
  
}
