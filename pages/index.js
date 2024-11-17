import { Flex, Text, Button } from "@radix-ui/themes";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const { data } = useSWR('/api/fetch-nfts', fetcher, {focusThrottleInterval: 10000})

  return (
    <Flex direction="column" gap="2">
			<Text>Starting Transfer App</Text>
			<Button>Let's go</Button>

		</Flex>
  );
}
