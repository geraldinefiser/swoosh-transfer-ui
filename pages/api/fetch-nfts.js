import FakeJsonData from '@/utils/fakeJsonData.json';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const for_address = req.query.for_address
  const url = `https://avax-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}/getNFTsForOwner?owner=${for_address}`

  switch (req.method) { 
    case 'GET':
      try {
        // const response = await fetch(url)
        // const fetchedNfts = await response.json()
        //
        const fetchedNfts = FakeJsonData
        
        console.log(fetchedNfts);
        res.status(200).json(fetchedNfts);  
        
      } catch (error) {
        console.log(error)
      }
  
      break
  }
  
}
