import {
  Flex,
  Text,
  Button,
  Grid,
  Box,
  Card,
  Avatar,
  Select,
  Theme,
} from "@radix-ui/themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useSWR from "swr";
import { useAccount } from "wagmi";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { address } = useAccount();
  const { data } = useSWR(
    address ? `/api/fetch-collections?for_address=${address}` : null,
    fetcher,
    { focusThrottleInterval: 3600000 }
  );
  const { data: nftData } = useSWR(
    address ? `/api/fetch-nfts?for_address=${address}` : null,
    fetcher,
    { focusThrottleInterval: 3600000 }
  );
  console.log(address);
  console.log(data);

  return (
    <div>
      <div className="flex flex-row justify-end py-5">
        <ConnectButton />
      </div>

      <div className="px-5 ">
        <div className="flex flex-row h-[50px]">
          <Select.Root>
            <Select.Trigger placeholder="Pick a collection" />
            <Theme>
              <Select.Content position="popper">
                <Select.Group>
                  {data?.collections.map((collection, index) => (
                    <Select.Item
                      key={collection.contract.address}
                      value={collection.contract.address}
                    >
                      {collection.name}{" "}
                      <span className="text-xs text-gray-500">
                        ({collection.numDistinctTokensOwned})
                      </span>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Theme>
          </Select.Root>
        </div>

        <Grid columns={{ initial: "2", sm: "3" }} gap="3" width="auto">
          {nftData?.ownedNfts.map((nft, index) => (
            <Box key={`${nft.contract.address}-${nft.id.tokenId}`}>
              <Card>
                <Flex gap="3" align="center">
                  <Avatar
                    size="3"
                    src={nft.media[0].thumbnail}
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
