import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { coinListWithMarketData } from "@/fetchRequests/fetch";
import { z } from "zod";
import { cryptoSchema } from "@/lib/zodSchema";
import { CryptoTableData } from "@/lib/types/exported-types";


function useRealTimeChartVisuals() {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const coinId = params.get("coin") || ""
  const router = useRouter();
  const [cryptoTableData, setCryptoTableData] = useState<CryptoTableData[]>([])

  useEffect(() => {
    if (coinId) return

    coinListWithMarketData()
      .then(res => res.json())
      .then(data => {
        const parsedCryptoData = z.array(cryptoSchema).parse(data)
        setCryptoTableData(parsedCryptoData)
      })
      .catch(error => console.log("The error is", error))

  }, [coinId])

  const columnRecord: Record<keyof CryptoTableData, string> = {
    current_price: "Current Price",
    name: "Coin",
    market_cap: "Market Cap",
    price_change_24h: "Price 24h ",
    price_change_percentage_24h: "24h Change",
    price_change_percentage_1h_in_currency: "1h Change",
    price_change_percentage_7d_in_currency: "7h Change"
  }

  function showCoinChart(id: string, value: string) {
    if (!id.includes("name")) return;
    params.set("coin", value);
    router.push(`${pathname}?${params}`);
  }


  return {
    columnRecord,
    showCoinChart,
    cryptoTableData,
    coinId
  }
}

export default useRealTimeChartVisuals
