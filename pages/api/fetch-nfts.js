import FakeJsonData from "@/utils/fakeJsonData.json";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const for_address = req.query.for_address;
  const for_collection = req.query.for_collection;
  const for_pageKey = req.query.for_pageKey ?? null;

  const url = `https://avax-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}/getNFTsForOwner?owner=${for_address}&contractAddresses[]=${for_collection}&pageSize=10&pageKey=${for_pageKey}`;

  const vercelDomain = process.env.VERCEL_URL;
  switch (req.method) {
    case "GET":
      try {
        const response = await fetch(url, {
          headers: {
            Origin: vercelDomain, // Replace with your actual origin domain
          },
        });
        const fetchedNfts = await response.json();

        // const fetchedNfts = FakeJsonData;

        res.status(200).json(fetchedNfts);
      } catch (error) {
        console.log(error);
      }

      break;
  }
}
