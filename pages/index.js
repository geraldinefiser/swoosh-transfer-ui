import { Flex, Text, Button, Grid, Box, Card, Avatar, Container } from "@radix-ui/themes";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useSWR from "swr";
import { useAccount } from "wagmi";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const {address} = useAccount()
  const { data } = useSWR(address ? `/api/fetch-nfts?for_address=${address}` : null, fetcher, {focusThrottleInterval: 3600000})
  console.log(address)
  console.log(data)

  return (
    <div>
      <div className='flex flex-row justify-end py-5'>
        <ConnectButton />
      </div>
      <div className='px-5 '>
        <Grid columns={{ initial: "2", md: "4" }} gap="3" width="auto">
          {data?.ownedNfts.map((nft, index) => (
            <Box key={`${nft.contract.address}-${nft.id.tokenId}`} >
              <Card>
                <Flex gap="3" align="center">
                  <Avatar
                    size="3"
                    src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                    radius="full"
                    fallback="T"
                  />
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      {nft.contractMetadata.name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {nft.metadata.name}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>

          ))}
        </Grid>
      </div>

    </div>
		
  );
}
