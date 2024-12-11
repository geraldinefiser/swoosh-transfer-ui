import Nav from "@/components/nav";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Code } from "@radix-ui/themes";

export default function About() {
  return (
    <div>
      <Nav />
      <div className="bg-blue-100/50 rounded w-full p-10 text-blue-500 ">
        <p className="font-bold">
          Batch NFT transfer contract by{" "}
          <a href="https://x.com/xrpant" target="_blank">
            xrpant &nbsp;
            <ArrowTopRightOnSquareIcon className="inline w-3 h-3" />
          </a>
        </p>
        <p>
          Contract address:{" "}
          <a
            target="_blank"
            href="https://snowtrace.io/address/0xe141058cceb71a1c486987d2bfb18b5e1fd4d93f"
          >
            <Code>0xe141058cceb71a1c486987d2bfb18b5e1fd4d93f</Code>&nbsp;
            <ArrowTopRightOnSquareIcon className="inline w-3 h-3" />
          </a>
        </p>
      </div>
    </div>
  );
}
