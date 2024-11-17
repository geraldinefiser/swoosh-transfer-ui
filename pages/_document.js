import { Html, Head, Main, NextScript } from "next/document";
import { Theme, ThemePanel } from "@radix-ui/themes";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
				<Theme>
					<Main />
          {/* <ThemePanel /> */}
				</Theme>
        <NextScript />
      </body>
    </Html>
  );
}
