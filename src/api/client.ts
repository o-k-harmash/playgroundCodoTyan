interface Request {
  url: string
  body?: unknown
  headers?: Record<string, string>
  options?: RequestInit
}

const __domain = "domain.example.com"
const __protocol = "https"
const __prefix = `${__protocol}//${__domain}`

async function httpClient<T>(req: Request): Promise<T> {
  const { url, body, headers = {}, options = {} } = req

  const method = body ? "POST" : "GET"

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
    ...(body ? { body: JSON.stringify(body) } : {}),
  }

  const response = await fetch(url, fetchOptions)

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(errorBody || response.statusText)
  }

  const data = (await response.json()) as T

  return data
}

export { httpClient, __prefix }
export type { Request }
