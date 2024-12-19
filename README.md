# Token Swoosh - Batch NFT Transfer App

Token Swoosh is a web application that allows users to transfer batches of NFTs on the Avalanche network. This app provides an intuitive interface for managing and transferring multiple NFTs in a single transaction, streamlining the process for NFT owners.

## Features

- Connect your wallet to view and manage your NFTs
- Select multiple NFTs for batch transfer
- User-friendly interface with a responsive design
- Supports Avalanche network
- Real-time transaction status updates
- Secure contract approval process

## Technologies Used

- Next.js (Pages Router)
- React
- TypeScript
- Tailwind CSS
- Wagmi
- RainbowKit for wallet connection
- Radix UI for accessible components

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- An Avalanche-compatible wallet (e.g., MetaMask)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/geraldinefiser/token-swoosh.git
   cd token-swoosh
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_ALCHEMY_KEY=your_alchemy_key
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Connect your wallet using the "Connect Wallet" button.
2. Browse your NFT collections on the dashboard.
3. Select the NFTs you want to transfer by checking the boxes next to them.
4. Enter the recipient's wallet address in the transfer dialog.
5. Approve the contract if it's your first time using the app with a particular collection.
6. Confirm the transfer and wait for the transaction to complete.

## Testing

This project uses Vitest and react-testing-library for testing. To run the tests, use the following command:

```
npm run test
# or
yarn test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Batch NFT transfer contract by [xrpant](https://x.com/xrpant)
- Contract address: [0xe141058cceb71a1c486987d2bfb18b5e1fd4d93f](https://snowtrace.io/address/0xe141058cceb71a1c486987d2bfb18b5e1fd4d93f)
