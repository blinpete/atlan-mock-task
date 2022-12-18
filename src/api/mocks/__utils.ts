export const wait = async function (timeout: number) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
