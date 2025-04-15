export async function fetcher(url: string, args: { method: string }) {
  try {
    return await fetch(url, { method: args.method }).then((response) => response.json())
  } catch (err: any) {
    alert(err)
  }
}
