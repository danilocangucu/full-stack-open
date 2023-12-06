import { useEffect, useState } from 'react'
import EntriesHeader from './components/EntriesHeader'
import Entry from './components/Entry'
import Notification from './components/Notification'
import { getAllEntries, createEntry } from './diaryService'
import { NewDiaryEntry, Weather, Visibility, DiaryEntry } from '../../flight-diary-main/src/types'
import NewEntryHeader from './components/NewEntryHeader'

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>({
    comment: '',
    date: '',
    weather: Weather.Cloudy,
    visibility: Visibility.Good
  });
  const [notification, setNotification] = useState('');

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry(newDiaryEntry)
      .then((data: DiaryEntry) => {
        setDiaryEntries(diaryEntries.concat(data))
        setNewDiaryEntry({
          comment: '',
          date: '',
          weather: Weather.Cloudy,
          visibility: Visibility.Good
        })
      })
      .catch((error) => {
        setNotification(error.response.data)
        setTimeout(() => setNotification(''), 5000)
      });
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewDiaryEntry({
      ...newDiaryEntry,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    getAllEntries().then(data => setDiaryEntries(data))
  }, [])

  return (
    <>
      {notification ? <Notification message={notification} /> : null}
      <NewEntryHeader />
      <form onSubmit={entryCreation}>
        <label>date: </label><input type='date' name='date' value={newDiaryEntry.date} onChange={handleInputChange}></input><br />
        <label>comment: </label><input name='comment' value={newDiaryEntry.comment} onChange={handleInputChange}></input><br />
        <label>weather: </label><select name='weather' value={newDiaryEntry.weather} onChange={handleInputChange}>
          <option value={Weather.Sunny}>Sunny</option>
          <option value={Weather.Rainy}>Rainy</option>
          <option value={Weather.Cloudy}>Cloudy</option>
          <option value={Weather.Stormy}>Stormy</option>
          <option value={Weather.Windy}>Windy</option>
        </select><br />
        <label>visibility: </label><select name='visibility' value={newDiaryEntry.visibility} onChange={handleInputChange}>
          <option value={Visibility.Good}>Good</option>
          <option value={Visibility.Great}>Great</option>
          <option value={Visibility.Ok}>Ok</option>
          <option value={Visibility.Poor}>Poor</option>
        </select><br /><br />
        <button type='submit'>Submit</button>
      </form>
      <EntriesHeader />
      {diaryEntries.map((diaryEntry: DiaryEntry) => (
        <Entry key={diaryEntry.id} {...diaryEntry} />
      )
      )}
    </>
  )
}

export default App
