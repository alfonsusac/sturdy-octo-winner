export default function Page() {
  
  type Person = {
    nama: string
  }

  const data = fetch()

  console.log(data)


}


function fetch() {
  return JSON.parse('{"name":"alfon"}')
}