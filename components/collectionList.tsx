import { Avatar, Badge, Code, RadioCards, ScrollArea } from "@radix-ui/themes";

interface CollectionListProps {
  selectedCollectionAddress: string;
  setSelectCollectionAddress: (value: string) => void;
  data: CollectionsData[];
}

export default function CollectionList({
  selectedCollectionAddress,
  setSelectCollectionAddress,
  data,
}: CollectionListProps) {
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
          .flatMap((serie) => serie.contracts)
          .map((collection, index) => (
            <RadioCards.Item
              value={collection.address}
              key={collection.address}
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
                    {collection.address.slice(0, 5)}...
                    {collection.address.slice(-4)}
                  </Code>
                </div>
              </div>
            </RadioCards.Item>
          ))}
      </RadioCards.Root>
    </ScrollArea>
  );
}
