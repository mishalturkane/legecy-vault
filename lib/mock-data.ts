// This file contains mock functions to simulate blockchain interactions
// In a real implementation, these would interact with the Solana blockchain

// Mock function to fetch vault data
export async function mockFetchVaultData(walletAddress?: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock data
  return {
    balance: 2.5,
    lastSeen: new Date().toISOString(),
    nomineeAddress: "8xrt45YrJJJJsXmple7890123456789012345678",
    inactivityPeriod: 12, // months
  }
}

// Mock function to deposit SOL to vault
export async function mockDepositToVault(walletAddress?: string, amount: number) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real implementation, this would call the smart contract
  return {
    success: true,
    txHash: "mock_tx_hash_" + Math.random().toString(36).substring(2, 15),
  }
}

// Mock function to update nominee
export async function mockUpdateNominee(walletAddress?: string, nomineeAddress: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real implementation, this would call the smart contract
  return {
    success: true,
    txHash: "mock_tx_hash_" + Math.random().toString(36).substring(2, 15),
  }
}

// Mock function to update inactivity period
export async function mockUpdateInactivityPeriod(walletAddress?: string, months: number) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real implementation, this would call the smart contract
  return {
    success: true,
    txHash: "mock_tx_hash_" + Math.random().toString(36).substring(2, 15),
  }
}

// Mock function to ping the "I'm Alive" function
export async function mockImAlive(walletAddress?: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real implementation, this would call the smart contract
  return {
    success: true,
    txHash: "mock_tx_hash_" + Math.random().toString(36).substring(2, 15),
    timestamp: new Date().toISOString(),
  }
}
