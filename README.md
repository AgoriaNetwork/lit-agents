
# LitAgents Project

## Overview

LitAgents is a blockchain-based project leveraging smart contracts and advanced JavaScript/TypeScript tools. This project includes the deployment of a Solidity smart contract, `LitAgents.sol`, which facilitates creating and managing agents with customizable actions, characters, and addresses.

The repository also includes a robust backend and utility libraries for seamless interaction with blockchain services, token operations, encryption, and AI-powered features.

## Features

1. **LitAgents Smart Contract**:
   - Implements ERC-721 functionality for non-fungible token-based agent management.
   - Allows agents to be minted with specific actions, characters, and associated addresses.
   - Provides functionality to update agent details securely.

2. **Service Modules**:
   - **Lit Services**: Enable decentralized orchestration and encryption.
   - **Token Management**: Tools for handling token-related GraphQL queries and operations.
   - **AI Providers**: Interfaces for integrating with OpenAI and Replicate APIs.
   - **Utility Libraries**: Include RPC handling, address transformation, and cryptographic tools.

3. **Script Utilities**:
   - Automate wallet creation, encryption, IPFS uploads, and testing functionalities.

4. **Support for Modern Development Practices**:
   - Fully equipped with TypeScript configurations.
   - Includes ESLint and Prettier for maintaining clean and consistent code.
   - Contains configuration files for rapid development and deployment.

## Technology Stack

- **Blockchain**: Solidity, Ethereum
- **Backend**: Node.js, TypeScript
- **AI Integration**: OpenAI, Replicate
- **Utilities**: Axios, Ethers.js, IPFS
- **Smart Contract Development**: OpenZeppelin Contracts

## Installation

### Prerequisites
- Node.js (v16 or above)
- npm or pnpm
- Solidity compiler (solc)

### Steps

1. Clone the repository:
   ```bash
   git clone git@github.com:AgoriaNetwork/lit-agents.git
   cd lit-agents
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Compile the Solidity contract:
   ```bash
   solc contracts/LitAgents.sol --combined-json abi,bin > LitAgents.json
   ```

4. Start the development server:
   ```bash
   pnpm start
   ```

## Usage

1. **Deploy the Smart Contract**:
   Use the deployment script or manually deploy the `LitAgents` contract on your desired Ethereum network.

2. **Interact with LitAgents**:
   - Mint a new agent by providing action, character, and address.
   - Query and update agent details using the provided functions.

3. **Backend Services**:
   Utilize the service modules to manage encryption, token operations, and AI-powered workflows.