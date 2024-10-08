import { testResultSchema } from "@/lib/zodSchema"
import "client-only"
import { z } from "zod"

const COIN_GECKO_API_KEY = process.env.NEXT_PUBLIC_COIN_GECKO_API_KEY || ""

export async function deductFreeTokensFromUserRequest() {
  return fetch("/api/user/dashboard/search/deduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export async function fetchCategorySpecificDataForFiltering(query: string) {
  return fetch("/api/user/dashboard/search?" + query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function refundTokensForNonPermUsers() {
  return fetch("/api/user/dashboard/test/refund", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export async function recordTestResults(testResult: Record<string, z.infer<typeof testResultSchema>>) {
  return fetch("/api/user/dashboard/test/record", {
    method: "POST",
    body: JSON.stringify(testResult),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

export async function coinListWithMarketData() {
  return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C7d&precision=2', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'x-cg-demo-api-key': COIN_GECKO_API_KEY
    }
  })

}

export async function coinHistoricalDataFetcher(id: string, days: number) {
  let url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&precision=full`
  if (days >= 30) url += '&interval=daily'
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'x-cg-demo-api-key': COIN_GECKO_API_KEY
    }
  })
}

export async function specificCoinDataFetcher(id: string) {
  const url = "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false"
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'x-cg-demo-api-key': COIN_GECKO_API_KEY
    }
  })
}
