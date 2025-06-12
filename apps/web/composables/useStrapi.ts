export function useStrapiFetch<T>(
  endpoint: string,
  token?: string | null,
  options: Record<string, unknown> = {},
) {
  const config = useRuntimeConfig()
  const authToken = token ?? config.public.STRAPI_TOKEN
  return $fetch<T>(`${config.public.STRAPI_URL}/api/${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${authToken}`,
      ...(options.headers || {}),
    },
  })
}
