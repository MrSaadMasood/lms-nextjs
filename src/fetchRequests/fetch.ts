import "client-only"

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
