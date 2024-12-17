export default function NftLoading() {
  console.log("rendering NFT laoding");
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col flex-auto">
        <span className="bg-gray-200 h-[30px] w-full rounded animate-pulse" />
        <hr className="my-3" />
        <span className="bg-gray-200 h-[40px] w-full rounded animate-pulse" />
        <hr className="my-3" />
        <span className="bg-gray-200 h-[40px] w-full rounded animate-pulse" />
        <hr className="my-3" />
        <span className="bg-gray-200 h-[40px] w-full rounded animate-pulse" />
      </div>
    </div>
  );
}
