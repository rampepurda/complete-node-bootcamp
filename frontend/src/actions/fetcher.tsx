export async function fetcher(url: string, args: { method: string }) {
  /**
   * @param method - Only 'DELETE', 'PATCH'
   */

  try {
    const response = await fetch(url, {
      method: args.method,
    })

    if (response.ok) {
      return await response.json()
    }
  } catch (err) {
    alert(err)
  }
}
