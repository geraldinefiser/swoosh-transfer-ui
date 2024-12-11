import { Avatar, Badge, Code, RadioCards, ScrollArea } from "@radix-ui/themes";
import { useEffect } from "react";

export default function CollectionList({
  selectedCollectionAddress,
  setSelectCollectionAddress,
  data,
}) {
  useEffect(() => {
    if (data?.collections?.length > 0 && !selectedCollectionAddress) {
      setSelectCollectionAddress(data.collections[0].contract.address);
    }
  }, [data, selectedCollectionAddress]);
  return (
    <ScrollArea
      type="always"
      scrollbars="vertical"
      style={{ height: "100%", width: 300, paddingRight: 15 }}
    >
      <RadioCards.Root
        columns={{ initial: "1" }}
        value={selectedCollectionAddress}
        onValueChange={(value) => setSelectCollectionAddress(value)}
      >
        {data
          ?.flatMap((serie) => serie.collections)
          .map((collection, index) => (
            <RadioCards.Item
              value={collection.contract.address}
              key={collection.contract.address}
            >
              <div className="w-full flex flex-row justify-start items-center gap-1 overflow-hidden ">
                <Avatar
                  src={collection.image.thumbnailUrl}
                  fallback={collection?.name[0]}
                  radius="full"
                />

                <div className="overflow-hidden flex-auto ">
                  <div className="flex flex-row justify-between gap-1">
                    <p className="font-bold">{collection.name}</p>
                    <Badge color="blue">
                      {collection.numDistinctTokensOwned}
                    </Badge>
                  </div>
                  <Code>
                    {collection.contract.address.slice(0, 5)}...
                    {collection.contract.address.slice(-4)}
                  </Code>
                </div>
              </div>
            </RadioCards.Item>
          ))}
      </RadioCards.Root>
    </ScrollArea>
  );
}
