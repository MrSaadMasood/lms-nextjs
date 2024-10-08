import { specificCoinDataFetcher } from "@/fetchRequests/fetch"
import { specifCoinSchema } from "@/lib/zodSchema"
import { useEffect, useState } from "react"

function CoinStat({
  coinId
}: {
  coinId: string
}) {

  const [specificCoinData, setSpecificCoinData] = useState<MarketDataOfSpecificCoin>({
    current_price: 0,
    market_cap: 0,
    fully_diluted_valuation: 0,
    total_supply: 0,
    circulating_supply: 0,
    max_supply: 0
  })

  const specificCoinMarketDataRecord = {
    current_price: "Current Price",
    market_cap: "Market Cap",
    fully_diluted_valuation: "Fully Diluted Valuation",
    total_supply: "Total Supply",
    max_supply: "Max Supply",
    circulating_supply: "Circulating Supply"
  }

  useEffect(() => {

    specificCoinDataFetcher(coinId)
      .then(res => res.json())
      .then(data => {
        const parsedSpecificCoinData = specifCoinSchema.parse(data);
        const { current_price, market_cap, fully_diluted_valuation, total_supply, max_supply, circulating_supply } =
          parsedSpecificCoinData.market_data
        setSpecificCoinData({
          current_price: current_price["usd"],
          market_cap: market_cap["usd"],
          fully_diluted_valuation: fully_diluted_valuation["usd"],
          total_supply: total_supply,
          circulating_supply: circulating_supply,
          max_supply: max_supply
        })
      })
      .catch(error => console.log("failed to get specific coin data"))

  }, [coinId])

  return (
    <div className=" w-full h-auto flex flex-col justify-start items-center space-y-2   ">
      <div className=" w-full h-auto ">
        <h2 className=" text-2xl font-bold ">Coin Statistics</h2>
      </div>
      {Object.keys(specificCoinData).map((key, index) => (
        <div
          key={index}
          className=" w-full p-2 text-sm md:text-base border-t-2 border-gray-100 flex justify-between items-center "
        >
          <div className=" text-gray-600 ">
            {specificCoinMarketDataRecord[key as keyof typeof specificCoinData]}
          </div>
          <div className=" font-bold ">{specificCoinData[key as keyof typeof specificCoinData]}</div>
        </div>
      ))}
    </div>
  )
}

export default CoinStat 
