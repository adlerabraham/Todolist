import ListGroup from './Components/ListGroup';

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item)
  }
  return <div><ListGroup onSelectItem={handleSelectItem} /></div>
}

export default App;